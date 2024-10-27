import { useGLTF } from '@react-three/drei';

export function Model({ modelPath, ...props }) {
  const { nodes, materials } = useGLTF(modelPath);
  
  return (
    <group {...props} dispose={null} scale={[0.5, 0.5, 0.5]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh1_Mesh1026.geometry} // Adjust based on the actual model structure
        material={materials['Material.001']} // Adjust based on the actual model structure
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

// Preload all models
const modelPaths = [
  '/blue_perfume_bottle1.glb',
  '/blue_perfume_bottle1.glb',
  '/brown_perfume_bottle1.glb',
  '/caribbean_green_perfume_bottle1.glb',
  '/cyan_perfume_bottle1.glb',
  '/mexican_pink_perfume_bottle1.glb',
  '/purple_perfume_bottle1.glb',
  '/red_perfume_bottle1.glb',
  '/rose_red_perfume_bottle1.glb',
  '/white_perfume_bottle1.glb'
];

modelPaths.forEach(modelPath => useGLTF.preload(modelPath));