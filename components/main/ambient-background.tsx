"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/context/theme-context";

function FloatingParticles({ theme }: { theme: string }) {
  const count = 70;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      const speed = 0.2 + Math.random() * 0.4;
      const factor = Math.random() * 2;
      temp.push({ x, y, z, speed, factor });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const { speed, factor } = particle;
      dummy.position.set(
        particle.x + Math.sin(time * speed + factor) * 0.5,
        particle.y + Math.cos(time * speed * 0.8 + factor) * 0.5,
        particle.z + Math.sin(time * 0.5 + factor) * 0.2
      );
      dummy.scale.setScalar(0.04 + Math.sin(time + factor) * 0.015);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const particleColor = theme === "dark" ? "#a855f7" : "#818cf8";

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={particleColor}
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={theme === "dark" ? 0.35 : 0.25}
      />
    </instancedMesh>
  );
}

export const AmbientBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500">
      {/* Dynamic Gradient Atmospheric Orbs */}
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-200/30 dark:bg-purple-900/20 blur-[120px] transition-all duration-700" />
      <div className="absolute top-[30%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-sky-200/30 dark:bg-sky-900/20 blur-[130px] transition-all duration-700" />
      <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-emerald-200/20 dark:bg-emerald-900/15 blur-[120px] transition-all duration-700" />

      {/* R3F 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        className="w-full h-full opacity-70 dark:opacity-80"
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={theme === "dark" ? 0.9 : 1.2} />
        <pointLight
          position={[10, 10, 10]}
          intensity={theme === "dark" ? 0.8 : 0.5}
          color={theme === "dark" ? "#c084fc" : "#a5b4fc"}
        />
        <FloatingParticles theme={theme} />
      </Canvas>
    </div>
  );
};
