import React, { useRef, useMemo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Error Boundary for WebGL
interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("WebGL Context Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="fixed inset-0 bg-zinc-900 z-[-1]" />; // Fallback background
    }
    return this.props.children;
  }
}

const VertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

// Simplex noise helper
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float time = uTime * 0.2;
  
  // Domain warping for liquid effect
  vec2 q = vec2(0.);
  q.x = snoise(uv + vec2(0.0, time));
  q.y = snoise(uv + vec2(1.0, time));

  vec2 r = vec2(0.);
  r.x = snoise(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time);
  r.y = snoise(uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time);

  float f = snoise(uv + r);

  // Tie dye colors (Darker, more sophisticated palette)
  vec3 colorA = vec3(0.1, 0.1, 0.2); // Dark Blue/Grey
  vec3 colorB = vec3(0.2, 0.0, 0.2); // Dark Purple
  vec3 colorC = vec3(0.0, 0.2, 0.2); // Dark Teal

  // Mix based on noise
  vec3 color = mix(colorA, colorB, clamp((f*f)*4.0, 0.0, 1.0));
  color = mix(color, colorC, clamp(length(q), 0.0, 1.0));
  
  // Create "Outline" / Contour effect
  // Use sine waves on the noise value to create distinct bands
  float lines = sin(f * 20.0 + time * 2.0);
  float outline = smoothstep(0.4, 0.45, abs(lines));
  
  // Add outlines to color
  vec3 outlineColor = vec3(0.4, 0.4, 0.5); // Lighter contour
  color = mix(color, outlineColor, 1.0 - outline);

  // Vignette
  float dist = distance(uv, vec2(0.5));
  color *= 1.2 - dist;

  gl_FragColor = vec4(color, 1.0);
}
`;

const LiquidPlane: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 20]} /> {/* Large enough to cover screen */}
      <shaderMaterial
        fragmentShader={FragmentShader}
        vertexShader={VertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const LiquidBackground: React.FC = () => {
  return (
    <WebGLErrorBoundary>
      <div id="canvas-container">
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
          <LiquidPlane />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
};