/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props:any) {
  const { nodes, materials } = useGLTF("/models/owijka-paleta.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.OWIJKA_paletowa.geometry}
        material={materials["WHITE.001"]}
      />
    </group>
  );
}

useGLTF.preload("/models/owijka-paleta.gltf") as any;
