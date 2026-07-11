"use client";

import { useMemo } from "react";
import { Float, useGLTF } from "@react-three/drei";
import type { BoothModelVariant } from "@/components/three/booth-model-viewer";

const NAVY = "#0f3355";
const ACCENT = "#2192b4";
const CYAN = "#00e3fe";
const LIGHT = "#eef3f6";
const FLOOR = "#d8e0e6";

type BoothModelSceneProps = {
  variant: BoothModelVariant;
  modelUrl?: string;
};

function ExternalModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(), [scene]);

  return (
    <group scale={1.6} position={[0, -0.5, 0]}>
      <primitive object={cloned} />
    </group>
  );
}

function Panel({
  position,
  size,
  color = NAVY,
  accent = false,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  accent?: boolean;
}) {
  const [w, h, d] = size;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.08} />
      </mesh>
      {accent ? (
        <mesh position={[0, h / 2 + 0.03, d / 2 + 0.01]}>
          <boxGeometry args={[w * 0.92, 0.06, 0.04]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={0.35}
            roughness={0.35}
          />
        </mesh>
      ) : null}
    </group>
  );
}

function Floor({ width, depth }: { width: number; depth: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial color={FLOOR} roughness={0.85} metalness={0.05} />
    </mesh>
  );
}

function Counter({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  const [w, h, d] = size;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={LIGHT} roughness={0.45} metalness={0.12} />
      </mesh>
      <mesh position={[0, h / 2 + 0.02, d / 2 + 0.01]}>
        <boxGeometry args={[w * 0.88, 0.04, 0.03]} />
        <meshStandardMaterial color={ACCENT} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Lightbox({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  const [w, h, d] = size;

  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive={CYAN}
        emissiveIntensity={0.55}
        roughness={0.25}
        metalness={0.05}
      />
    </mesh>
  );
}

function CustomBooth() {
  return (
    <group>
      <Floor width={7.5} depth={5.5} />
      <Panel position={[-0.4, 1.25, -2.2]} size={[6.2, 2.5, 0.18]} accent />
      <Panel position={[-3.05, 1.25, 0.2]} size={[0.18, 2.5, 3.8]} accent />
      <Lightbox position={[0.3, 1.35, -2.08]} size={[2.4, 1.35, 0.08]} />
      <Counter position={[1.2, 0.55, 1.35]} size={[2.2, 1.1, 0.75]} />
      <Panel position={[2.35, 0.85, -0.35]} size={[0.14, 1.7, 2.2]} color={ACCENT} />
      <mesh position={[0.8, 0.12, 0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.24, 0.55]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </mesh>
    </group>
  );
}

function ModularBooth() {
  const modules = [
    [-1.6, 0.9, -1.6],
    [0, 0.9, -1.6],
    [1.6, 0.9, -1.6],
    [-1.6, 0.9, 0],
    [0, 0.9, 0],
    [1.6, 0.9, 0],
  ] as const;

  return (
    <group>
      <Floor width={6.5} depth={5} />
      {modules.map((pos, index) => (
        <group key={index} position={pos}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.35, 1.8, 0.12]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? NAVY : ACCENT}
              roughness={0.5}
            />
          </mesh>
          <mesh position={[0, 0.15, 0.08]}>
            <boxGeometry args={[1.05, 0.55, 0.02]} />
            <meshStandardMaterial color={LIGHT} roughness={0.4} />
          </mesh>
        </group>
      ))}
      <Counter position={[0, 0.45, 1.55]} size={[2.6, 0.9, 0.65]} />
    </group>
  );
}

function DoubleDeckBooth() {
  return (
    <group>
      <Floor width={7} depth={5.5} />
      <Panel position={[0, 1.2, -2]} size={[5.8, 2.4, 0.16]} accent />
      <Panel position={[-2.75, 1.2, 0.15]} size={[0.16, 2.4, 3.6]} accent />
      <mesh position={[1.55, 2.05, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.14, 2.2]} />
        <meshStandardMaterial color={NAVY} roughness={0.55} />
      </mesh>
      <mesh position={[1.55, 2.55, -0.35]} castShadow>
        <boxGeometry args={[2.6, 0.9, 1.9]} />
        <meshStandardMaterial color={ACCENT} roughness={0.48} />
      </mesh>
      {[
        [-0.15, 0.55, 0.55],
        [0.55, 1.05, 0.55],
        [1.25, 1.55, 0.55],
      ].map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.85, 0.08, 0.28]} />
          <meshStandardMaterial color={LIGHT} roughness={0.45} />
        </mesh>
      ))}
      <Counter position={[-0.8, 0.5, 1.45]} size={[2, 1, 0.7]} />
    </group>
  );
}

