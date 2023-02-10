#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime;
varying vec2 vUv;

vec2 speed = vec2(1.0,2.0);
vec3 rgb_mix = vec3(0.67,0.59,0.6);
vec2 gain_mix = vec2(4.6, 2.6);
vec2 rOff = vec2(0.46, 0.67);
vec2 gOff = vec2(0.26, 0.85);
vec2 bOff = vec2(0.36, 0.57);

float random (in vec2 st) {
  return fract(sin(dot(st.xy,vec2(12.9898,78.233))) * 43758.5453123);
}

float noise (in float y) {
  float i = floor(y);
  float a = random(i + vec2(1.0, 0.5)) - random(i + vec2(0.5, 0.0));
  float b = random(i + vec2(0.0, 0.5))-random(i + vec2(0.5, 1.0));
  float u = smoothstep(0.,1.,fract(y));
  return mix(0.0, 1.0, u) + a * u * (1.0 - u) + b * u;
}

vec3 vertical(float y, float v) {
    return vec3(noise(y) * (1.0 - y));
}

float shift (float v, vec2 o) {
    return 0.025 * (sin(v * o.x) + cos(v * o.y));
}

float parabola(float x, float k) {
    return pow( 4.0 * x * (1.0 - x), k * 2.0 + 1.0);
}

vec3 horizontal(float x, float v){
    float spread = 258.0;
    return vec3(
      parabola( x-shift(v, rOff), 1.0/spread ),
      parabola( x-shift(v, gOff), 1.0/spread ),
      parabola( x-shift(v, bOff), 1.0/spread )
    );
}

vec3 rgb(vec2 pos, float vel) {
    return horizontal(pos.x, vel) * vertical(pos.y, vel);
}

void main() {
    vec2 pos = vUv;
    vec2 vel = iTime * speed;
    
    vec3 col1 = 1.0 - rgb(pos, vel.x) * gain_mix.x;
    vec3 col2 = rgb(pos, vel.y) * gain_mix.y;
    vec3 col = (col1 + col2) * rgb_mix;
    
    gl_FragColor = vec4(col, 1.0);
}
