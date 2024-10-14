let Admin = require("../models/Admin");
const router  = require("express").Router() ;


const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secretKey = 'hey';

router.route("/add").post( (req, res) => {

   
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: "hospitalitp@zohomail.com",
          pass: "Sliit@321",
        },
      });


    const email = req.body.email ;
    const name = req.body.name ;
    const phone = req.body.phone ;
    const roleName = req.body.roleName ;
    const allocatedWork = req.body.allocatedWork ;
    const password = req.body.password ;
   
    
   
    const newAdmin = new Admin({
        email,
        name,   
        password,
        phone,
        roleName,
        allocatedWork
        

    }) 

    newAdmin.save().then( ()=> {

        const mailOptions = {
            from: "hospitalitp@zohomail.com",
            to: `${email}`,
            subject: "Staff Profile Created",
            text: `Hello \nYour Staff Account has been created.\n
                \nEmail : ${email} \nPassword : ${password}\n\nThank You.`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        res.json("Admin Added");
    }).catch( (err)=> {
        console.log(err) ;
    })

}) 


router.route("/delete/:id").delete(async (req, res) => {
  let aid = req.params.id;

  await Admin.findByIdAndDelete(aid)
    .then(() => {
      res.status(200).send({ status: "Staff deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(202)
        .send({ status: "Error with deleting the admin", error: err.message });
    });
});


router.route("/login").post( async (req,res)=> {
    
    const email = req.body.email ;
    const password = req.body.password ;
    
    const admin = await Admin.findOne({ email :email });
    
    try {
        if (admin) {
            //check if password matches
            const result = password === admin.password;
    
            if (result) {
                const token = jwt.sign({ email: admin.email }, secretKey, {
                    expiresIn: '1h',
                  }); 
              res.status(200).send({ rst : "success" , data: admin , tok: token});
            } else {
              res.status(200).send({ rst : "incorrect password" });
            }
          } else {
            res.status(200).send({ rst : "invalid admin" });
          }
    }catch (error) {
        res.status(500).send({ error });
    }


})


router.route("/check").get(async (req, res)=> {

    

    const token = req.headers.authorization ;
    console.log(token) ;
    let email = null ;
    jwt.verify(token, secretKey, (error, decoded) => {
            if(error){
                console.log(error)
            }else {

               
                console.log("token verified");
                // const user =  User.findOne({ email :decoded.email });
                console.log(decoded.email)

                email = decoded.email ;
                

                
            }
        })
        const admin = await Admin.findOne({ email :email });
        res.status(200).send({ rst : "checked" , admin: admin });
    
   

})

router.route("/").get((req, res) => {
    Admin.find()
      .then((admins) => {
        res.json(admins);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.route("/get/:id").get(async (req, res) => {
    let aid = req.params.id;
  
    const usr = await Admin.findById(aid)
      .then((staff) => {
        res.status(200).send({ status: "Staff fetched", staff });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send({
          status: "Error in getting staff details",
          error: err.message,
        });
      });
  });



  router.get("/search", async (req, res) => {
    try {
      const query = req.query.query; 
      const results = await Admin.find({
        $or: [
          { email: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
          { roleName: { $regex: query, $options: "i" } },
          { allocatedWork: { $regex: query, $options: "i" } },
          { roleName: { $regex: query, $options: "i" } },
        ],
      });
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });


  router.route("/update/:id").put(async (req, res) => {
    let sid = req.params.id;
  
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const roleName = req.body.roleName ;
    const allocatedWork = req.body.allocatedWork ;


    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "hospitalitp@zohomail.com",
        pass: "Sliit@321",
      },
    });
    
  
    const updateStaff = {
      name,
      email,
      phone,
      roleName,
      allocatedWork
    };
  
    const update = await Admin.findByIdAndUpdate(sid, updateStaff)
      .then(() => {

        const mailOptions = {
          from: "hospitalitp@zohomail.com",
          to: `${email}`,
          subject: "Staff Profile Updated",
          text: `Hello ${name}, \nYour Staff Account has been Updated.\n
              \nEmail : ${email} \nNew Role : ${roleName}\nAllocated Work : ${allocatedWork}\nPhone : ${phone}\nThank You.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.status(200).send({ status: "Staff updated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          status: "Error with updating information",
          error: err.message,
        });
      });
  });



  router.route("/updateStaff/:id").put(async (req, res) => {
    let sid = req.params.id;
  
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const roleName = req.body.roleName ;
    const allocatedWork = req.body.allocatedWork ;
    const password = req.body.password ;


   
    
  
    const updateStaff = {
      name,
      email,
      phone,
      roleName,
      allocatedWork,
      password
    };
  
    const update = await Admin.findByIdAndUpdate(sid, updateStaff)
      .then(() => {

        res.status(200).send({ status: "Staff updated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          status: "Error with updating information",
          error: err.message,
        });
      });
  });

module.exports = router ;