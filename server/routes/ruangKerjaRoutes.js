import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  listRuangKerja,
  buatRuangKerja,
  editRuangKerja,
  hapusRuangKerja
} from "../controllers/ruangKerjaController.js";

const router = express.Router();

router.get("/list-ruangkerja", userAuth, listRuangKerja);
router.post("/buat-ruangkerja", userAuth, buatRuangKerja);
router.put("/edit-ruangkerja", userAuth, editRuangKerja);
router.delete("/hapus-ruangkerja", userAuth, hapusRuangKerja);

export default router;
