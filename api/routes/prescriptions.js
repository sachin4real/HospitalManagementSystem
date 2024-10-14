const router  = require("express").Router() ;
let Prescription = require("../models/Prescription") ; 
let Patient = require("../models/Patient") ;
const fs = require('fs');
const nodemailer = require("nodemailer") ;


router.route("/add").post( (req, res) => {


    const text = req.body.text ;
    const appointment = req.body.apt;
    const patient = req.body.pid ;
    
    const newPrescription = new Prescription({

        text,
        appointment,
        patient

    }) 

    newPrescription.save().then( ()=> {
        res.json("Prescription Added");
    }).catch( (err)=> {
        console.log(err) ;
    })

}) 


router.route("/appointmentPrescriptions/:id").get( async (req,res)=> {
    let aid = req.params.id ;
    
    const prs = await Prescription.find(
        {appointment : aid}
    ).then( (prescriptions) => {
        res.status(200).json({data: prescriptions});

    }).catch( (err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in getting prescription details" , error:err.message}) ;
    })
})


router.route("/patientPrescriptions/:id").get( async (req,res)=> {
    let pid = req.params.id ;
    
    const prs = await Prescription.find(
        {patient : pid}
    ).then( (prescriptions) => {
        res.status(200).json({data: prescriptions});

    }).catch( (err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in getting prescription details" , error:err.message}) ;
    })
})

router.get("/patient/search/:id", async (req, res) => {
    let pid = req.params.id ;
    try {
      const query = req.query.query; 
      const results = await Prescription.find({ patient :  pid ,
        $or: [
          { text: { $regex: query, $options: "i" } }
        ],
      });
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

router.route("/send/:id").post( async(req, res) => {

    let pid = req.params.id ;

    // const email = req.body.email.toString() ;
    // const drname = req.body.drname ;
    // const qualifications = req.body.qualifications ;
    // console.log(email) ;

    const pres = await Prescription.findById(pid).then( (prescription)=>{

        const patient = Patient.findById(prescription.patient).then((patient)=>{

            console.log(patient) ;

            setTimeout(() => {
                const filePath = `${prescription._id}.pdf`;
                const fileContent = fs.readFileSync(filePath);
        
        
                const transporter = nodemailer.createTransport({
                    host: 'smtp.zoho.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'hospitalitp@zohomail.com',
                        pass: 'Sliit@321'
                    }
                });
                const mailOptions = {
                    from: 'hospitalitp@zohomail.com',
                    to: `${patient.email}`,
                    subject: 'Prescription',
                    text: `Your prescription has been attached below.\n ${prescription.text}`,
                    attachments: [
                        {
                          filename: `./Prescriptions/${prescription._id}.pdf`,
                          content: fileContent
                        }
                    ]
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
        
        
        
                res.status(200).send({status: "User fetched", prescription})
               
              }, 5000);



        }).catch((err)=>{
            console.log(err.message);
            res.status(500).send({status: "Error in getting patient details" , error:err.message}) ;
        })


        
    }).catch( (err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in getting prescription details" , error:err.message}) ;
    })

        
    // const pres = await Prescription.findById(pid).then( (prescription)=>{
        
    //     const aid = prescription.appointment ;

        


    //     const apt = Appointment.findById(aid).then( (appointment)=>{
    //         const ptid = appointment.patient
    //         const ptnt = Patient.findById(ptid).then( (patient)=> {

    //             const email = patient.email ;

               




    //         }).catch( (err)=>{
    //             console.log(err.message);
    //             res.status(500).send({status: "Error in getting prescription details" , error:err.message}) ;

    //     }).catch( (err)=>{
    //     console.log(err.message);
    //     res.status(500).send({status: "Error in getting prescription details" , error:err.message}) ;
    // })

    // }).catch( (err)=>{
    //     console.log(err.message);
    //     res.status(500).send({status: "Error in getting prescription details" , error:err.message}) ;
    // })

    

    

   

// }) 

})


module.exports = router ;