"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, ContactShadows, Environment, useBounds } from "@react-three/drei";
import { PenModel } from "./pen-model";

/**
 * Bounds computes the pen's real, current bounding box and moves the
 * camera to frame it — so "is the whole pen in view" is answered by
 * measurement, not by hand-tuned distance/fov math that has to be
 * re-derived every time the geometry changes.
 *
 * It auto-fits once on mount and on resize (`fit clip observe`), but
 * that first fit happens while the entrance animation is still mid-
 * flight (pen scaled down, sliding in). This component re-triggers a
 * fit once `ready` flips true, which PenModel signals via onSettled
 * after its GSAP entrance timeline completes — so the final framing
 * is measured from the pen at its actual resting size and position.
 */
function RefitWhenSettled({ ready }) {
  const bounds = useBounds();
  useEffect(() => {
    if (ready) bounds.refresh().fit();
  }, [ready, bounds]);
  return null;
}

export function PenScene() {
  const [settled, setSettled] = useState(false);

  return (
    <div className="h-[420px] w-full sm:h-[520px] lg:h-[640px]">
      <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true }} camera={{ fov: 32 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[3, 4, 2]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, -1, -2]} intensity={0.5} color="#c9a86a" />

        <Suspense fallback={null}>
          {/* margin=1.4 leaves ~40% breathing room around the pen's
              measured bounding box on every side. */}
          <Bounds fit clip observe margin={1.4}>
            <RefitWhenSettled ready={settled} />
            <PenModel onSettled={() => setSettled(true)} />
          </Bounds>
          <Environment preset="studio" environmentIntensity={0.6} />
          <ContactShadows
            position={[0, -2.35, 0]}
            opacity={0.45}
            scale={8}
            blur={2.6}
            far={3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}