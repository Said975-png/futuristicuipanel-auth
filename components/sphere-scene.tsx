"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

interface SphereSceneProps {
  isDarkMode: boolean
}

export function SphereScene({ isDarkMode }: SphereSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Sphere geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64)

    // Material setup based on theme
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff66, // Neon green
      emissive: 0x00ff66,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
    })

    const lightMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ccff, // Light blue
      emissive: 0x00ccff,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.8,
    })

    const sphere = new THREE.Mesh(geometry, isDarkMode ? darkMaterial : lightMaterial)
    scene.add(sphere)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    camera.position.z = 2

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      }
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      controls.dispose()
      geometry.dispose()
      darkMaterial.dispose()
      lightMaterial.dispose()
    }
  }, [isDarkMode])

  return <div ref={mountRef} className="absolute inset-0 z-0" />
}
