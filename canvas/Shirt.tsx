import { easing } from "maath"
import { useSnapshot } from "valtio"
import { useFrame } from "@react-three/fiber"
import { Decal, useGLTF, useTexture } from "@react-three/drei"
import state from "@/store"
const Shirt = () => {
  const snap = useSnapshot(state)
  const { nodes, materials, scene, ...rest } = useGLTF('/models/shirt_baked.glb')
  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  useFrame((state, delta) => {
    easing.dampC(
      (materials as any).lambert1.color,
      snap.color,
      0.25,
      delta
    )
  })

  const stateString = JSON.stringify(snap)
  // console.log("Data", { nodes, materials, scene, data: rest });

  return (
    <group
      key={stateString}
    >
      {/* <primitive object={scene} /> */}
      <mesh
        castShadow
        // geometry={(nodes as any).defaultMaterial.geometry}
        // material={materials.Shirt}
        geometry={(nodes as any).T_Shirt_male.geometry}
        material={materials.lambert1}
        // geometry={(nodes as any).low04_Orange_0.geometry}
        // material={materials.Orange}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            // map-anisotropy={16}
            // depthWrite={true}
            depthTest={false}
            {...{
              materialProps: {
                depthWrite: true,

              }
            }}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt