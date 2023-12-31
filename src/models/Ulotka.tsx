/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props:any) {
  const { nodes, materials } = useGLTF("/models/ulotka.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ulotka.geometry}
        material={materials.WHITE}
        position={[0.052, -0.004, 0.033]}
      />
    </group>
  );
}

useGLTF.preload("/models/ulotka.gltf");
