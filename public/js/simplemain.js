import * as THREE from './three/three.js'
import { GLTFLoader } from './three/GLTFLoader.js'

async function main () {
  const glassesModelSrc = [
    {
      src: 'gltfmodels/spiderman_paperbag_mask.glb',
      pos: [0, 0, 0],
      scale: [25, 25, 25],
      rotation: [0, 0, 0]
    },
    {
      src: 'gltfmodels/glasses/glasses1.glb',
      pos: [-2.4, 2.5, 0],
      scale: [1.8, 1.8, 1.8],
      rotation: [0, 0, 0]
    },

    {
      src: 'gltfmodels/glasses/glasses3.glb',
      pos: [-0.4, -3.5, -1.5],
      scale: [0.5, 0.5, 0.5],
      rotation: [0, 0, 0]
    },
    {
      src: 'gltfmodels/glasses/glasses9.glb',
      pos: [-2.7, 2.5, -1],
      scale: [1.5, 1.5, 1.5],
      rotation: [0, 0, 0]
    },
    {
      src: 'gltfmodels/glasses/glasses4.glb',
      pos: [0, 0.5, -0.5],
      scale: [5, 5, 5],
      rotation: [0, 0, 0]
    },

    {
      src: 'gltfmodels/glasses/glasses6.glb',
      pos: [0, -110.5, -8],
      scale: [0.6, 0.6, 0.6],
      rotation: [0, 0, 0]
    },
    {
      src: 'gltfmodels/glasses/glasses7.glb',
      pos: [0, -2.5, 0],
      scale: [0.6, 0.6, 0.6],
      rotation: [0, 0, 0]
    }
  ]

  const canvascontainer = document.getElementById('canvascontainer')
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    60,
    canvascontainer.clientWidth / canvascontainer.clientHeight,
    0.1,
    5000
  )

  let renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })

  renderer.setSize(canvascontainer.clientWidth, canvascontainer.clientHeight)

  renderer.setClearColor(0xffffff, 1)
  renderer.setPixelRatio(window.devicePixelRatio * 0.7)
  renderer.outputEncoding = THREE.sRGBEncoding
  canvascontainer.appendChild(renderer.domElement)

  let thinkermodelGroup = new THREE.Group()
  const vendingmachineGroup = new THREE.Group()
  const sneakersGroup = new THREE.Group()

  function onWindowResize (event) {
    camera.aspect = canvascontainer.clientWidth / canvascontainer.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvascontainer.clientWidth, canvascontainer.clientHeight)

    console.log(event.currentTarget.innerWidth)

    if (event.currentTarget.innerWidth <= 500) {
      thinkermodelGroup.position.x = 0
      thinkermodelGroup.position.y = 3

      vendingmachineGroup.position.x = 0
      vendingmachineGroup.position.y = -36
      vendingmachineGroup.scale.set(0.6, 0.6, 0.6)
    } else {
      thinkermodelGroup.position.x = -18
      thinkermodelGroup.position.y = 5

      vendingmachineGroup.position.x = 17
      vendingmachineGroup.position.y = -8

      vendingmachineGroup.scale.set(1, 1, 1)
    }
  }

  window.addEventListener('load', event => {
    console.log(event)
    if (event.currentTarget.innerWidth <= 500) {
      thinkermodelGroup.position.set(0, 3, 0)

      vendingmachineGroup.position.set(/*17*/ 0, /*-8*/ -36, 0)
      vendingmachineGroup.scale.set(0.6, 0.6, 0.6)
    } else {
      thinkermodelGroup.position.set(-18, 5, 0)
      vendingmachineGroup.position.set(17, -8, 0)
      vendingmachineGroup.scale.set(1, 1, 1)
    }
  })

  window.addEventListener('resize', onWindowResize, false)

  camera.position.z = 70

  const loader = new GLTFLoader()
  const centerGroup = new THREE.Group()
  centerGroup.position.set(0, 31, 0)
  scene.add(centerGroup)

  let glassesModelIndex = new Date().getDay()

  loadModel()

  const modelChangerItem = document.getElementById('modelChangerItem')

  modelChangerItem.innerText = (glassesModelIndex + 1).toString()
  const nextModelItem = document.getElementById('nextModelItem')
  const prevModelItem = document.getElementById('prevModelItem')

  nextModelItem.onclick = async event => {
    nextModelItem.classList.add('disabledbutton')
    prevModelItem.classList.add('disabledbutton')

    nextModelItem.style = glassesModelIndex = (glassesModelIndex + 1) % 7
    modelChangerItem.innerText = (glassesModelIndex + 1).toString()
    await loadModel()

    nextModelItem.classList.remove('disabledbutton')
    prevModelItem.classList.remove('disabledbutton')
  }

  prevModelItem.onclick = async event => {
    nextModelItem.classList.add('disabledbutton')
    prevModelItem.classList.add('disabledbutton')
    if (glassesModelIndex - 1 === -1) {
      glassesModelIndex = 6
    } else {
      glassesModelIndex = (glassesModelIndex - 1) % 7
    }
    modelChangerItem.innerText = (glassesModelIndex + 1).toString()
    await loadModel()
    nextModelItem.classList.remove('disabledbutton')
    prevModelItem.classList.remove('disabledbutton')
  }

  let topmodel = null

  async function loadModel () {
    if (topmodel !== null) {
      centerGroup.remove(topmodel)
      document.removeEventListener('mousemove', null)
    }

    const result = await loader.loadAsync(
      glassesModelSrc[glassesModelIndex].src
    )
    const model = result.scene
    topmodel = model
    model.scale.set(...glassesModelSrc[glassesModelIndex].scale)
    model.rotation.set(...glassesModelSrc[glassesModelIndex].rotation)
    model.position.set(...glassesModelSrc[glassesModelIndex].pos)
    centerGroup.add(model)

    document.addEventListener('mousemove', event => {
      let mouse3D = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2.5 + 31.5,
        0.65
      )
      centerGroup.lookAt(mouse3D)
    })

    document.addEventListener('touchmove', event => {
      let mouse3D = new THREE.Vector3(
        (event.touches.item(0).clientX / window.innerWidth) * 2 - 1,
        -(event.touches.item(0).clientY / window.innerHeight) * 2.5 + 31.5,
        0.65
      )
      centerGroup.lookAt(mouse3D)
    })
  }

  scene.add(thinkermodelGroup)
  let thinkermodel = (await loader.loadAsync('gltfmodels/thinker.glb')).scene
  thinkermodel.position.set(0, 0, 0)
  thinkermodel.scale.set(1.2, 1.2, 1.2)
  thinkermodelGroup.add(thinkermodel)

  console.log(thinkermodelGroup)

  let sneakersModel = null
  scene.add(sneakersGroup)
  sneakersGroup.position.set(-17, -33, 0)
  sneakersGroup.rotation.x -= Math.PI / 8
  sneakersModel = (await loader.loadAsync('gltfmodels/sneakers.glb')).scene
  sneakersModel.scale.set(100, 100, 100)
  sneakersGroup.add(sneakersModel)

  scene.add(vendingmachineGroup)

  let vendingmachineModel = null
  vendingmachineModel = (
    await loader.loadAsync('gltfmodels/new_kirby_on_chair.glb')
  ).scene
  vendingmachineModel.scale.set(0.9, 0.9, 0.9)
  vendingmachineModel.position.set(0, 0, 0)
  vendingmachineGroup.add(vendingmachineModel)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
  scene.add(ambientLight)

  const pointLight1 = new THREE.PointLight(0xffffff, 1.0, 100)
  pointLight1.position.set(-10, 10, 0)
  const pointLight2 = new THREE.PointLight(0xffffff, 1.0, 100)
  pointLight2.position.set(10, -10, 0)

  scene.add(pointLight1)
  scene.add(pointLight2)

  function animate () {
    requestAnimationFrame(animate)

    if (thinkermodel) {
      thinkermodelGroup.rotation.y += 0.01
    }

    if (sneakersModel) {
      sneakersGroup.rotation.y += 0.005
    }

    if (vendingmachineModel) {
      vendingmachineGroup.rotation.y += 0.005
    }

    renderer.shadowMap.render(scene, camera)
    renderer.render(scene, camera)
  }

  animate()
}

main()
