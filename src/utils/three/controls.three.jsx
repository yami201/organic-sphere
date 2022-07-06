import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend , useFrame, useThree } from '@react-three/fiber';
import { useRef } from "react"

extend({OrbitControls})
const Controls = () => {
    const controls = useRef()
    const {camera , gl} =  useThree()
    useFrame( () => {
        controls.current.update()
    })
    return (
        <orbitControls
            ref={controls} 
            args={[camera, gl.domElement]} 
            enableDamping
            rotateSpeed={0.5} />
    )
}
export default Controls;