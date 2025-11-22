import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Vite + React + TypeScript</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR updates.
        </p>
        <p>Click on the Vite and React logos to learn more.</p>
      </div>
    </>
  );
}

export default App;
