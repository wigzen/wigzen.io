import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const LAYERS = [
  { name: "UI / Frontend", color: "#a8ff51", y: 2 },
  { name: "API / Backend", color: "#7ddb3a", y: 1 },
  { name: "Data Layer", color: "#5cb827", y: 0 },
  { name: "Infrastructure", color: "#3d9414", y: -1 },
  { name: "Security", color: "#287000", y: -2 },
];

function LayerPlane({
  name,
  color,
  y,
  index,
  hovered,
  onHover,
}: {
  readonly name: string;
  readonly color: string;
  readonly y: number;
  readonly index: number;
  readonly hovered: number | null;
  readonly onHover: (i: number | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hovered === index;
  const targetOpacity = isHovered ? 0.85 : 0.45;
  const targetScale = isHovered ? 1.05 : 1;

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity += (targetOpacity - mat.opacity) * 0.1;
    meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
    meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
  });

  return (
    <group position={[0, y * 0.8, 0]}>
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 6, 0, 0]}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={() => onHover(null)}
      >
        <planeGeometry args={[4, 0.6]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Text
        position={[0, 0.05, 0.35]}
        rotation={[-Math.PI / 6, 0, 0]}
        fontSize={0.15}
        color={isHovered ? "#ffffff" : color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {name}
      </Text>
    </group>
  );
}

function Scene() {
  const [hovered, setHovered] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    // Subtle mouse-driven rotation
    groupRef.current.rotation.y += (pointer.x * 0.15 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (pointer.y * 0.08 - groupRef.current.rotation.x) * 0.05;
  });

  const scale = useMemo(() => {
    return size.width < 600 ? 0.7 : 1;
  }, [size.width]);

  return (
    <group ref={groupRef} scale={scale}>
      {LAYERS.map((layer, i) => (
        <LayerPlane
          key={layer.name}
          name={layer.name}
          color={layer.color}
          y={layer.y}
          index={i}
          hovered={hovered}
          onHover={setHovered}
        />
      ))}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </group>
  );
}

function Fallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--clr-text-muted)",
        fontSize: "0.85rem",
      }}
    >
      Loading 3D visualisation...
    </div>
  );
}

export default function SystemsVisualization() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Only render Three.js on desktop with WebGL and no reduced motion preference
    const isDesktop = window.innerWidth >= 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
      } catch {
        return false;
      }
    })();

    setCanRender(isDesktop && hasWebGL && !prefersReducedMotion);
  }, []);

  if (!canRender) {
    return null; // CSS/GSAP fallback handles the visualization
  }

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--clr-border)",
        background: "var(--clr-surface)",
        marginTop: "2rem",
      }}
      aria-hidden="true"
    >
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
