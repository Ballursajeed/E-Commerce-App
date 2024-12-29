import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three"; // Import THREE namespace

// Define the type for GLTF Models
type GLTFResult = GLTF & {
  scene: THREE.Group;
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

// Props to dynamically load 3D models
interface Product3DProps {
  modelPath: string;
}

const Product3D: React.FC<Product3DProps> = ({ modelPath }) => {
  // Load the 3D model and cast it to the correct type
  const gltf = useLoader(GLTFLoader, modelPath) as GLTFResult;

  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* Use the 'scene' from the loaded GLTF model */}
      <primitive object={gltf.scene} scale={1.5} />
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default Product3D;
