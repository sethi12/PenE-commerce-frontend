"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows, PresentationControls } from "@react-three/drei";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

function PenModel() {
  const penRef = useRef();

  useLayoutEffect(() => {
    // GSAP Animation: Pen comes from the bottom, scales up, and rotates 360 degrees (2 * PI)
    gsap.fromTo(
      penRef.current.position,
      { y: -5, z: -5 },
      { y: 0, z: 0, duration: 2, ease: "power3.out" }
    );
    
    gsap.fromTo(
      penRef.current.rotation,
      { y: 0, x: 1 },
      { y: Math.PI * 2, x: 0.5, duration: 2.5, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <group ref={penRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* REPLACE THIS MESH WITH YOUR ACTUAL 3D MODEL */}
        {/* Example: <primitive object={scene} /> (from useGLTF) */}
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 4, 32]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {/* Environment reflections (makes it look premium) */}
        <Environment preset="studio" />

        {/* Interactive Controls (Allows user to drag and rotate the pen) */}
        <PresentationControls 
          global 
          rotation={[0, 0, 0]} 
          polar={[-0.4, 0.2]} 
          azimuth={[-1, 0.75]} 
          config={{ mass: 2, tension: 400 }} 
          snap={{ mass: 4, tension: 400 }}
        >
          <PenModel />
        </PresentationControls>

        {/* Soft shadow under the pen */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}