import { useState } from "react";

function Second() {
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "1. Adım: Sunucudan Veri Çekme",
      status: "idle",
      result: "",
    },
    {
      id: 2,
      title: "2. Adım: Veriyi İşleme",
      status: "idle",
      result: "",
    },
    {
      id: 3,
      title: "3. Adım: Veriyi Kaydetme",
      status: "idle",
      result: "",
    },
  ]);

  const [isProgress, setIsProgress] = useState(false);

  const fakeAsyncOperation = (data, delayMs: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delayMs);
    });
  };

  const updateSteps = (id, status, result = "") => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, status, result } : step,
      ),
    );
  };

  const startPromiseChain = () => {
    setIsProgress(true);

    setSteps([
      {
        id: 1,
        title: "1. Adım: Sunucudan Veri Çekme",
        status: "pending",
        result: "Bekleniyor...",
      },
      { id: 2, title: "2. Adım: Veriyi İşleme", status: "idle", result: "" },
      {
        id: 3,
        title: "3. Adım: Veritabanına Kaydetme",
        status: "idle",
        result: "",
      },
    ]);

    fakeAsyncOperation("Ham Kullanıcı Verisi", 2500)
      .then((res1) => {
        updateSteps(1, "fullfilled", `Tamamlandı '${res1}'`);
        updateSteps(2, "pending", `İşleniyor..`);
        return fakeAsyncOperation(`${res1} => [İşlendi]`, 2500);
      })
      .then((res2) => {
        updateSteps(2, "fullfilled", `Tamamlandı '${res2}'`);
        updateSteps(3, "pending", `Kaydediliyor..`);
        return fakeAsyncOperation(`${res2} => [DB'ye Yazıldı]`, 2500);
      })
      .then((res3) => {
        updateSteps(3, "fullfilled", `Başarılı: '${res3}'`);
      });
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}
    >
      <h2>Promise Akış Görselleştirici</h2>

      <button
        onClick={startPromiseChain}
        disabled={isProgress}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: isProgress ? "not-allowed" : "pointer",
          marginBottom: "20px",
        }}
      >
        {isProgress ? "İşlem Devam Ediyor..." : "Promise Zincirini Başlat"}
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {steps.map((step) => (
          <div
            key={step.id}
            style={{
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor:
                step.status === "pending"
                  ? "#fffbe6"
                  : step.status === "fulfilled"
                    ? "#e6f7ff"
                    : "#f5f5f5",
              transition: "all 0.3s ease",
            }}
          >
            <strong>{step.title}</strong>
            <div>
              Durum:
              <b
                style={{
                  color:
                    step.status === "pending"
                      ? "#d48806"
                      : step.status === "fulfilled"
                        ? "#389e0d"
                        : "#8c8c8c",
                  marginLeft: "5px",
                }}
              >
                {step.status.toUpperCase()}
              </b>
            </div>
            {step.result && (
              <div style={{ fontSize: "12px", marginTop: "5px" }}>
                {step.result}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Second;
