import express from "express";
import {
  tambahAsesmen,
  listAsesmen,
  editAsesmen,
  hapusAsesmen
} from "../controllers/asesmenController.js";

const router = express.Router();

router.post("/tambah/:bangunan_id", tambahAsesmen);
router.get("/list/:bangunan_id", listAsesmen);
router.put("/edit/:id", editAsesmen);
router.delete("/hapus/:id", hapusAsesmen);

export default router;
