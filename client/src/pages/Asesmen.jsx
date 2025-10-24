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
    likelihood: "",
    severity: "",
    risk: "",
    level: "",
    impact: "",
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

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    if (field === "likelihood" || field === "severity") {
      const { risk, danger } = calculateRiskData(newData.likelihood, newData.severity);
      newData.risk = risk;
      newData.danger = danger;
    }
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
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
                {/* Form fields */}
              </form>
            )}

            {/* Tabel Asesmen */}
            <div className="overflow-x-auto">
              {/* Table sama seperti versi lama */}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Asesmen;
