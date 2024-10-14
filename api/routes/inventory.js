const router = require("express").Router();
let Inventory = require("../models/Inventory.js");

// Data insert
router.route("/add").post((req, res) => {
    const item_id = req.body.item_id;
    const item_name = req.body.item_name;
    const category = req.body.category;
    const quantity = Number(req.body.quantity);
    const price = Number(req.body.price);

    const newInventory = new Inventory({
        item_id,
        item_name,
        category,
        quantity,
        price
    });

    newInventory.save().then(() => {
        res.json("Data is saved to the database");
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error saving data!", error: error.message });
    });
});

// Data read
router.route("/").get((req, res) => {
    Inventory.find().then((items) => {
        res.json(items);
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error retrieving data!", error: error.message });
    });
});

// Data update
router.route("/update/:id").put(async (req, res) => {
    let inventoryID = req.params.id;
    const { item_id, item_name, category, quantity, price } = req.body;

    const updateInventory = {
        item_id,
        item_name,
        category,
        quantity,
        price
    };

    await Inventory.findByIdAndUpdate(inventoryID, updateInventory).then(() => {
        res.status(200).send({ status: "Inventory updated" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error updating data!", error: error.message });
    });
});

// Data delete
router.route("/delete/:id").delete(async (req, res) => {
    let inventoryID = req.params.id;

    await Inventory.findByIdAndDelete(inventoryID).then(() => {
        res.status(200).send({ status: "Inventory deleted" });
    }).catch((error) => {
        console.log(error.message);
        res.status(500).send({ status: "Error deleting data!", error: error.message });
    });
});

// Data read by ID
router.route("/get/:id").get(async (req, res) => {
    let inventoryID = req.params.id;

    await Inventory.findById(inventoryID).then((item) => {
        res.status(200).send({ status: "Inventory fetched", item });
    }).catch((error) => {
        console.log(error.message);
        res.status(500).send({ status: "Error fetching data!", error: error.message });
    });
});

module.exports = router;
