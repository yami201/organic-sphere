import { GUI } from "lil-gui"
import { Color, Vector2 } from "three"
export const gui = new GUI()

export const debugObj = {
    shaderUniforms:{
        uTime:{value : 0},
        uDistortionFreq: {value :1.5},
        uDistortionStrength:{ value :0.65 },
        uDisplacementFreq: { value: 2.1 },
        uDisplacementStrength: { value: 0.15 }, // 0.15
        //Clr
        uSubdivision : {value : new Vector2(512,512 )},
        //LightA
        uLightAClr:{ value : new Color('#00eeff')},
        uLightAPosition:{value : new Color(1.0,1.0,0)},
        uLightAIntensity:{value : 5},
        //LightB
        uLightBClr:{ value : new Color('#fa6400')},
        uLightBPosition:{value : new Color(-1.0,-1.0,0)},
        uLightBIntensity:{value : 5},

        uFresnelOffset:{value : -1},
        uFrenselMultiplier:{value : 2}
    },
    sphereWireframe:false,
    timer:2550
}

export const createTweaks = () => {
    gui.add(debugObj,'timer').min(0).max(10000)
    gui.add(debugObj.shaderUniforms.uDistortionFreq,'value').min(0).max(5).name('uDistortionFreq').step(0.001)
    gui.add(debugObj.shaderUniforms.uDistortionStrength,'value').min(0).max(10).name('uDistortionStrength').step(0.001)
    gui.add(debugObj.shaderUniforms.uDisplacementFreq,'value').min(0).max(5).name('uDisplacementFreq').step(0.001)
    gui.add(debugObj.shaderUniforms.uDisplacementStrength,'value').min(0).max(10).name('uDisplacementStrength').step(0.001)
    gui.add(debugObj.shaderUniforms.uLightAIntensity,'value').min(0).max(5).name('uLightAIntensity')
    gui.addColor(debugObj.shaderUniforms.uLightAClr,'value').name('uLightAClr')
    gui.add(debugObj.shaderUniforms.uLightBIntensity,'value').min(0).max(5).name('uLightBIntensity')
    gui.addColor(debugObj.shaderUniforms.uLightBClr,'value').name('uLightBClr')
    gui.add(debugObj.shaderUniforms.uFrenselMultiplier,'value').name('uFresnelMultiplier').min(0).max(5).step(0.001)
    gui.add(debugObj,'sphereWireframe')

    gui.open(false)
}
