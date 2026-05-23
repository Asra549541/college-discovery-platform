import express from "express";

import {
  seedColleges,
  getColleges,
  compareColleges,
  getSingleCollege
} from "../controllers/collegeController";

const router = express.Router();

router.post("/seed", seedColleges);

router.get("/", getColleges);
router.get("/:id", getSingleCollege);

router.post("/compare", compareColleges);

export default router;