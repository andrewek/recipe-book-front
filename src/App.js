import './App.css';
import {React, useState} from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>The button has been clicked {count} times</h1>
        <button
          className="button"
          onClick={() => setCount((prevCount) => prevCount + 1 ) }
        >
          Click Me!
        </button>
      </header>
    </div>
  );
}

export default App;
