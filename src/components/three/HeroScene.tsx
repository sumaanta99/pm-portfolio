"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.12;
    mesh.current.rotation.y = t * 0.18;
    // gentle parallax toward pointer
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      state.pointer.x * 0.4,
      0.04
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      state.pointer.y * 0.3,
      0.04
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={mesh} args={[1.5, 12]}>
        <MeshDistortMaterial
          color="#7c6cff"
          emissive="#38e0c9"
          emissiveIntensity={0.12}
          roughness={0.18}
          metalness={0.55}
          distort={0.42}
          speed={1.6}
        />
      </Icosahedron>
    </Float>
  );
}

function Particles({ count = 90 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#7c6cff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  const reduce = useReducedMotion();
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduce ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-4, -2, -3]} intensity={2.2} color="#38e0c9" />
        <Blob />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
