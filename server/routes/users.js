import express from "express";
import { getUser, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.get("/find/:id", getUser);
router.put("/:id", verifyToken, update);
// router.get("/parag", (req, res) => {
//   res.send("U are in user route doing get request parag!");
// });

export default router;
