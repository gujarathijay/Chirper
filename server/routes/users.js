import express from "express";
import {
  deleteUser,
  getUser,
  update,
  follow,
  unfollow,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

//Get User
router.get("/find/:id", getUser);

//Update User
router.put("/:id", verifyToken, update);

//Delete User
router.delete("/:id", verifyToken, deleteUser);

//Follow User
router.put("/follow/:id", verifyToken, follow);

//Unfollow User
router.put("/unfollow/:id", verifyToken, unfollow);

// router.get("/parag", (req, res) => {
//   res.send("U are in user route doing get request parag!");
// });

export default router;
