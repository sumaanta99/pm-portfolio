"use client";

import { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const MODEL_URL = "https://threejs.org/examples/models/gltf/Michelle.glb";

function MichelleModel() {
  const { scene, animations } = useGLTF(MODEL_URL);
  const clonedScene = useMemo(() => clone(scene), [scene]);
  const { actions } = useAnimations(animations, clonedScene);

  useEffect(() => {
    const clip = animations[0];
    if (!clip) return;

    const action = actions[clip.name];
    action?.reset().fadeIn(0.35).play();

    return () => {
      action?.fadeOut(0.2);
    };
  }, [actions, animations]);

  return (
    <primitive
      object={clonedScene}
      position={[0, -1.55, 0]}
      rotation={[0, -0.55, 0]}
      scale={1.65}
    />
  );
}

export function HeroScene() {
  return (
    <div className="relative h-[30rem] overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 50, position: [1.1, 2, 3] }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMappingExposure = 0.45;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight color="#4466ff" intensity={0.85} />
          <pointLight position={[1.2, 2.6, 3]} intensity={22} distance={12} />
          <directionalLight position={[-2, 3, 2]} intensity={1.2} color="#f2d4c8" />
          <MichelleModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
