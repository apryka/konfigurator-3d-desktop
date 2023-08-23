/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function RamkaPolkowa(props:any) {
  const { nodes, materials } = useGLTF("/models/ramka-polkowa.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <group
        position={[0, 0.042, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 6]}
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse001.geometry}
          material={materials["0.006"]}
          position={[0.131, 0.7, 0.19]}
          rotation={[1.411, 0, 0]}
          scale={0.887}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle0.geometry}
          material={materials["0.006"]}
          position={[0.077, -0.146, 3.158]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/ramka-polkowa.gltf");
