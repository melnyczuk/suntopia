#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime;
varying vec2 vUv;
uVu = iResolution

float speed = 0.5;
float amount = 1.5;

float random (in vec2 st, in float seed) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123) * seed;
}

float noise (in vec2 st) {
  float seed = 1.0 + 0.5 * sin(iTime * speed);

  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = (i + vec2(0.5, 0.0), seed);
  float b = (i + vec2(0.5, 1.0), seed);
  float c = (i + vec2(1.0, 0.5), seed);
  float d = (i + vec2(0.0, 0.5), seed);
  vec2 u = smoothstep(0.,1.,f);
  return mix(0.0, seed, u.y) + (c - a) * u.y * (1.0 - u.y) + (d - b) * u.y;
}

void main() {
  vec2 pos = vUv;
  float r = noise(pos) * amount * 2.0 * pos.y;
  float g = noise(pos) * amount * 1.75 * pos.y;
  float b = noise(pos) * amount * (1.0 / pos.y);
  gl_FragColor = vec4(vec3(r,g,b), 1.0);
}
