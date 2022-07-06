import './App.css';
import { Canvas } from '@react-three/fiber';
import Controls from './utils/three/controls.three';
import StatsPanel from './utils/three/stats.three';
function App() {
  return (
    <div className="App">
      <Canvas>
        <mesh>
          <boxGeometry/>
          <meshNormalMaterial/>
        </mesh>
        <StatsPanel/>
        <Controls/>
      </Canvas>
    </div>
  );
}

export default App;
