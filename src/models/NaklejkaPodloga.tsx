/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props:any) {
  const { nodes, materials } = useGLTF("/models/naklejka-podloga.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.naklejka_podlog.geometry}
        material={materials.WHITE}
      />
    </group>
  );
}

useGLTF.preload("/models/naklejka-podloga.gltf");
