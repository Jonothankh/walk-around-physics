import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, Debug, RigidBody, Physics } from '@react-three/rapier'
import { useMemo, useEffect, useState, useRef, Suspense } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Interactive, XR, ARButton, useXR } from '@react-three/xr'
import { MeshNormalMaterial } from 'three'

export default function Experience()
{
    // const [ hitSound ] = useState(() => new Audio('./hit.mp3'))
    const personBubble = useRef()
    const camera = useThree((state) => state.camera)
    // const player = useXR((state) => state.player);

    useFrame((state) =>
    {
        // const time = state.clock.getElapsedTime()

        // const eulerRotation = new THREE.Euler(0, time * 3, 0)
        // const quaternionRotation = new THREE.Quaternion()
        // quaternionRotation.setFromEuler(eulerRotation)
        // twister.current.setNextKinematicRotation(quaternionRotation)

        // const angle = time * 0.5
        // const x = Math.cos(angle) * 2
        // const z = Math.sin(angle) * 2
        // twister.current.setNextKinematicTranslation({ x: x, y: - 0.8, z: z })
        personBubble.current.setNextKinematicTranslation(state.camera.position)
        personBubble.current.setNextKinematicRotation(state.camera.rotation)
        // console.log(personBubble.current.position)
    })

    const collisionEnter = () =>
    {
        // console.log('collision!')
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    // const cubesCount = 300
    const x_cubes = 20
    const y_cubes = 5
    const z_cubes = 20
    const spacing = 4
    const cubesCount = x_cubes * y_cubes * z_cubes
    const cubes = useRef()
    const cubeTransforms = useMemo(() =>
    {
        const positions = []
        const rotations = []
        const scales = []

        for (let x = 0; x < x_cubes; x++)
        {
            for (let y = 0; y < y_cubes; y++)
            {

                for (let z = 0; z < z_cubes; z++)
                {

                    positions.push(
                        [
                            (x - (x_cubes / 2)) / spacing,
                            (y - 1) / spacing,
                            (z - (z_cubes / 2)) / spacing
                        ]
                    )
                    rotations.push([Math.random(), Math.random(), Math.random()])

                    const scale = 0.015 + Math.random() * 0.04
                    scales.push([scale, scale, scale])

                }

            }
        }

        return { positions, rotations, scales }
    }, [])

    return <>
        <Physics gravity={[0, 0, 0]}>
            {/* <PerspectiveCamera makeDefault>

            </PerspectiveCamera> */}

            <RigidBody ref={personBubble} type="kinematicPosition">
                <BallCollider args={[.5]} position={[0, 0, 0]} />
            </RigidBody>

            <XR referenceSpace="local">
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>

                    <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
                    <ambientLight intensity={0.5} />


                    {/* - 9.08  */}

                    {/* <Debug /> */}

                    <InstancedRigidBodies
                        positions={cubeTransforms.positions}
                        rotations={cubeTransforms.rotations}
                        scales={cubeTransforms.scales}
                    >
                        <instancedMesh ref={cubes} castShadow receiveShadow args={[null, null, cubesCount]}>
                            <boxGeometry />
                            <meshNormalMaterial color="orange" />
                        </instancedMesh>
                    </InstancedRigidBodies>

                </Suspense>
            </XR>
        </Physics>

    </>
}