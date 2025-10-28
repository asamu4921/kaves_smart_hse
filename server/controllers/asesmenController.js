import Asesmen from "../models/Asesmen.js";

// ➕ Tambah asesmen
export const tambahAsesmen = async (req, res) => {
  try {
    const { bangunan_id } = req.params;
    const data = req.body;

    const asesmen = await Asesmen.create({
      bangunan_id,
      ...data,
      dibuat_oleh: req.body.userId,
      tanggal_dibuat: new Date(),
    });

    res.json({
      success: true,
      message: "Asesmen berhasil ditambahkan",
      data: asesmen,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// 📋 Tampilkan semua asesmen dalam 1 bangunan
export const listAsesmen = async (req, res) => {
  try {
    const { bangunan_id } = req.params;
    const data = await Asesmen.find({ bangunan_id });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ Edit asesmen
export const editAsesmen = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Asesmen.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      success: true,
      message: "Asesmen berhasil diperbarui",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ Hapus asesmen
export const hapusAsesmen = async (req, res) => {
  try {
    const { id } = req.params;
    await Asesmen.findByIdAndDelete(id);
    res.json({ success: true, message: "Asesmen berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
