import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Building component
const Building = ({ position, height, width, depth, delay }: { position: [number, number, number]; height: number; width: number; depth: number; delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetHeight = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // Animate building rising
    const progress = Math.min(1, Math.max(0, (t - delay) * 0.8));
    const eased = 1 - Math.pow(1 - progress, 3);
    targetHeight.current = THREE.MathUtils.lerp(targetHeight.current, hovered ? height * 1.3 : height, 0.05);
    const currentHeight = eased * targetHeight.current;
    meshRef.current.scale.y = Math.max(0.01, currentHeight);
    meshRef.current.position.y = currentHeight / 2;

    // Emissive pulse
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.1 + Math.sin(t * 2 + delay * 3) * 0.05 + (hovered ? 0.3 : 0);
  });

  return (
    <mesh
      ref={meshRef}
      position={[position[0], 0, position[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <boxGeometry args={[width, 1, depth]} />
      <meshStandardMaterial
        color="#1a3a5c"
        emissive="#00b4d8"
        emissiveIntensity={0.1}
        transparent
        opacity={0.85}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
};

// Grid floor
const GridFloor = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.elapsedTime;
    gridRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      mat.opacity = 0.15 + Math.sin(t * 0.5 + i * 0.1) * 0.05;
    });
  });

  const lines = useMemo(() => {
    const result: { points: THREE.Vector3[]; color: string }[] = [];
    const size = 12;
    const divisions = 24;
    const step = (size * 2) / divisions;

    for (let i = 0; i <= divisions; i++) {
      const pos = -size + i * step;
      // X lines
      result.push({
        points: [new THREE.Vector3(pos, 0, -size), new THREE.Vector3(pos, 0, size)],
        color: i % 4 === 0 ? "#00b4d8" : "#1e3a5f",
      });
      // Z lines
      result.push({
        points: [new THREE.Vector3(-size, 0, pos), new THREE.Vector3(size, 0, pos)],
        color: i % 4 === 0 ? "#7c3aed" : "#1e3a5f",
      });
    }
    return result;
  }, []);

  return (
    <group ref={gridRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(line.points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={line.color} transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
};

// Road network with glow
const Roads = () => {
  const roadsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!roadsRef.current) return;
    const t = state.clock.elapsedTime;
    roadsRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 1.5 + i * 2) * 0.2;
    });
  });

  const roads = useMemo(() => [
    { pos: [0, 0.02, 0] as [number, number, number], size: [24, 0.02, 0.15] as [number, number, number] },
    { pos: [0, 0.02, 0] as [number, number, number], size: [0.15, 0.02, 24] as [number, number, number] },
    { pos: [4, 0.02, 0] as [number, number, number], size: [0.1, 0.02, 24] as [number, number, number] },
    { pos: [-4, 0.02, 0] as [number, number, number], size: [0.1, 0.02, 24] as [number, number, number] },
    { pos: [0, 0.02, 4] as [number, number, number], size: [24, 0.02, 0.1] as [number, number, number] },
    { pos: [0, 0.02, -4] as [number, number, number], size: [24, 0.02, 0.1] as [number, number, number] },
  ], []);

  return (
    <group ref={roadsRef}>
      {roads.map((road, i) => (
        <mesh key={i} position={road.pos}>
          <boxGeometry args={road.size} />
          <meshStandardMaterial
            color="#0e2540"
            emissive="#00b4d8"
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};

// Camera controller with mouse parallax
const CameraController = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 8 + mouse.current.x * 2, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 + mouse.current.y * 2, 0.02);
    camera.lookAt(0, 0, 0);
  });

  // Update mouse position
  if (typeof window !== "undefined") {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
  }

  return null;
};

// Floating map layers
const FloatingLayers = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[0, 2.5, 0]}>
        {/* Transparent zoning layer */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 6]} />
          <meshStandardMaterial
            color="#7c3aed"
            transparent
            opacity={0.08}
            emissive="#7c3aed"
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
};

// City scene
const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Generate buildings
  const buildings = useMemo(() => {
    const result: { pos: [number, number, number]; h: number; w: number; d: number; delay: number }[] = [];
    const zones = [
      // Downtown core
      { cx: 0, cz: 0, count: 8, hRange: [1.5, 3.5], spread: 3 },
      // Residential
      { cx: -5, cz: -3, count: 6, hRange: [0.5, 1.2], spread: 3 },
      { cx: 5, cz: 3, count: 6, hRange: [0.5, 1.2], spread: 3 },
      // Commercial
      { cx: 3, cz: -5, count: 5, hRange: [0.8, 2], spread: 3 },
      { cx: -3, cz: 5, count: 5, hRange: [0.8, 2], spread: 3 },
    ];

    let delayIdx = 0;
    zones.forEach((zone) => {
      for (let i = 0; i < zone.count; i++) {
        const x = zone.cx + (Math.random() - 0.5) * zone.spread * 2;
        const z = zone.cz + (Math.random() - 0.5) * zone.spread * 2;
        // Avoid roads
        if (Math.abs(x) < 0.3 || Math.abs(z) < 0.3) continue;
        if (Math.abs(Math.abs(x) - 4) < 0.3 || Math.abs(Math.abs(z) - 4) < 0.3) continue;

        const h = zone.hRange[0] + Math.random() * (zone.hRange[1] - zone.hRange[0]);
        const w = 0.3 + Math.random() * 0.6;
        const d = 0.3 + Math.random() * 0.6;
        result.push({ pos: [x, 0, z], h, w, d, delay: delayIdx * 0.1 });
        delayIdx++;
      }
    });
    return result;
  }, []);

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 15, 5]} intensity={0.8} color="#b0d4f1" />
      <pointLight position={[0, 5, 0]} intensity={1} color="#00b4d8" distance={20} />
      <pointLight position={[-5, 3, 5]} intensity={0.5} color="#7c3aed" distance={15} />

      <group ref={groupRef}>
        <GridFloor />
        <Roads />
        <FloatingLayers />
        {buildings.map((b, i) => (
          <Building key={i} position={b.pos} height={b.h} width={b.w} depth={b.d} delay={b.delay} />
        ))}
      </group>

      <fog attach="fog" args={["#0a0f1a", 10, 30]} />
    </>
  );
};

const CityScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
    </div>
  );
};

export default CityScene;
