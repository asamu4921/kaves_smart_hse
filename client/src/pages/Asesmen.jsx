import { useState, useEffect } from "react";

function Asesmen() {
  const [ruangList, setRuangList] = useState([]);
  const [selectedRuang, setSelectedRuang] = useState(null);
  const [bangunanList, setBangunanList] = useState([]);
  const [selectedBangunan, setSelectedBangunan] = useState(null);
  const [asesmenList, setAsesmenList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
  jenis_pekerjaan: "",
  jenis_bahaya: "",
  cause_effect: "",
  likelihood: "",   // angka
  severity: "",     // angka
  risk: "",
  levelText: "",    // teks untuk dikirim/display
  level: "",        // angka untuk select
  impactText: "",   // teks untuk dikirim/display
  impact: "",       // angka untuk select
  danger: "",
  prevensi: "",
});

  // Ambil ruang kerja
  useEffect(() => {
    const fetchRuang = async () => {
      try {
        const res = await fetch("http://localhost:5454/api/ruangkerja/list-ruangkerja", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setRuangList(data.data || []);
          if (data.data.length > 0) handleSelectRuang(data.data[0]); // otomatis pilih ruang pertama
        }
      } catch {
        alert("Gagal mengambil data ruang kerja");
      }
    };
    fetchRuang();
  }, []);

  const fetchBangunan = async (ruangId) => {
    setLoading(true);
    setSelectedBangunan(null);
    setAsesmenList([]);
    try {
      const res = await fetch(`http://localhost:5454/api/bangunan/list/${ruangId}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setBangunanList(data.data || []);
    } catch {
      alert("Gagal mengambil data bangunan");
    }
    setLoading(false);
  };

  const fetchAsesmen = async (bangunanId) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5454/api/asesmen/list/${bangunanId}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setAsesmenList(data.data || []);
    } catch {
      alert("Gagal mengambil data asesmen");
    }
    setLoading(false);
  };

  const handleSelectRuang = (ruang) => {
    setSelectedRuang(ruang);
    fetchBangunan(ruang._id);
  };

  const handleSelectBangunan = (bangunan) => {
    setSelectedBangunan(bangunan);
    fetchAsesmen(bangunan._id);
  };

  const calculateRiskData = (likelihood, severity) => {
    const risk = Number(likelihood) * Number(severity);
    let danger = "";
    if (risk >= 15) danger = "High";
    else if (risk >= 5) danger = "Medium";
    else danger = "Low";
    return { risk, danger };
  };

  const levelMap = {
  "1": { text: "Rare", likelihood: 1 },
  "2": { text: "Unlikely", likelihood: 2 },
  "3": { text: "Possible", likelihood: 3 },
  "4": { text: "Likely", likelihood: 4 },
  "5": { text: "Almost Certain", likelihood: 5 },
};

const impactMap = {
  "1": { text: "Insignificant", severity: 1 },
  "2": { text: "Minor", severity: 2 },
  "3": { text: "Moderate", severity: 3 },
  "4": { text: "Major", severity: 4 },
  "5": { text: "Fatal", severity: 5 },
};

const handleChange = (field, value) => {
  const newData = { ...formData };

  if (field === "level" && value in levelMap) {
    newData.level = value; // tetap angka untuk select
    newData.likelihood = levelMap[value].likelihood;
    newData.levelText = levelMap[value].text; // teks untuk display
  }

  if (field === "impact" && value in impactMap) {
    newData.impact = value; // tetap angka untuk select
    newData.severity = impactMap[value].severity;
    newData.impactText = impactMap[value].text; // teks untuk display
  }

  // Hitung Risk & Danger
  const likelihood = Number(newData.likelihood) || 0;
  const severity = Number(newData.severity) || 0;
  const risk = likelihood * severity;

  let danger = "";
  if (risk >= 15) danger = "High";
  else if (risk >= 5) danger = "Medium";
  else danger = "Low";

  newData.risk = risk;
  newData.danger = danger;

  setFormData(newData);
};




  const handleSubmitAsesmen = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5454/api/asesmen/tambah/${selectedBangunan._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success) {
        setShowAddForm(false);
        setFormData({
          jenis_pekerjaan: "",
          jenis_bahaya: "",
          cause_effect: "",
          likelihood: "",
          severity: "",
          risk: "",
          level: "",
          impact: "",
          danger: "",
          prevensi: "",
        });
        fetchAsesmen(selectedBangunan._id);
      } else {
        alert(data.message);
      }
    } catch {
      alert("Gagal menambah asesmen");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 overflow-y-auto">

        <h1 className="text-3xl font-bold text-center mb-6">📝 Isi Asesmen</h1>

        {/* RUANG KERJA */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Ruang Kerja</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ruangList.map((ruang) => (
              <button
                key={ruang._id}
                onClick={() => handleSelectRuang(ruang)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedRuang?._id === ruang._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 hover:bg-blue-50"
                }`}
              >
                <h3 className="font-medium">{ruang.nama}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* BANGUNAN */}
        {selectedRuang && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              Bangunan di <span className="text-blue-600">{selectedRuang.nama}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {bangunanList.map((b) => (
                <button
                  key={b._id}
                  onClick={() => handleSelectBangunan(b)}
                  className={`p-4 border rounded-xl transition-all ${
                    selectedBangunan?._id === b._id
                      ? "bg-green-600 text-white"
                      : "bg-gray-50 hover:bg-green-50"
                  }`}
                >
                  <h3 className="font-medium">{b.nama}</h3>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ASESMEN */}
        {selectedBangunan && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">
                Asesmen - {selectedBangunan.nama}
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                + Tambah Asesmen
              </button>
            </div>

            {showAddForm && (
              <form
                onSubmit={handleSubmitAsesmen}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-xl border"
              >
                {/* Jenis Pekerjaan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Pekerjaan
                  </label>
                  <input
                    type="text"
                    value={formData.jenis_pekerjaan}
                    onChange={(e) => handleChange("jenis_pekerjaan", e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Jenis Bahaya */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Bahaya
                  </label>
                  <input
                    type="text"
                    value={formData.jenis_bahaya}
                    onChange={(e) => handleChange("jenis_bahaya", e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Cause & Effect */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cause & Effect
                  </label>
                  <textarea
                    value={formData.cause_effect}
                    onChange={(e) => handleChange("cause_effect", e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>

                {/* LEVEL (Likelihood) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level (Likelihood)
                  </label>
                  <select
                    value={formData.level} // tetap angka
                    onChange={(e) => handleChange("level", e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Pilih Level</option>
                    <option value="1">1 - Rare</option>
                    <option value="2">2 - Unlikely</option>
                    <option value="3">3 - Possible</option>
                    <option value="4">4 - Likely</option>
                    <option value="5">5 - Almost Certain</option>
                  </select>

                </div>

                {/* IMPACT (Severity) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Impact (Severity)
                  </label>
                  <select
                    value={formData.impact} // tetap angka
                    onChange={(e) => handleChange("impact", e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Pilih Impact</option>
                    <option value="1">1 - Insignificant</option>
                    <option value="2">2 - Minor</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4 - Major</option>
                    <option value="5">5 - Fatal</option>
                  </select>

                </div>

                {/* Risk (otomatis) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk</label>
                  <input
                    type="text"
                    value={formData.risk}
                    readOnly
                    className="w-full border rounded-lg p-2 bg-gray-100"
                  />
                </div>

                {/* Danger (otomatis) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danger</label>
                  <input
                    type="text"
                    value={formData.danger}
                    readOnly
                    className="w-full border rounded-lg p-2 bg-gray-100"
                  />
                </div>

                {/* Prevensi */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prevensi / Pencegahan
                  </label>
                  <textarea
                    value={formData.prevensi}
                    onChange={(e) => handleChange("prevensi", e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                </div>

                {/* Tombol Simpan */}
                <div className="col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Simpan Asesmen
                  </button>
                </div>
              </form>
            )}



            {/* Tabel Asesmen */}
            <div className="overflow-x-auto">
              {/* Table sama seperti versi lama */}
            </div>
          </section>
        )}

    </div>
  );
}

export default Asesmen;
