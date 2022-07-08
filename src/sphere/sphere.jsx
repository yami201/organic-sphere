import vertexShader from '../shader/sphere-shader/vertex.glsl'
import fragmentShader from '../shader/sphere-shader/fragment.glsl'
import { useFrame} from '@react-three/fiber';
import { Mesh, SphereBufferGeometry, ShaderMaterial, Vector3 } from 'three';
import { debugObj} from '../debug.gui';
import { useRef } from 'react';

const OrganicSphere = () => {
    const animationObj = useRef({
        uMousePos: {value:new Vector3()},
        uAnimationTrigger: { value : false},
        uAnimationTimer: {value : 0}
    })
    const sphereGeo = new SphereBufferGeometry(
        2,
        debugObj.shaderUniforms.uSubdivision.value.x,
        debugObj.shaderUniforms.uSubdivision.value.y
    )
    sphereGeo.computeTangents()
    const sphereMat = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms:{
            ...debugObj.shaderUniforms,
            ...animationObj.current,
        },
        defines:{
            PI:Math.PI,
            USE_TANGENT:'' 
        },
    })
    let resetDisplacementStrength
    const clickHandler = event => {
        animationObj.current.uMousePos.value = event.point
        animationObj.current.uAnimationTrigger.value = true
        clearTimeout(resetDisplacementStrength)
        resetDisplacementStrength = setTimeout(() => {
            animationObj.current.uAnimationTrigger.value = false
        },debugObj.timer)
    }
    useFrame( ({ clock : { elapsedTime } },delta) => {
        if(animationObj.current.uAnimationTrigger.value){
            animationObj.current.uAnimationTimer.value += delta
        } else  {
            animationObj.current.uAnimationTimer.value = 0
        }
        debugObj.shaderUniforms.uTime.value = elapsedTime
        sphereMat.wireframe = debugObj.sphereWireframe
    })
    const sphere = new Mesh(sphereGeo,sphereMat)
    return <primitive 
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'unset'}
        object={sphere} 
        onClick={clickHandler}/>
}
export default OrganicSphere;