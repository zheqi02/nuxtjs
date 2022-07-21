import * as THREE from 'three'

import { OrbitControls } from './three/OrbitControls'
import { RoomEnvironment } from './three/RoomEnvironment'

import { GLTFLoader } from './three/GLTFloader'
import { DRACOLoader } from './three/DRACOLoader'

const WebGL = (dom: HTMLElement) => {
  let mixer: THREE.AnimationMixer
  const clock = new THREE.Clock()
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputEncoding = THREE.sRGBEncoding
  dom.appendChild(renderer.domElement)
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  const scene = new THREE.Scene()
  // scene.background = new THREE.Color()
  scene.environment = pmremGenerator.fromScene(
    new RoomEnvironment(),
    0.04
  ).texture

  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    100
  )
  camera.position.set(5, 2, 8)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.5, 0)
  controls.update()
  controls.enablePan = false
  controls.enableDamping = true

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://zheqi.club/draco/gltf/')

  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  loader.load(
    'https://zheqi.club/models/LittlestTokyo.glb',
    function (gltf: { scene: any; animations: THREE.AnimationClip[] }) {
      const model = gltf.scene
      model.position.set(1, 1, 0)
      model.scale.set(0.01, 0.01, 0.01)
      scene.add(model)

      mixer = new THREE.AnimationMixer(model)
      mixer.clipAction(gltf.animations[0]).play()

      animate()
    },
    undefined,
    function (e: any) {
      console.error(e)
    }
  )
  function animate() {
    requestAnimationFrame(animate)
    const delta = clock.getDelta()
    mixer.update(delta)
    controls.update()
    renderer.render(scene, camera)
    renderer.setClearColor(0xeeeeee, 0.0)
    // 如果是移动端
    if (window.innerWidth < window.innerHeight) {
      renderer.setSize(window.innerWidth, window.innerWidth)
    } else {
      renderer.setSize(
        Math.floor(window.innerWidth / 2.5),
        Math.floor(window.innerHeight / 2.5)
      )
    }
  }
}

export { WebGL }
