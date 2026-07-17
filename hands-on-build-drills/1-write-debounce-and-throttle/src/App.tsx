import { useState, type ChangeEvent } from "react";
import { useDebounce, useWindowSize } from "./utils/helpers";

function App() {
  const [inputV, setInputV] = useState("Test");

  const debounce = useDebounce((val: string) => {
    setInputV(val);
  }, 500);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    debounce(e.target.value);
  }

  const size = useWindowSize();

  return (
    <>
      <section id="center">
        <div>
          <h2>debounce</h2>
          <input type="text" onChange={handleInput} />
          <p>{inputV}</p>
          <p>
            They are gonna update 1000ms later <br />
            height:{size.height}
            <br />
            width:{size.width}
          </p>
        </div>
        <br />
      </section>
    </>
  );
}

export default App;
