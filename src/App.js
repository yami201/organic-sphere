import './App.css';
import { Canvas } from '@react-three/fiber';
import Controls from './utils/three/controls.three';
import StatsPanel from './utils/three/stats.three';
import OrganicSphere from './sphere/sphere';
function App() {
  return (
    <div className="App">
      <h1>Click on the sphere</h1>
      <Canvas>
        <OrganicSphere/>
        <StatsPanel/>
        <Controls/>
      </Canvas>
    </div>
  );
}
export default App;
