import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Scene } from "./components/scene";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
