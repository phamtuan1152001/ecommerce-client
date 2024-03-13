"use client"

import { Canvas, useLoader } from "@react-three/fiber"
import { Environment, Center, useGLTF, OrbitControls } from "@react-three/drei"

import Shirt from "./Shirt"
import Backdrop from "./Backdrop"
import CameraRig from "./CameraRig"

export default function CanvasModel() {
  return (
    <Canvas
      // shadows
      camera={{
        position: [0, 0, 0],
        fov: 25
      }}
      gl={{ preserveDrawingBuffer: true }}
      // camera={{ position: [0, 0, -0.2] }}
      className="transition-all ease-in w-full"
      style={{ height: "300px" }}
    // className="w-full max-w-full transition-all ease-in h-full"
    // style={{ height: "100vh" }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
      {/* <OrbitControls /> */}
    </Canvas>
  )
}