import { useState } from "react";
import MainPage from "./pages/MainPage";
import Second from "./pages/Second";
import EventLoopPlayground from "./pages/PredictEventLoop";

// The whole "router": a union of the pages we can be on.
type Page = "main" | "second" | "predict";

const PAGES: { key: Page; label: string }[] = [
  { key: "main", label: "Main Page" },
  { key: "second", label: "Second Page" },
  { key: "predict", label: "Predict Event Loop" },
];

function App() {
  const [page, setPage] = useState<Page>("main");

  return (
    <>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {PAGES.map(({ key, label }) => {
          const isActive = page === key;

          return (
            <button
              key={key}
              onClick={() => setPage(key)}
              // aria-current tells screen readers which item is the active page.
              aria-current={isActive ? "page" : undefined}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
                color: isActive ? "#4a90d9" : "#888",
                textDecoration: isActive ? "underline" : "none",
                fontWeight: isActive ? 700 : 400,
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <main>
        {page === "main" ? (
          <MainPage />
        ) : page === "predict" ? (
          <EventLoopPlayground />
        ) : (
          <Second />
        )}
      </main>
    </>
  );
}

export default App;
