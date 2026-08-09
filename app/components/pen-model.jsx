"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { useTheme } from "./theme-provider";

/**
 * The pen is built from primitives rather than an imported model:
 * barrel, cap band, clip, brass rings, and a cone-tipped nib.
 * On mount it spins in a full 360° entrance; afterwards it idles
 * with a slow continuous rotation plus subtle pointer parallax.
 */
export function PenModel({ onSettled }) {
  const group = useRef();
  const idle = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  const barrelColor = theme === "dark" ? "#1c1a16" : "#100e0b";
  const brass = "#b8935a";
  const brassLight = "#d8b784";

  useEffect(() => {
    if (!group.current) return;

    // Set the resting pose imperatively rather than via the <group>
    // JSX `rotation` prop. If it were a JSX prop, R3F would re-apply
    // that literal value on every re-render (e.g. every theme toggle,
    // since this component reads useTheme()) and snap the idle spin
    // back to 0 mid-animation.
    group.current.rotation.set(-Math.PI * 2, 0.15, 0.12);
    group.current.position.set(0, -0.6, -3);
    group.current.scale.set(0.6, 0.6, 0.6);

    const tl = gsap.timeline({
      defaults: { duration: 1.8, ease: "power3.out" },
      onComplete: () => onSettled?.(),
    });
    tl.to(group.current.rotation, { y: 0, x: 0.15 }, 0);
    tl.to(group.current.position, { y: 0, z: 0 }, 0);
    tl.to(group.current.scale, { x: 1, y: 1, z: 1 }, 0);

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;

    // gentle parallax toward pointer
    idle.current.x += (state.pointer.y * 0.15 - idle.current.x) * 0.04;
    idle.current.y += (state.pointer.x * 0.2 - idle.current.y) * 0.04;
    group.current.rotation.x = 0.15 + idle.current.x;
  });

  const metal = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: brass,
        metalness: 1,
        roughness: 0.28,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
      }),
    []
  );

  const lacquer = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: barrelColor,
        metalness: 0.3,
        roughness: 0.15,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),
    [barrelColor]
  );

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.7}>
      <group ref={group}>
        {/*
          The meshes below run from y ≈ -1.73 (nib tip) to y ≈ 2.67
          (finial), so their midpoint sits at y ≈ 0.47, not 0. Nesting
          them in this offset inner group re-centers the whole pen on
          the outer group's origin — which is what the camera in
          pen-scene.jsx is actually framing. Without this the pen was
          rotating/floating around a point far above its own center,
          walking the top or bottom out of frame.
        */}
        <group position={[0, -0.47, 0]}>
          {/* barrel */}
          <mesh material={lacquer} position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.3, 3.2, 64]} />
          </mesh>

          {/* cap section (upper third, subtly wider) */}
          <mesh material={lacquer} position={[0, 1.85, 0]} castShadow>
            <cylinderGeometry args={[0.31, 0.28, 1.3, 64]} />
          </mesh>

          {/* brass band at cap line */}
          <mesh material={metal} position={[0, 1.25, 0]} castShadow>
            <torusGeometry args={[0.3, 0.035, 16, 48]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>

          {/* finial ring at very top */}
          <mesh material={metal} position={[0, 2.52, 0]} castShadow>
            <torusGeometry args={[0.1, 0.03, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
          <mesh material={metal} position={[0, 2.58, 0]} castShadow>
            <sphereGeometry args={[0.09, 24, 24]} />
          </mesh>

          {/* clip */}
          <mesh material={metal} position={[0.3, 1.7, 0]} rotation={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 0.9, 0.05]} />
          </mesh>

          {/* nib base */}
          <mesh material={metal} position={[0, -1.35, 0]} castShadow>
            <coneGeometry args={[0.24, 0.55, 64]} />
          </mesh>

          {/* nib tip */}
          <mesh material={metal} position={[0, -1.68, 0]} castShadow>
            <sphereGeometry args={[0.045, 16, 16]} />
          </mesh>

          {/* thin brass ring above nib */}
          <mesh material={metal} position={[0, -1.05, 0]} castShadow>
            <torusGeometry args={[0.26, 0.025, 16, 48]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}