import Bangunan from "../models/Bangunan.js";
import RuangKerja from "../models/RuangKerja.js"; // <- penting: import RuangKerja
import mongoose from "mongoose";

/**
 * GET /api/bangunan/list/:ruangkerja_id
 * List semua bangunan di ruang kerja (pastikan ruang kerja milik user)
 */
export const listBangunan = async (req, res) => {
  try {
    const { ruangkerja_id } = req.params;
    const userId = req.body.userId;

    if (!ruangkerja_id || !mongoose.Types.ObjectId.isValid(ruangkerja_id)) {
      return res.status(400).json({ success: false, message: "Ruang kerja ID tidak valid" });
    }

    const ruang = await RuangKerja.findById(ruangkerja_id);
    if (!ruang) {
      return res.status(404).json({ success: false, message: "Ruang kerja tidak ditemukan" });
    }

    if (String(ruang.pengguna_id) !== String(userId)) {
      return res.status(403).json({ success: false, message: "Not Authorized to view this workspace" });
    }

    const bangunan = await Bangunan.find({
      ruangkerja_id,
      tanggal_dihapus: { $exists: false }
    }).sort({ tanggal_dibuat: -1 });

    return res.json({ success: true, data: bangunan });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/bangunan/buat/:ruangkerja_id
 * Buat bangunan pada ruang kerja (ruang kerja di-cek milik user)
 * Body: { nama: "Tangga" }
 */
export const buatBangunan = async (req, res) => {
  try {
    const { ruangkerja_id } = req.params;
    const { nama } = req.body;
    const userId = req.body.userId;

    if (!ruangkerja_id || !mongoose.Types.ObjectId.isValid(ruangkerja_id)) {
      return res.status(400).json({ success: false, message: "Ruang kerja ID tidak valid" });
    }

    if (!nama || nama.trim() === "") {
      return res.status(400).json({ success: false, message: "Nama bangunan wajib diisi" });
    }

    const ruang = await RuangKerja.findById(ruangkerja_id);
    if (!ruang) {
      return res.status(404).json({ success: false, message: "Ruang kerja tidak ditemukan" });
    }

    if (String(ruang.pengguna_id) !== String(userId)) {
      return res.status(403).json({ success: false, message: "Not Authorized to create in this workspace" });
    }

    const bangunan = new Bangunan({
      nama,
      ruangkerja_id
    });

    await bangunan.save();
    return res.status(201).json({ success: true, message: "Bangunan berhasil dibuat", data: bangunan });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/bangunan/edit/:id
 * Edit nama bangunan (cek ownership via ruangkerja)
 * Body: { nama: "Nama Baru" }
 */
export const editBangunan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;
    const userId = req.body.userId;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Bangunan ID tidak valid" });
    }

    const bangunan = await Bangunan.findById(id);
    if (!bangunan) {
      return res.status(404).json({ success: false, message: "Bangunan tidak ditemukan" });
    }

    const ruang = await RuangKerja.findById(bangunan.ruangkerja_id);
    if (!ruang || String(ruang.pengguna_id) !== String(userId)) {
      return res.status(403).json({ success: false, message: "Not Authorized to edit this building" });
    }

    bangunan.nama = nama ?? bangunan.nama;
    bangunan.tanggal_diedit = new Date();
    await bangunan.save();

    return res.json({ success: true, message: "Bangunan berhasil diupdate", data: bangunan });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/bangunan/hapus/:id
 * Soft delete (set tanggal_dihapus)
 */
export const hapusBangunan = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Bangunan ID tidak valid" });
    }

    const bangunan = await Bangunan.findById(id);
    if (!bangunan) {
      return res.status(404).json({ success: false, message: "Bangunan tidak ditemukan" });
    }

    const ruang = await RuangKerja.findById(bangunan.ruangkerja_id);
    if (!ruang || String(ruang.pengguna_id) !== String(userId)) {
      return res.status(403).json({ success: false, message: "Not Authorized to delete this building" });
    }

    bangunan.tanggal_dihapus = new Date();
    await bangunan.save();

    return res.json({ success: true, message: "Bangunan berhasil dihapus" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
