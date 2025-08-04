import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  useEffect(()=>{
   
        async function captureScreenshot() {
          try {
            // Call the Rust command
            const path:string = await invoke('take_screenshot');
            setGreetMsg(path)
            console.log('Screenshot saved at:', path);
            alert(`Screenshot saved at: ${path}`);
          } catch (error) {
            console.error('Failed to take screenshot:', error);
          }
        }

      setInterval(()=>{
        captureScreenshot();
      }, 10000)
  
  },[])

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet2", { name }));
  }



  return (
    <main className="container">
      <h1>Welcome to Tauri</h1>

      <div className="row">
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
      </div>
      <p>Click on the Tauri.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
