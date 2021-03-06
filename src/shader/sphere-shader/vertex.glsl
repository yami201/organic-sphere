//Vertex Position uniforms
uniform float uTime;
uniform float uDistortionFreq;
uniform float uDistortionStrength;
uniform float uDisplacementFreq;
uniform float uDisplacementStrength;

//Color uniforms
uniform vec2 uSubdivision;
//LightA
uniform vec3 uLightAClr;
uniform vec3 uLightAPosition;
uniform float uLightAIntensity;
//LightB
uniform vec3 uLightBClr;
uniform vec3 uLightBPosition;
uniform float uLightBIntensity;

uniform float uFresnelOffset;
uniform float uFrenselMultiplier;

//Animation Uniforms 
uniform bool uAnimationTrigger;
uniform vec3 uMousePos;
uniform float uAnimationTimer;
//Varying
varying vec3 vClr;

#pragma glslify: perlin4d = require('../perlin-noise.glsl')

vec3 getPosition(vec3 pos){
    float distanceFromClickPosition = distance(uMousePos,position) * 0.2;
    float distanceMultiplier = uAnimationTrigger ? abs(-cos((distanceFromClickPosition - uAnimationTimer * 0.3) * 3.0)) * 1.5 : 0.0;
    distanceMultiplier = step(0.1,step(1.0,distanceMultiplier)) ;
    vec3 distoredPos = pos;
    distoredPos += perlin4d(vec4(distoredPos * uDistortionFreq,uTime * 0.003 )) * uDistortionStrength ;

    float strength = perlin4d(vec4(distoredPos * uDisplacementFreq,uTime));

    vec3 displacedPosition = pos;
    
    displacedPosition += normalize(pos) * strength * uDisplacementStrength * distanceMultiplier;

    return displacedPosition;
}

void main(){
    
    vec3 displacedPosition = getPosition(position).xyz;
    vec4 modelPosition = modelMatrix * vec4(displacedPosition,1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;


    // Color
    vec3 color = vec3(0.0);

    //Tangent
    float distanceA = 2.0 * PI / uSubdivision.x;
    float distanceB = 2.0 * PI / uSubdivision.y;

    vec3 biTangent = cross(normal,tangent.xyz);

    vec3 positionA = position + tangent.xyz * distanceA;
    vec3 displacedPositionA = getPosition(positionA).xyz;

    vec3 positionB = position + biTangent * distanceB;
    vec3 displacedPositionB = getPosition(positionB).xyz;

    vec3 computedNormal = cross(displacedPositionA - displacedPosition,displacedPositionB - displacedPosition);
    computedNormal = normalize(computedNormal);

    vec3 viewDirection = normalize(displacedPosition - cameraPosition);
    float fresnel = uFresnelOffset + (1.0 + dot(viewDirection,computedNormal)) * uFrenselMultiplier;
    //LightA
    float lightAIntensity = max(0.0, - dot(computedNormal,normalize(-uLightAPosition))) * uLightAIntensity;
    //LightB
    float lightBIntensity = max(0.0,- dot(computedNormal,normalize(-uLightBPosition))) * uLightBIntensity;

    
    color = mix(color,uLightAClr,lightAIntensity * fresnel);
    color = mix(color,uLightBClr,lightBIntensity * fresnel);
    color = mix(color,vec3(1),clamp(pow(fresnel - 0.8,3.0),0.0,1.0));


    //varyings
    vClr = color;

}