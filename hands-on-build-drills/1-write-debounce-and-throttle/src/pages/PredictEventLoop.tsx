import { useState } from "react";

// Ekranda göstereceğimiz kod bloğunu bir değişkene atıyoruz
const codeSnippet = `const runTest = async () => {
  logScreen("console.log first");

  setTimeout(() => {
    logScreen("setTimeOut = '0'");
  }, 0);

  Promise.resolve().then(() => {
    logScreen("1. Promise then");
  });

  const myPromise2 = new Promise((resolve) => {
    logScreen("myPromise 2");
    resolve(); // İş bitti, VIP salona (.then) geçebiliriz
  });

  Promise.resolve().then(() => {
    logScreen("MyPromise 3");
  });

  setTimeout(() => {
    logScreen("setTimeOut = '10'");
  }, 10);

  logScreen("console.log second");
};`;

export default function EventLoopPlayground() {
  const [lastOutput, setLastOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Konsola yazdırır gibi ekrana yazdıran fonksiyon
  const logScreen = (message) => {
    setLastOutput((prev) => [...prev, message]);
  };

  // Testin çalıştığı ana alan
  const runTest = async () => {
    setLastOutput([]);
    setIsRunning(true);

    logScreen(`console.log first`);

    setTimeout(() => {
      logScreen(`setTimeOut = '0'`);
    }, 0);

    Promise.resolve().then(() => {
      logScreen(`1. Promise then`);
    });

    const myPromise2 = new Promise((resolve) => {
      logScreen(`myPromise 2`);
      resolve(); // works is done, take it inside to the thens
    });

    Promise.resolve().then(() => {
      logScreen(`MyPromise 3`);
    });

    setTimeout(() => {
      logScreen(`setTimeOut = '10'`);
    }, 10);

    logScreen(`console.log second`);
  };

  // Testi sıfırlama
  const testReset = () => {
    setLastOutput([]);
    setIsRunning(false);
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}
    >
      <h2>Event Loop Tahmin Oyunu</h2>
      <p style={{ color: "#555", marginBottom: "20px" }}>
        Kodu incele, tahminini yap ve "Testi Çalıştır" butonuna bas. Bakalım "Aşçı" hangi sırayla çalışacak?
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={runTest}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Testi Çalıştır
        </button>
        <button
          onClick={testReset}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          Sıfırla
        </button>
      </div>

      {/* İki Kolonlu Yapı: Çıktı (Sol) ve Kod (Sağ) */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        {/* SOL: Gerçekleşen Çıktı */}
        <div
          style={{
            flex: "1 1 300px",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            minHeight: "350px",
            backgroundColor: "#fafafa"
          }}
        >
          <h3 style={{ marginTop: 0, borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
            Çalışma Sırası (Çıktı)
          </h3>
          {lastOutput.length === 0 && isRunning && (
            <p style={{ color: "#999" }}>Henüz bir log yazılmadı...</p>
          )}
          {lastOutput.length === 0 && !isRunning && (
            <p style={{ color: "#999", fontStyle: "italic" }}>Testi başlatmanız bekleniyor...</p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "15px" }}>
            {lastOutput.map((log, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  borderLeft: "4px solid",
                  borderLeftColor: log.toLowerCase().includes("promise")
                    ? "#faad14" // Promise için sarı/turuncu çizgi
                    : log.toLowerCase().includes("timeout")
                      ? "#1890ff" // Timeout için mavi çizgi
                      : "#52c41a", // Senkron için yeşil çizgi
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  fontWeight: "500"
                }}
              >
                {index + 1}. {log}
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ: Çalışan Kod */}
        <div
          style={{
            flex: "1 1 400px",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#282c34", // Koyu tema kod görünümü
            color: "#abb2bf"
          }}
        >
          <h3 style={{ marginTop: 0, color: "#fff", borderBottom: "2px solid #555", paddingBottom: "10px" }}>
            Kod Sıralaması
          </h3>
          <pre style={{ margin: 0, overflowX: "auto", fontSize: "14px", lineHeight: "1.5" }}>
            <code>{codeSnippet}</code>
          </pre>
        </div>

      </div>
    </div>
  );
}