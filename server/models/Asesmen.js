import mongoose from "mongoose";

const asesmenSchema = new mongoose.Schema({
  bangunan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bangunan",
    required: true
  },
  jenis_pekerjaan: String,
  jenis_bahaya: String,
  cause_effect: String,
  likelihood: Number,
  severity: Number,
  risk: Number,
  level: String,
  impact: String,
  danger: String,
  prevensi: String,
  tanggal_dibuat: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Asesmen", asesmenSchema);
