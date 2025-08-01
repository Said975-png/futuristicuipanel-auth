"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThreeDSearchProps {
  modelPath: string // Path to the GLB model for the search icon
  isDarkMode: boolean // Theme prop
  className?: string // Optional className for the container
  onSearch?: (query: string) => void // Callback for search action
}

export function ThreeDSearch({ modelPath, isDarkMode, className, onSearch }: ThreeDSearchProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<THREE.Object3D | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!mountRef.current) return

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 2)
    cameraRef.current = camera
    scene.add(camera) // Add camera to scene

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = true
    controls.autoRotateSpeed = 2
    controlsRef.current = controls

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    // GLTF Loader
    const loader = new GLTFLoader()
    loader.load(
      modelPath,
      (gltf) => {
        modelRef.current = gltf.scene
        scene.add(gltf.scene)

        // Apply material based on theme
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            ;(child as THREE.Mesh).material = isDarkMode
              ? new THREE.MeshStandardMaterial({ color: 0x00ff66, roughness: 0.5, metalness: 0.8 }) // Neon green for dark
              : new THREE.MeshStandardMaterial({ color: 0x00ccff, roughness: 0.5, metalness: 0.8 }) // Light blue for light
          }
        })
      },
      undefined,
      (error) => {
        console.error("An error occurred loading the GLTF model:", error)
      },
    )

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (mountRef.current && cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      }
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (mountRef.current && renderer.current) {
        mountRef.current.removeChild(renderer.current.domElement)
      }
      renderer.current?.dispose()
      controls.current?.dispose()
      scene.current?.clear()
      if (modelRef.current) {
        modelRef.current.traverse((object) => {
          if ((object as THREE.Mesh).isMesh) {
            ;(object as THREE.Mesh).geometry?.dispose()
            if (Array.isArray((object as THREE.Mesh).material)) {
              ;((object as THREE.Mesh).material as THREE.Material[]).forEach((material) => material.dispose())
            } else {
              ;((object as THREE.Mesh).material as THREE.Material)?.dispose()
            }
          }
        })
      }
    }
  }, [modelPath, isDarkMode])

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <div
      className={cn(
        `relative flex h-16 w-full max-w-md items-center rounded-full border bg-transparent pr-2 text-sm font-light transition-all duration-300 ${
          isDarkMode ? "border-white/20 text-white" : "border-black/20 text-black"
        }`,
        className,
      )}
    >
      <div ref={mountRef} className="absolute inset-y-0 left-0 w-16 z-0" />
      <Input
        type="text"
        placeholder="Search..."
        className={`flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-16 ${
          isDarkMode ? "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"
        }`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch()
          }
        }}
      />
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full ${isDarkMode ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}
        onClick={handleSearch}
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  )
}
