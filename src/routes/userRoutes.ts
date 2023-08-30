import { Router } from "express";
import { User } from "../entity/User";

const router = Router();

// add this route to help add users to the database
router.post("/users", async (req, res) => {
  try {
    let newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;

    let savedUser = await req.dataSource.manager.save(newUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the user.");
  }
});

export default router;
