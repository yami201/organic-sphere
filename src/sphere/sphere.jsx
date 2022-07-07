import vertexShader from '../shader/sphere-shader/vertex.glsl'
import fragmentShader from '../shader/sphere-shader/fragment.glsl'
import { useFrame } from '@react-three/fiber';
import { Mesh, SphereBufferGeometry, ShaderMaterial } from 'three';
import { debugObj } from '../debug.gui';
const OrganicSphere = () => {
    const sphereGeo = new SphereBufferGeometry(
        2,
        debugObj.shaderUniforms.uSubdivision.value.x,
        debugObj.shaderUniforms.uSubdivision.value.y
    )
    sphereGeo.computeTangents()
    const sphereMat = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms:{...debugObj.shaderUniforms},
        defines:{
            PI:Math.PI,
            USE_TANGENT:'' 
        },
    })
    useFrame( ({ clock : { elapsedTime }, mouse }) => {
        debugObj.shaderUniforms.uTime.value = elapsedTime
        sphereMat.wireframe = debugObj.sphereWireframe
    })
    const sphere = new Mesh(sphereGeo,sphereMat)
    return <primitive object={sphere}/>
}
export default OrganicSphere;