function PortableBooth() {
  return (
    <group>
      <Floor width={5} depth={4} />
      <Panel position={[0, 1, -1.35]} size={[3.6, 2, 0.12]} accent />
      <Panel position={[-1.65, 0.55, 0.15]} size={[0.12, 1.1, 2.2]} color={ACCENT} />
      <Panel position={[1.65, 0.55, 0.15]} size={[0.12, 1.1, 2.2]} color={ACCENT} />
      <Lightbox position={[0, 1.05, -1.24]} size={[1.6, 0.9, 0.05]} />
      <Counter position={[0, 0.42, 0.95]} size={[1.5, 0.84, 0.55]} />
    </group>
  );
}

function KioskBooth() {
  return (
    <group>
      <Floor width={4.5} depth={4.5} />
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.95, 1.05, 1.9, 6]} />
        <meshStandardMaterial color={NAVY} roughness={0.52} />
      </mesh>
      <mesh position={[0, 1.75, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.65, 0.35, 6]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.25}
          roughness={0.35}
        />
      </mesh>
      <Counter position={[0, 0.45, 1.05]} size={[1.35, 0.9, 0.55]} />
    </group>
  );
}

function OutdoorBooth() {
  return (
    <group>
      <Floor width={8} depth={6} />
      {[
        [-2.8, 1.6, -2],
        [2.8, 1.6, -2],
        [-2.8, 1.6, 2],
        [2.8, 1.6, 2],
      ].map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.16, 3.2, 0.16]} />
          <meshStandardMaterial color={LIGHT} roughness={0.55} />
        </mesh>
      ))}
      <mesh position={[0, 2.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 0.12, 4.4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.65} />
      </mesh>
      <Panel position={[0, 1.2, -1.2]} size={[4.2, 1.8, 0.12]} accent />
      <Counter position={[0, 0.5, 0.8]} size={[2.4, 1, 0.75]} />
    </group>
  );
}

function PavilionBooth() {
  return (
    <group>
      <Floor width={9} depth={7} />
      <Panel position={[0, 1.35, -2.8]} size={[7.5, 2.7, 0.18]} accent />
      <Panel position={[-3.55, 1.35, 0.2]} size={[0.18, 2.7, 4.8]} accent />
      <Panel position={[3.55, 1.35, 0.2]} size={[0.18, 2.7, 4.8]} accent />
      <Lightbox position={[-1.2, 1.45, -2.66]} size={[2.2, 1.5, 0.08]} />
      <Lightbox position={[1.5, 1.45, -2.66]} size={[2.2, 1.5, 0.08]} />
      <Counter position={[0, 0.55, 1.8]} size={[3.2, 1.1, 0.85]} />
      <mesh position={[0, 0.14, -0.5]} receiveShadow>
        <boxGeometry args={[4.5, 0.08, 2.8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
    </group>
  );
}

function SustainableBooth() {
  return (
    <group>
      <Floor width={6.5} depth={5} />
      <Panel position={[0, 1.15, -1.85]} size={[5, 2.3, 0.14]} color="#2d5a45" accent />
      <Panel position={[-2.35, 1.15, 0.35]} size={[0.14, 2.3, 3.2]} color="#3a6b52" accent />
      <mesh position={[0.8, 0.55, 0.2]} castShadow>
        <boxGeometry args={[1.2, 1.1, 0.55]} />
        <meshStandardMaterial color="#c4a574" roughness={0.75} />
      </mesh>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.18}>
        <mesh position={[-0.6, 1.8, -1.72]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#7bc67e" emissive="#7bc67e" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      <Counter position={[-0.5, 0.48, 1.35]} size={[2, 0.96, 0.68]} />
    </group>
  );
}

function ProceduralBooth({ variant }: { variant: BoothModelVariant }) {
  switch (variant) {
    case "modular":
      return <ModularBooth />;
    case "double-deck":
      return <DoubleDeckBooth />;
    case "portable":
      return <PortableBooth />;
    case "kiosks":
      return <KioskBooth />;
    case "outdoor":
      return <OutdoorBooth />;
    case "pavilions":
      return <PavilionBooth />;
    case "sustainable":
      return <SustainableBooth />;
    case "custom":
    default:
      return <CustomBooth />;
  }
}

export function BoothModelScene({ variant, modelUrl }: BoothModelSceneProps) {
  if (modelUrl) {
    return <ExternalModel url={modelUrl} />;
  }

  return <ProceduralBooth variant={variant} />;
}
