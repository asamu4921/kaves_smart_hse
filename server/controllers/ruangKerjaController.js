import RuangKerja from "../models/RuangKerja.js";

// ✅ List ruang kerja milik user login
export const listRuangKerja = async (req, res) => {
  try {
    const ruang = await RuangKerja.find({
      pengguna_id: req.body.userId,
      tanggal_dihapus: { $exists: false }
    }).sort({ tanggal_dibuat: -1 });

    res.json({ success: true, data: ruang });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Buat ruang kerja
export const buatRuangKerja = async (req, res) => {
  try {
    const { nama } = req.body;

    if (!nama) return res.json({ success: false, message: "Nama ruang kerja harus diisi" });

    const ruang = new RuangKerja({
      nama,
      pengguna_id: req.body.userId
    });

    await ruang.save();
    res.json({ success: true, message: "Ruang kerja berhasil dibuat", data: ruang });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Edit ruang kerja
export const editRuangKerja = async (req, res) => {
  try {
    const { id, nama } = req.body;

    await RuangKerja.findOneAndUpdate(
      { _id: id, pengguna_id: req.body.userId },
      { nama, tanggal_diedit: new Date() }
    );

    res.json({ success: true, message: "Ruang kerja berhasil diupdate" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ✅ Hapus ruang kerja (soft delete)
export const hapusRuangKerja = async (req, res) => {
  try {
    const { id } = req.body;

    await RuangKerja.findOneAndUpdate(
      { _id: id, pengguna_id: req.body.userId },
      { tanggal_dihapus: new Date() }
    );

    res.json({ success: true, message: "Ruang kerja berhasil dihapus" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
