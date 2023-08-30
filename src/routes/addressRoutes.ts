import { Router } from "express";
import { Address } from "../entity/Address";

const router = Router();

// add this route to help add addresses to the database
router.post("/addresses", async (req, res) => {
  try {
    let addAddress = new Address();
    addAddress.street = req.body.street;
    addAddress.city = req.body.city;
    addAddress.state = req.body.state;
    addAddress.zipCode = req.body.zipCode;

    let savedAddress = await req.dataSource.manager.save(addAddress);
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the user.");
  }
});

export default router;
