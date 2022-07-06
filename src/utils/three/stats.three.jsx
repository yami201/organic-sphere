import Stats from "stats.js";
import { useFrame } from '@react-three/fiber'


const StatsPanel = () => {
    const stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    return useFrame(({gl,camera,scene}) => {
        stats.begin()
        gl.render(scene,camera)
        stats.end()
    })
}
export default StatsPanel;