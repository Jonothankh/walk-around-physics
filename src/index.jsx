import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Interactive, XR, ARButton } from '@react-three/xr'
import React, { Suspense, useState } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    // <Canvas
    //     shadows
    //     camera={ {
    //         fov: 45,
    //         near: 0.1,
    //         far: 200,
    //         position: [ 4, 2, 6 ]
    //     } }
    // >
    //     <Experience />
    // </Canvas>
    <>
        <ARButton mode={'AR'} />
        <Canvas>

            <Experience />

        </Canvas>
    </>
)