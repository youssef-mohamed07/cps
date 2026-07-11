"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { BoothModelScene } from "@/components/three/booth-model-scene";

export type BoothModelVariant =
  | "custom"
  | "modular"
  | "double-deck"
  | "portable"
  | "kiosks"
  | "outdoor"
  | "pavilions"
  | "sustainable";

type BoothModelViewerProps = {
  variant: BoothModelVariant;
  modelUrl?: string;
  className?: string;
};

function ViewerFallback() {
  return (
    <div className="booth-model-viewer-fallback" aria-hidden="true">
      <span className="booth-model-viewer-spinner" />
    </div>
  );
}

export function BoothModelViewer({
  variant,
  modelUrl,
  className,
}: BoothModelViewerProps) {
  return (
    <div className={`booth-model-viewer${className ? ` ${className}` : ""}`}>
      <Suspense fallback={<ViewerFallback />}>
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [5.5, 3.2, 6.2], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#eef3f6"]} />
          <ambientLight intensity={0.55} />
          <directionalLight
            castShadow
            intensity={1.15}
            position={[6, 8, 4]}
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight intensity={0.35} position={[-4, 3, -2]} />
          <group position={[0, -0.02, 0]}>
            <BoothModelScene variant={variant} modelUrl={modelUrl} />
          </group>
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.28}
            scale={12}
            blur={2.4}
            far={8}
          />
          <Environment preset="city" />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.85}
            enablePan={false}
            minDistance={4.5}
            maxDistance={11}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            target={[0, 1, 0]}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
