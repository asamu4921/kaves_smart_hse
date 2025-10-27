import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  listBangunan,
  buatBangunan,
  editBangunan,
  hapusBangunan,
} from "../controllers/bangunanController.js";

const router = express.Router();

// GET list bangunan di ruang kerja tertentu
router.get("/list/:ruangkerja_id", userAuth, listBangunan);

// POST buat bangunan pada ruang kerja tertentu (ruangkerja_id di param)
router.post("/buat/:ruangkerja_id", userAuth, buatBangunan);

// PUT edit berdasarkan id bangunan
router.put("/edit/:id", userAuth, editBangunan);

// DELETE soft-delete berdasarkan id bangunan
router.delete("/hapus/:id", userAuth, hapusBangunan);

export default router;
