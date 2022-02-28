import * as THREE from './three/three.js'
import { GLTFLoader } from './three/GLTFLoader.js'
import { FontLoader } from './three/FontLoader.js'
import { TextGeometry } from './three/TextGeometry.js'

const TroikaText = require('troika-three-text')
const CameraControls = require('camera-controls')
let initializeDomEvents = require('threex-domevents')

async function main () {
  const experienceAndCurrentWorkDetails = [
    {
      title: 'FUTURE READY TALENT VIRTUAL INTERNSHIP',
      content: `Acquired Data and AI, Azure and Security skills\n\nAttended Industry Sessions (Digitization and Automation in BFSI, Empowering Sustainability Initiatives and more) by industry experts from across verticals\n\nCreated a live project to record and analyse dream entries using web and azure technologies `
    }
  ]

  CameraControls.install({ THREE: THREE })

  let loadingScreen = document.getElementById('loadingScreen')
  let guyfawkesWrapper = document.getElementById('guyfawkes')
  let progressbar = document.getElementById('progressbar')
  let moveToWrapper = document.getElementById('moveToWrapper')
  let altsite = document.getElementById('altsite')

  moveToWrapper.style.top = `${window.innerHeight / 20}px`

  const scene = new THREE.Scene()
  const clock = new THREE.Clock()
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  )

  const totalModels = 36
  let modelsLoaded = 0

  const guyfawkes3 = [
    '                             ████████████████            ',
    '                       ██████                ██████      ',
    '                     ██                            ██    ',
    '                   ██                                ██  ',
    '                 ██                                    ██',
    '                 ██    ██████                ██████    ██',
    '                 ██          ████        ████          ██',
    '                 ██            ████    ████            ██',
    '                 ██                                    ██',
    '                 ██      ██████            ██████      ██',
    '                 ██    ██████████        ██████████    ██',
    '                 ██                                    ██',
    '                 ██                                    ██',
    '                 ██  ░░░░░░                    ░░░░░░  ██',
    '                 ██  ░░░░░░                    ░░░░░░  ██',
    '                 ██                                    ██',
    '                 ██    ██        ██    ██        ██    ██',
    '                 ██    ██████  ████████████  ██████    ██',
    '                 ██      ██████████    ██████████      ██',
    '                   ██                                ██  ',
    '                   ██                                ██  ',
    '                     ██            ████            ██    ',
    '                     ██            ████            ██    ',
    '                       ██          ████          ██      ',
    '                         ██        ████        ██        ',
    '                           ██      ████      ██          ',
    '                             ████  ████  ████            ',
    '                                 ████████                ',
    '                                  ▓▓▓▓▓▓                 '
  ]
  let visibleunderscore = true
  setInterval(() => {
    if (modelsLoaded === totalModels) {
      clearInterval()
      return
    }

    if (visibleunderscore === true) {
      document.getElementById('console-underscore').style.visibility = 'hidden'
      visibleunderscore = false
    } else {
      document.getElementById('console-underscore').style.visibility = 'visible'
      visibleunderscore = true
    }
  }, 500)

  let renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    precision: 'lowp',
    powerPreference: 'low-power'
  })
  renderer.setSize(
    window.innerWidth - window.innerWidth / 10,
    window.innerHeight - window.innerHeight / 10
  )
  renderer.setClearColor(0x111111, 1)

  renderer.setPixelRatio(window.devicePixelRatio * 0.7)
  renderer.outputEncoding = THREE.sRGBEncoding
  document.body.appendChild(renderer.domElement)

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.shadowMap.autoUpdate = true

  let THREEx = {}
  const val = initializeDomEvents(THREE, THREEx)

  let domEvents = new THREEx.DomEvents(camera, renderer.domElement)

  window.addEventListener('resize', onWindowResize, false)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const EPS = 1e-5

  camera.position.set(0, 0, EPS)

  const cameraControls = new CameraControls(camera, renderer.domElement)
  cameraControls.truckSpeed = 10
  cameraControls.rotate(
    5 * THREE.MathUtils.DEG2RAD,
    17.5 * THREE.MathUtils.DEG2RAD,
    true
  )

  cameraControls._target.clamp(
    new THREE.Vector3(-10, 7, -10),
    new THREE.Vector3(10, 7, 10)
  )

  const KEYCODE = {
    W: 87,
    A: 65,
    S: 83,
    D: 68
  }

  const wKey = new holdEvent.KeyboardKeyHold(KEYCODE.W, 16.666)
  const aKey = new holdEvent.KeyboardKeyHold(KEYCODE.A, 16.666)
  const sKey = new holdEvent.KeyboardKeyHold(KEYCODE.S, 16.666)
  const dKey = new holdEvent.KeyboardKeyHold(KEYCODE.D, 16.666)
  aKey.addEventListener('holding', function (event) {
    cameraControls.truck(-0.01 * event.deltaTime, 0, true)
  })
  dKey.addEventListener('holding', function (event) {
    cameraControls.truck(0.01 * event.deltaTime, 0, true)
  })
  wKey.addEventListener('holding', function (event) {
    cameraControls.forward(0.01 * event.deltaTime, true)
  })
  sKey.addEventListener('holding', function (event) {
    cameraControls.forward(-0.01 * event.deltaTime, true)
  })

  let crosssignGroup = new THREE.Group()
  scene.add(crosssignGroup)
  let skillsGroup = new THREE.Group()
  scene.add(skillsGroup)
  let contactsGroup = new THREE.Group()
  scene.add(contactsGroup)
  let projectsGroup = new THREE.Group()
  scene.add(projectsGroup)
  let experienceGroup = new THREE.Group()
  scene.add(experienceGroup)

  const socialLinks = {
    instaIcon: 'https://www.instagram.com/ayan._.gupta/',
    githubIcon: 'https://github.com/ayangupta9',
    linkedinIcon: 'https://www.linkedin.com/in/ayan-gupta-4b2158213/',
    twitterIcon: 'https://twitter.com/ayangupta_9',
    mailIcon: 'mailto:ayangupta.dev@gmail.com'
  }

  const projectDetails = [
    {
      title: 'Daily Dream Journal',
      content:
        'MERN stack based web app for journaling your dreams\nand extracting analytical data from the entries',
      link: 'https://dailydreamjournal.azurewebsites.net/'
    },
    {
      title: 'Path Finder WASM',
      content:
        'Web app created with React to implement Path\nfinding algorithms with the help of WebAssembly',
      link: 'https://github.com/ayangupta9/Path-Finder-WASM'
    },
    {
      title: 'Etch-A-Sketch',
      content:
        'A multiplayer drawing and guessing game made with\nSOCKET.IO and served through an express server.',
      link: 'https://github.com/ayangupta9/Etch-A-Sketch'
    },
    {
      title: 'MeyMey Android App',
      content: `Android app that fetches memes from a reddit API which\ncan be added to favorites or can be directly\nshared with contacts`,
      link: 'https://github.com/ayangupta9/MeyMey-Android-App'
    },
    // { title: 'SocketIO-Single-Chat-Room', content: '' },
    {
      title: 'Book Bloom',
      content:
        'This app provides a platform to post adverts for selling \nor buyingold and used books from other people.\nAvailable on Google Play Store',
      link: 'https://github.com/ayangupta9/Book-Bloom-App'
    }
  ]

  const bioDetails = `
  I am Ayan Gupta, an innovative, hands-on software developer, particularly adept in Full-Stack Web technology. 
  I possess comprehensive knowledge of web-based, mobile-based applications and I'm currently immersed in learning about Machine and Deep Learning and Computer Vision. 
  I strive to create an environment that emphasizes teamwork and encourages learning by doing. 
  I look always forward to tackling software challenges inorder to achieve personal as well as organizational goals.   
  `

  let techStackSrcs = [
    [
      '../assets/techStack/pythonIcon.png',
      [-3.7, 0.35, 3.75],
      '○ ○ ○ ○',
      'Python'
    ],
    [
      '../assets/techStack/javascriptIcon.png',
      [-3.7, -0.9, 3.75],
      '○ ○ ○ ○ ○',
      'JavaScript'
    ],
    ['../assets/techStack/c++Icon.png', [-2.3, -0.9, 3.75], '○ ○ ○ ○', 'C++'],
    [
      '../assets/techStack/htmlIcon.png',
      [-3.7, -2.2, 3.75],
      '○ ○ ○ ○ ○',
      'HTML'
    ],
    ['../assets/techStack/cssIcon.png', [-2.3, -2.2, 3.75], '○ ○ ○ ○', 'CSS'],
    [
      '../assets/techStack/reactIcon.png',
      [-0.9, -2.2, 3.75],
      '○ ○ ○ ○ ○',
      'React'
    ],
    ['../assets/techStack/SQLIcon.jpg', [-3.7, -3.6, 3.75], '○ ○ ○ ○', 'SQL'],
    [
      '../assets/techStack/mongodbIcon.png',
      [-2.4, -3.6, 3.75],
      '○ ○ ○ ○',
      'MongoDB'
    ],
    ['../assets/techStack/MLIcon.jpg', [-1.0, -3.6, 3.75], '○ ○ ○', 'ML & AI'],
    [
      '../assets/techStack/threejsIcon.png',
      [0.4, -3.6, 3.75],
      '○ ○ ○',
      'Three JS'
    ],
    ['../assets/techStack/gitIcon.png', [-2.4, -5, 3.75], '○ ○ ○', 'Git'],
    [
      '../assets/techStack/wasmIcon.png',
      [-3.7, -5, 3.75],
      '○ ○ ○',
      'WebAssembly'
    ],
    [
      '../assets/techStack/photoshopIcon.png',
      [-1.0, -5, 3.75],
      '○ ○ ○ ○',
      'Photoshop'
    ]
  ]

  const fontLoader = new FontLoader()
  const loader = new GLTFLoader()

  async function create3dText (
    text,
    group = scene,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    size = 0.85,
    color = 0x000000,
    height = 0.3
  ) {
    const loadedfont = await fontLoader.loadAsync(
      '../assets/helvetiker_bold.typeface.json'
    )

    const textGeo = new TextGeometry(text, {
      font: loadedfont,
      size: size,
      height: height,
      bevelEnabled: false
    })

    const textMat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.8
    })

    const textMesh = new THREE.Mesh(textGeo, textMat)
    textMesh.position.set(...position)
    textMesh.rotation.set(...rotation)
    group.add(textMesh)
  }

  async function loadThisModel (
    src,
    group,
    modelname = 'noname',
    position = [0, 0, 0],
    scale = [1, 1, 1],
    rotation = [0, 0, 0],
    castShadow = true
  ) {
    const result = await loader.loadAsync(src)

    modelsLoaded = modelsLoaded + 1

    progressbar.innerText += '▓'

    if (modelsLoaded >= 6 && modelsLoaded - 6 < guyfawkes3.length) {
      guyfawkesWrapper.innerText += guyfawkes3[modelsLoaded - 6] + '\n'
    }

    if (modelsLoaded === totalModels) {
      setTimeout(() => {
        loadingScreen.style.display = 'none'
        moveToWrapper.style.visibility = 'visible'
        altsite.style.visibility = 'visible'
      }, 1000)
    }

    const model = result.scene
    model.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = castShadow
      }
    })

    model.castShadow = castShadow
    model.position.set(...position)
    model.scale.set(...scale)

    model.rotation.set(...rotation)

    if (Object.keys(socialLinks).includes(modelname)) {
      domEvents.addEventListener(
        model,
        'click',
        event => {
          if (event.intersect.distance <= 15) {
            window.open(socialLinks[modelname], '_blank')
          }
        },
        false
      )
    }

    if (group !== null) {
      group.add(model)
    } else {
      scene.add(model)
    }
  }

  function createText (
    text,
    group,
    fontSize = 0.1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    color = 0x333333,
    link = null,
    maxWidth = null
  ) {
    const myText = new TroikaText.Text()

    group.add(myText)
    myText.text = text
    myText.fontSize = fontSize
    myText.letterSpacing = 0.05
    myText.position.x = position[0]
    myText.position.y = position[1]
    myText.position.z = position[2]
    if (maxWidth) {
      myText.maxWidth = maxWidth
    }
    myText.rotation.x = rotation[0]
    myText.rotation.y = rotation[1]
    myText.rotation.z = rotation[2]
    myText.anchorX = 'center'
    myText.color = color
    myText.sync()

    if (link !== null) {
      // console.log(link)
      domEvents.addEventListener(myText, 'click', event => {
        if (event.intersect.distance <= 15) {
          // console.log(link)
          window.open(link, '_blank').focus()
          document.body.cursor = 'pointer'
        }
      })

      domEvents.addEventListener(myText, 'mouseover', event => {
        if (event.intersect.distance <= 16) {
          document.body.style.cursor = 'pointer'
        }
      })

      domEvents.addEventListener(myText, 'mouseout', event => {
        document.body.style.cursor = 'default'
      })
    }
  }

  function loadImageAvatar (
    src,
    position = [0, 0, 0],
    scale = [1, 1, 1],
    rotation = [0, 0, 0],
    group = scene
  ) {
    const imageAvatarGeo = new THREE.CircleGeometry(2, 32)
    const imageAvatarMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(src),
      side: THREE.DoubleSide
    })

    const imageAvatarMesh = new THREE.Mesh(imageAvatarGeo, imageAvatarMaterial)
    imageAvatarMesh.position.set(...position)
    imageAvatarMesh.rotation.set(...rotation)
    imageAvatarMesh.scale.set(...scale)
    group.add(imageAvatarMesh)
  }

  function loadDadJoke (
    joke,
    fontsize = 0.3,
    color = 0x000000,
    group = scene,
    position = [0, 0, 0],
    rotation = [0, 0, 0]
  ) {}

  const pointLight = new THREE.PointLight(0xffffff, 0.7, 100)
  pointLight.position.set(0, 30, 0)
  pointLight.castShadow = true
  pointLight.shadow.mapSize.width = 1024
  pointLight.shadow.mapSize.height = 1024
  scene.add(pointLight)

  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(
      window.innerWidth - window.innerWidth / 10,
      window.innerHeight - window.innerHeight / 10
    )
  }
  const textureLoader = new THREE.TextureLoader()

  const surroundingGroup1 = new THREE.Group()
  surroundingGroup1.position.set(0, 0, -10)
  surroundingGroup1.scale.set(2, 2, 2)
  crosssignGroup.add(surroundingGroup1)

  const surroundingGroup2 = new THREE.Group()
  surroundingGroup2.position.set(10, 0, -20)
  surroundingGroup2.scale.set(1, 1, 1)
  crosssignGroup.add(surroundingGroup2)

  const surroundingGroup3 = new THREE.Group()
  surroundingGroup3.position.set(-17, 0, -35)
  surroundingGroup3.scale.set(2, 2, 2)
  crosssignGroup.add(surroundingGroup3)

  const surroundingGroup4 = new THREE.Group()
  surroundingGroup4.position.set(18, 0, -37)
  surroundingGroup4.scale.set(0.8, 0.8, 0.8)
  crosssignGroup.add(surroundingGroup4)

  const spaceGroup = new THREE.Group()
  spaceGroup.position.set(0, 0, 0)
  scene.add(spaceGroup)

  const surroundingGroup5 = new THREE.Group()
  surroundingGroup5.position.set(-40, 2, 0)
  surroundingGroup5.scale.set(1, 1, 1)
  crosssignGroup.add(surroundingGroup5)

  const surroundingGroup6 = new THREE.Group()
  surroundingGroup6.position.set(-40, 2, -15)
  surroundingGroup6.scale.set(1, 1, 1)
  crosssignGroup.add(surroundingGroup6)

  async function loadMainSpawn () {
    const planeGeometry = new THREE.CircleGeometry(8, 200)
    const planeMesh = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const plane = new THREE.Mesh(planeGeometry, planeMesh)
    plane.position.y = 0
    plane.position.x = 0
    plane.position.z = 0
    plane.rotation.x = Math.PI / 2
    plane.receiveShadow = true

    crosssignGroup.add(plane)

    const pavilionNavHelper = document.getElementById('pavilion-helper')
    pavilionNavHelper.addEventListener('click', event => {
      cameraControls.moveTo(0, 0, EPS, true)
      cameraControls.rotateAzimuthTo(Math.PI / 36, true)
      cameraControls.rotatePolarTo(Math.PI / 2 + Math.PI / 10.286, true)
    })

    const mainSpawnPointLight = new THREE.PointLight(0xffffff, 1.0, 30)
    mainSpawnPointLight.position.set(0, 15, 0)

    crosssignGroup.add(mainSpawnPointLight)

    await loadThisModel(
      '../gltfmodels/tall_potted_house_plant.glb',
      crosssignGroup,
      'oldcontainer1',
      [-3, 0.1, -2],
      [1.5, 1.5, 1.5],
      [0, 0, 0],
      true
    )

    const bioGroup = new THREE.Group()
    bioGroup.position.set(3.5, 0.1, -3)
    bioGroup.scale.set(0.8, 0.8, 0.8)
    bioGroup.rotation.set(0, -Math.PI / 6, 0)

    const backgroundBoardGeometry = new THREE.PlaneGeometry(5, 5)
    const backgroundBoardMaterial = new THREE.MeshStandardMaterial({
      color: 0x999999,
      side: THREE.DoubleSide,
      metalness: 0.5
    })

    const backgroundBoard = new THREE.Mesh(
      backgroundBoardGeometry,
      backgroundBoardMaterial
    )
    backgroundBoard.position.set(0, 2, 0)
    backgroundBoard.rotation.set(0, 0, 0)

    createText(
      bioDetails,
      backgroundBoard,
      0.15,
      [0, 0.75, 0.1],
      [0, 0, 0],
      0xffffff,
      null,
      4
    )

    bioGroup.add(backgroundBoard)

    loadImageAvatar(
      '../assets/images/imageAvatar.jpg',
      [0, 3.5, 0.1],
      [0.3, 0.3, 0.3],
      [0, 0, 0],
      bioGroup
    )

    crosssignGroup.add(bioGroup)

    const mainBoardGroup = new THREE.Group()
    mainBoardGroup.position.set(-2.5, -0.5, -2.5)
    mainBoardGroup.rotation.set(0, Math.PI / 6, 0)
    crosssignGroup.add(mainBoardGroup)

    await create3dText(
      `AYAN GUPTA`,
      mainBoardGroup,
      [0.2, 3.45, 0.3],
      [0, 0, 0],
      0.18,
      0xffffff,
      0.15
    )

    createText(
      `HOLD AND DRAG LMB TO LOOK AROUND\n\nPRESS W,A,S,D TO MOVE AROUND\n\nNAVIGATE TO SECTIONS\nUSING SIDE BUTTONS\n\nCLICK ON SOCIAL CONTACTS AND PROJECT TITLES TO VISIT RESPECTIVE PLATFORMS`,
      mainBoardGroup,
      0.09,
      [1.0, 3.2, 0.4],
      [0, 0, 0],
      0xffffff,
      null,
      2
    )

    await loadThisModel(
      '../gltfmodels/hangingboard.glb',
      mainBoardGroup,
      'woodensign',
      [0, 1.5, -1.5],
      [0.35, 0.35, 0.35],
      [0, 0, 0],
      true
    )

    await loadThisModel(
      '../gltfmodels/new_retro_bike.glb',
      surroundingGroup1,
      'bike',
      [-10, 0, 0],
      [1, 1, 1],
      [0, -Math.PI / 4, 0],
      true
    )

    await loadThisModel(
      '../gltfmodels/vendingmachine.glb',
      surroundingGroup2,
      'bike',
      [0, 0, 0],
      [0.02, 0.02, 0.02],
      [0, -Math.PI / 4, 0],
      true
    )

    await loadThisModel(
      '../gltfmodels/basketball.glb',
      surroundingGroup3,
      'basketball',
      [0, 0, 5],
      [0.002, 0.002, 0.002],
      [0, 0, 0],
      true
    )

    await loadThisModel(
      '../gltfmodels/electricguitar.glb',
      surroundingGroup4,
      'electricguitar',
      [0, 0, 10],
      [2, 2, 2],
      [0, 0, 0],
      true
    )

    await loadThisModel(
      '../gltfmodels/clapperboard.glb',
      surroundingGroup5,
      'electricguitar',
      [13, 0, 0],
      [0.1, 0.1, 0.1],
      [0, 0, 0],
      true
    )

    await loadThisModel(
      '../gltfmodels/smallcouch.glb',
      surroundingGroup6,
      'small-couch',
      [13, 0, 0],
      [0.007, 0.007, 0.007],
      [0, 0, 0],
      true
    )
  }

  crosssignGroup.position.set(0, -2, -1)

  function loadProjectDetails (
    title,
    content,
    link,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    group = projectsGroup
  ) {
    const projectDetailsGroup = new THREE.Group()
    createText(
      '» ' + title,
      projectDetailsGroup,
      0.45,
      [0, 1, 0],
      [0, 0, 0],
      0x000000,
      link
    )
    createText(
      content,
      projectDetailsGroup,
      0.325,
      [0, 0.3, 0],
      [0, 0, 0],
      0x000000
    )
    projectDetailsGroup.position.set(...position)
    projectDetailsGroup.rotation.set(...rotation)
    group.add(projectDetailsGroup)
  }

  async function loadProjects () {
    const planeGeometry = new THREE.CircleGeometry(12, 200)
    const planeMesh = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const plane = new THREE.Mesh(planeGeometry, planeMesh)
    plane.position.y = -2
    plane.position.x = 4
    plane.position.z = 0
    plane.rotation.x = Math.PI / 2
    plane.receiveShadow = true

    projectsGroup.add(plane)

    const projectsNavHelper = document.getElementById('projects-helper')
    projectsNavHelper.addEventListener('click', event => {
      cameraControls.moveTo(25, 0, -35, true)
      cameraControls.rotateAzimuthTo(-Math.PI / 2, true)

      // console.log(cameraControls)
    })

    const leftPlaneGeo = new THREE.PlaneGeometry(12, 14)
    const leftPlaneMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const leftPlaneMesh = new THREE.Mesh(leftPlaneGeo, leftPlaneMat)

    leftPlaneMesh.receiveShadow = true

    leftPlaneMesh.position.set(0, 4, 0)
    leftPlaneMesh.rotation.set(0, 0, 0)

    const projectsGroupLeftWallGroup = new THREE.Group()
    projectsGroupLeftWallGroup.add(leftPlaneMesh)

    loadProjectDetails(
      projectDetails[0].title,
      projectDetails[0].content,
      projectDetails[0].link,
      [0, 8.5, 0.1],
      [0, 0, 0],
      projectsGroupLeftWallGroup
    )

    loadProjectDetails(
      projectDetails[1].title,
      projectDetails[1].content,
      projectDetails[1].link,
      [0, 6.5, 0.1],
      [0, 0, 0],
      projectsGroupLeftWallGroup
    )

    loadProjectDetails(
      projectDetails[2].title,
      projectDetails[2].content,
      projectDetails[2].link,
      [0, 4.5, 0.1],
      [0, 0, 0],
      projectsGroupLeftWallGroup
    )

    loadProjectDetails(
      projectDetails[3].title,
      projectDetails[3].content,
      projectDetails[3].link,
      [0, 2.25, 0.1],
      [0, 0, 0],
      projectsGroupLeftWallGroup
    )

    loadProjectDetails(
      projectDetails[4].title,
      projectDetails[4].content,
      projectDetails[4].link,
      [0, 0, 0.1],
      [0, 0, 0],
      projectsGroupLeftWallGroup
    )

    projectsGroupLeftWallGroup.position.set(0, 0, 4.25)
    projectsGroupLeftWallGroup.rotation.set(0, Math.PI / 2 + Math.PI / 4, 0)

    projectsGroup.add(projectsGroupLeftWallGroup)

    const projectsGroupLightLeft = new THREE.SpotLight(0xffffff)

    projectsGroupLightLeft.intensity = 1.0
    projectsGroupLightLeft.target = leftPlaneMesh
    projectsGroupLightLeft.distance = 30
    projectsGroupLightLeft.angle = 1.0
    projectsGroupLightLeft.penumbra = 0.5

    projectsGroup.add(projectsGroupLightLeft)
    projectsGroupLightLeft.position.set(10, 5, 8)

    const projectsGroupLightRight = new THREE.SpotLight(0xffffff)

    projectsGroupLightRight.intensity = 1.0
    projectsGroupLightRight.target = leftPlaneMesh
    projectsGroupLightRight.distance = 30
    projectsGroupLightRight.angle = 1.0
    projectsGroupLightRight.penumbra = 0.5

    await loadThisModel(
      '../gltfmodels/stage_light.glb',
      projectsGroup,

      'stage_lamp_1',
      [8, 5, 5],
      [0.5, 0.5, 0.5],
      [0, -Math.PI, 0]
    )

    projectsGroup.add(projectsGroupLightRight)
    projectsGroupLightRight.position.set(10, 5, -12)

    const projectsGroupRightWallGroup = new THREE.Group()

    const rightPlaneGeo = new THREE.PlaneGeometry(12, 14)
    const rightPlaneMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const rightPlaneMesh = new THREE.Mesh(rightPlaneGeo, rightPlaneMat)

    rightPlaneMesh.receiveShadow = true
    rightPlaneMesh.position.set(0, 4, 0)
    rightPlaneMesh.rotation.set(0, 0, 0)

    await create3dText(
      'PROJECTS',
      projectsGroupRightWallGroup,

      [3.25, 9.25, 0],
      [0, Math.PI, 0]
    )

    projectsGroupRightWallGroup.add(rightPlaneMesh)

    await loadThisModel(
      '../gltfmodels/Oilpaint.glb',
      projectsGroupRightWallGroup,

      'painting1',
      [3, 7, -0.25],
      [0.003, 0.003, 0.003],
      [0, 0, 0]
    )

    await loadThisModel(
      '../gltfmodels/somepainting1.glb',
      projectsGroupRightWallGroup,

      'painting3',
      [3.25, 3.6, -0.1],
      [0.07, 0.07, 0.07],
      [0, Math.PI / 2, 0]
    )

    await loadThisModel(
      '../gltfmodels/somepainting2.glb',
      projectsGroupRightWallGroup,

      'painting5',
      [3.5, 0.25, -0.1],
      [0.015, 0.015, 0.015],
      [0, Math.PI, 0]
    )

    await loadThisModel(
      '../gltfmodels/somepainting4.glb',
      projectsGroupRightWallGroup,

      'somepainting4',

      [-0.2, 7, -0.1],
      [0.005, 0.005, 0.005],
      [0, 0, 0]
    )

    await loadThisModel(
      '../gltfmodels/photoframe2.glb',
      projectsGroupRightWallGroup,

      'photoframe2',

      [-0.2, 3.6, -0.1],
      [5, 5, 5],
      [0, Math.PI, 0]
    )

    await loadThisModel(
      '../gltfmodels/MonaLisa.glb',
      projectsGroupRightWallGroup,

      'MonaLisa',

      [-0.2, 0.25, -0.25],
      [0.35, 0.35, 0.35],
      [0, Math.PI, 0]
    )

    await loadThisModel(
      '../gltfmodels/photoframe1.glb',
      projectsGroupRightWallGroup,

      'photoframe1',

      [-3.75, 7, -0.1],
      [0.1, 0.1, 0.1],
      [0, Math.PI / 2, 0]
    )

    await loadThisModel(
      '../gltfmodels/photoframe5.glb',
      projectsGroupRightWallGroup,

      'photoframe5',

      [-3.75, 3.5, -0.1],
      [0.09, 0.07, 0.07],
      [0, Math.PI, 0]
    )

    await loadThisModel(
      '../gltfmodels/photoframe3.glb',
      projectsGroupRightWallGroup,

      'photoframe3',

      [-5, -1.0, -0.1],
      [0.015, 0.01, 0.015],
      [0, Math.PI / 2, 0]
    )

    projectsGroupRightWallGroup.position.set(0, 0, -4.25)
    projectsGroupRightWallGroup.rotation.set(0, Math.PI / 4 + Math.PI, 0)
    projectsGroup.add(projectsGroupRightWallGroup)

    const projectsGroupBottomWallGeo = new THREE.BoxGeometry(12, 12, 0.1)
    const projectsGroupBottomWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.5
    })

    const projectsGroupBottomWall = new THREE.Mesh(
      projectsGroupBottomWallGeo,
      projectsGroupBottomWallMaterial
    )

    projectsGroupBottomWall.position.set(4.2, -2, 0)
    projectsGroupBottomWall.rotation.set(Math.PI / 2, 0, Math.PI / 4)
    projectsGroupBottomWall.receiveShadow = true

    await loadThisModel(
      '../gltfmodels/neweaselcanvas.glb',
      projectsGroupLeftWallGroup,

      'easelcanvas',
      [-4, -2.2, 5],
      [0.02, 0.02, 0.02],
      [0, -Math.PI / 2 + Math.PI / 4, 0]
    )

    await loadThisModel(
      '../gltfmodels/david.glb',
      projectsGroupRightWallGroup,

      'david_statue',
      [-4, -0.5, -5],
      [0.0045, 0.0045, 0.0045],
      [0, Math.PI, 0]
    )
    projectsGroup.add(projectsGroupBottomWall)
    projectsGroup.position.set(40, 0, -35)
    projectsGroup.rotation.set(0, Math.PI, 0)
    // scene.add(projectsGroup)
  }

  function loadExperiencesDetails (
    title,
    content,
    link = null,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    group = experienceGroup
  ) {
    const experienceDetailsGroup = new THREE.Group()

    createText(
      title,
      experienceDetailsGroup,
      0.4,
      [0, 1, 0],
      [0, 0, 0],
      0x000000,
      null,
      7
    )
    createText(
      content,
      experienceDetailsGroup,
      0.3,
      [0, 0, 0],
      [0, 0, 0],
      0x000000,
      null,
      7
    )

    experienceDetailsGroup.position.set(...position)
    experienceDetailsGroup.rotation.set(...rotation)
    group.add(experienceDetailsGroup)
  }

  async function loadExperiences () {
    const planeGeometry = new THREE.CircleGeometry(12, 200)
    const planeMesh = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const plane = new THREE.Mesh(planeGeometry, planeMesh)
    plane.position.y = -2
    plane.position.x = 0
    plane.position.z = 0
    plane.rotation.x = Math.PI / 2
    plane.name = 'experience-base'
    plane.receiveShadow = true

    experienceGroup.add(plane)

    const experienceNavHelper = document.getElementById('experience-helper')
    experienceNavHelper.addEventListener('click', event => {
      cameraControls.moveTo(-31, 0, 3.5, true)
      cameraControls.rotateAzimuthTo(Math.PI / 2.2, true)
      cameraControls.rotatePolarTo(Math.PI / 2 + Math.PI / 17, true)
    })

    const experienceLight = new THREE.PointLight(0xffffff, 1.0, 30)
    experienceLight.position.set(-6, 10, -6)

    experienceGroup.add(experienceLight)

    const experienceGroupLeftWallGeo = new THREE.PlaneGeometry(12, 12)
    const experienceGroupLeftWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const experienceGroupLeftWall = new THREE.Mesh(
      experienceGroupLeftWallGeo,
      experienceGroupLeftWallMaterial
    )

    experienceGroup.add(experienceGroupLeftWall)

    experienceGroupLeftWall.position.set(4.24264068712, 4, 4.24264068712)
    experienceGroupLeftWall.rotation.set(0, Math.PI / 4, 0)

    await create3dText(
      'EXPERIENCE',
      experienceGroupLeftWall,

      [4.5, 3, -0.1],
      [0, Math.PI, 0]
    )

    const experienceGroupRightWallGeo = new THREE.PlaneGeometry(12, 12)
    const experienceGroupRightWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const experienceGroupRightWall = new THREE.Mesh(
      experienceGroupRightWallGeo,
      experienceGroupRightWallMaterial
    )
    experienceGroup.add(experienceGroupRightWall)

    experienceGroupRightWall.position.set(-4.24264068712, 4, 4.24264068712)
    experienceGroupRightWall.rotation.set(0, -Math.PI / 4, 0)

    loadExperiencesDetails(
      experienceAndCurrentWorkDetails[0].title,
      experienceAndCurrentWorkDetails[0].content,
      null,
      [-0.75, -0.5, -2.5],
      [0, Math.PI, 0],
      experienceGroupRightWall
    )

    const experienceGroupBottomWallGeo = new THREE.BoxGeometry(12, 12, 0.1)
    const experienceGroupBottomWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.5
    })
    const experienceGroupBottomWall = new THREE.Mesh(
      experienceGroupBottomWallGeo,
      experienceGroupBottomWallMaterial
    )
    experienceGroup.add(experienceGroupBottomWall)

    experienceGroupBottomWall.rotation.set(Math.PI / 2, 0, Math.PI / 4)
    experienceGroupBottomWall.position.set(0, -2, 0)
    experienceGroupBottomWall.receiveShadow = true

    experienceGroup.updateWorldMatrix()

    await loadThisModel(
      '../gltfmodels/new_studio.glb',
      experienceGroupLeftWall,

      'studio',
      [0, -6.0, -7],
      [0.9, 0.9, 0.9],
      [0, 40 * THREE.MathUtils.DEG2RAD, 0]
    )

    await loadThisModel(
      '../gltfmodels/directorschair.glb',
      experienceGroupLeftWall,

      'directorschair',
      [5, -4.65, -4],
      [0.22, 0.22, 0.22],
      [0, 0, 0]
    )

    await loadThisModel(
      '../gltfmodels/old_tv.glb',
      experienceGroupLeftWall,
      'oldtv',
      [0, -5.2, -1.5],
      [1.2, 1.2, 1.2],
      [0, Math.PI / 8 + Math.PI, 0]
    )

    experienceGroup.position.set(-40, 0, 0)
    experienceGroup.rotation.set(0, -Math.PI / 2, 0)
  }

  async function loadSkills () {
    const planeGeometry = new THREE.CircleGeometry(12, 200)
    const planeMesh = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const plane = new THREE.Mesh(planeGeometry, planeMesh)
    plane.position.y = 0
    plane.position.x = 0
    plane.position.z = 0
    plane.rotation.x = Math.PI / 2
    plane.receiveShadow = true

    skillsGroup.add(plane)

    const skillsNavHelper = document.getElementById('skills-helper')
    skillsNavHelper.addEventListener('click', event => {
      cameraControls.moveTo(-32, 0, -25, true)
      cameraControls.rotateAzimuthTo(Math.PI / 5.5, true)
    })

    const skillsGroupLeftWallGeo = new THREE.PlaneGeometry(12, 12)
    const skillsGroupLeftWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const skillsGroupLeftWall = new THREE.Mesh(
      skillsGroupLeftWallGeo,
      skillsGroupLeftWallMaterial
    )

    let techcontent = ''

    const tooltipMeshGeo = new THREE.PlaneGeometry(1.5, 1)
    const tooltipMeshMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      side: THREE.DoubleSide
    })
    const tooltipMesh = new THREE.Mesh(tooltipMeshGeo, tooltipMeshMat)
    const tooltipContent = new TroikaText.Text()
    tooltipContent.text = techcontent
    tooltipContent.fontSize = 0.2
    tooltipContent.letterSpacing = 0.05
    tooltipContent.anchorX = 'center'
    tooltipContent.color = 0xffffff
    tooltipContent.position.y = 0.2
    tooltipContent.position.z = 0.1
    tooltipContent.sync()
    tooltipMesh.add(tooltipContent)
    tooltipMesh.visible = false
    skillsGroupLeftWall.add(tooltipMesh)

    async function loadThisTech (
      src,
      group = scene,
      techName,
      techProficiency,
      position = [0, 0, 0],
      rotation = [0, 0, 0]
    ) {
      const loadedTexture = await textureLoader.loadAsync(src)
      const techStackGeo = new THREE.CircleGeometry(0.5, 32)
      const techStackMat = new THREE.MeshPhongMaterial({
        transparent: true,
        map: loadedTexture
      })
      const techStackMesh = new THREE.Mesh(techStackGeo, techStackMat)
      techStackMesh.position.set(...position)
      techStackMesh.rotation.set(...rotation)
      group.add(techStackMesh)

      domEvents.addEventListener(techStackMesh, 'mouseover', event => {
        if (event.intersect.distance <= 12) {
          tooltipContent.text = `${techName}\n${techProficiency}`
          tooltipMesh.position.set(
            position[0],
            position[1] + 1,
            position[2] + 0.75
          )

          tooltipMesh.lookAt(cameraControls._target)
          tooltipMesh.visible = true
        }
      })
      domEvents.addEventListener(techStackMesh, 'mouseout', event => {
        tooltipMesh.visible = false
      })
    }

    await create3dText(
      'SKILLS',
      skillsGroup,
      [7, 7.5, 2.2],
      [0, (5 * Math.PI) / 4, 0]
    )

    techStackSrcs.map(async techStackSrc => {
      await loadThisTech(
        techStackSrc[0],
        skillsGroupLeftWall,
        techStackSrc[3],
        techStackSrc[2],
        techStackSrc[1]
      )
    })

    skillsGroupLeftWall.rotation.set(0, -Math.PI / 4, 0)
    skillsGroupLeftWall.receiveShadow = true
    skillsGroupLeftWall.position.set(5, 5.75, -4.25)

    const skillsGroupRightWallGeo = new THREE.PlaneGeometry(12, 12)
    const skillsGroupRightWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const skillsGroupRightWall = new THREE.Mesh(
      skillsGroupRightWallGeo,
      skillsGroupRightWallMaterial
    )
    skillsGroupRightWall.rotation.set(0, Math.PI / 4, 0)
    skillsGroupRightWall.receiveShadow = true
    skillsGroupRightWall.position.set(5, 5.75, 4.25)

    const skillsGroupBottomWallGeo = new THREE.BoxGeometry(12, 12, 0.1)
    const skillsGroupBottomWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.5
    })
    const skillsGroupBottomWall = new THREE.Mesh(
      skillsGroupBottomWallGeo,
      skillsGroupBottomWallMaterial
    )
    skillsGroupBottomWall.position.set(1, 0, 0)
    skillsGroupBottomWall.rotation.set(Math.PI / 2, 0, Math.PI / 4)
    skillsGroupBottomWall.receiveShadow = true

    skillsGroup.add(skillsGroupBottomWall)
    skillsGroup.add(skillsGroupLeftWall)
    skillsGroup.add(skillsGroupRightWall)

    await loadThisModel(
      '../gltfmodels/bookshelf.glb',
      skillsGroup,
      'bookshelf',
      [-1, 0.1, -4.5],
      [0.07, 0.07, 0.07],
      [0, -Math.PI / 4, 0]
    )

    await loadThisModel(
      '../gltfmodels/Recplayer.glb',
      skillsGroup,
      'Recplayer',
      [-2, 0.5, 4],
      [0.3, 0.3, 0.3],
      [0, -Math.PI / 3, 0]
    )

    const skillsGroupLight = new THREE.SpotLight(0xffffff)
    skillsGroupLight.position.set(-8, 5.5, 0)
    skillsGroupLight.intensity = 1.0
    skillsGroupLight.penumbra = 0.5
    skillsGroupLight.angle = Math.PI / 2
    skillsGroupLight.distance = 30
    skillsGroupLight.target = skillsGroup

    skillsGroup.add(skillsGroupLight)

    await loadThisModel(
      '../gltfmodels/projector.glb',
      skillsGroup,
      'projector',
      [-8, 0, 0],
      [0.017, 0.017, 0.017],
      [0, Math.PI - Math.PI / 20, 0]
    )

    skillsGroup.position.set(-35, -2, -35)
    skillsGroup.rotation.set(0, Math.PI / 2, 0)
  }

  async function loadContacts () {
    const tooltipMeshGeo = new THREE.PlaneGeometry(2, 1)
    const tooltipMeshMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      side: THREE.DoubleSide
    })
    const tooltipMesh = new THREE.Mesh(tooltipMeshGeo, tooltipMeshMat)
    const tooltipContent = new TroikaText.Text()
    tooltipContent.text = ''
    tooltipContent.fontSize = 0.15
    tooltipContent.letterSpacing = 0.05
    tooltipContent.anchorX = 'center'
    tooltipContent.color = 0xffffff
    tooltipContent.position.z = 0.1
    tooltipContent.position.y = 0.3
    tooltipContent.sync()
    tooltipMesh.add(tooltipContent)
    tooltipMesh.visible = false
    contactsGroup.add(tooltipMesh)

    async function loadSocials (
      src,
      group,
      socialtext,
      position = [0, 0, 0],
      scale = [1, 1, 1],
      rotation = [0, 0, 0]
    ) {
      const texture = await textureLoader.loadAsync(src)
      const imageGeo = new THREE.CircleGeometry(1, 32)
      const imageMaterial = new THREE.MeshBasicMaterial({
        // color: 0xffffff,
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
      })

      const imageBkgGeo = new THREE.CircleGeometry(1, 32)
      const imageBkgMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      })

      const imageBkgMesh = new THREE.Mesh(imageBkgGeo, imageBkgMaterial)
      imageBkgMesh.position.set(position[0], position[1], position[2] - 0.1)
      imageBkgMesh.rotation.set(...rotation)

      const imageMesh = new THREE.Mesh(imageGeo, imageMaterial)
      imageMesh.position.set(...position)
      imageMesh.rotation.set(...rotation)
      imageMesh.scale.set(...scale)

      domEvents.addEventListener(imageMesh, 'mouseover', event => {
        if (event.intersect.distance <= 8) {
          tooltipContent.text = `${socialtext}`
          tooltipMesh.position.set(position[0], position[1] + 1, position[2])
          tooltipMesh.lookAt(cameraControls._target)
          tooltipMesh.visible = true

          document.body.style.cursor = 'pointer'
        }
      })

      domEvents.addEventListener(imageMesh, 'mouseout', event => {
        tooltipMesh.visible = false
        tooltipContent.text = ''
        document.body.style.cursor = 'default'
      })

      group.add(imageMesh)
      group.add(imageBkgMesh)
    }

    const planeGeometry = new THREE.CircleGeometry(12, 200)
    const planeMesh = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const plane = new THREE.Mesh(planeGeometry, planeMesh)
    plane.position.y = 0
    plane.position.x = 0
    plane.position.z = 0
    plane.rotation.x = Math.PI / 2
    plane.receiveShadow = true

    contactsGroup.add(plane)

    const contactsNavHelper = document.getElementById('contacts-helper')
    contactsNavHelper.addEventListener('click', event => {
      cameraControls.moveTo(0, 0, -22, true)
      cameraControls.rotateAzimuthTo(0, true)
      cameraControls.rotatePolarTo(Math.PI / 2, true)
    })

    await create3dText(
      'CONTACTS',
      contactsGroup,
      [2, 7.5, -5.0],
      [0, -Math.PI / 4, 0]
    )

    await loadThisModel(
      '../gltfmodels/telephone2.glb',
      contactsGroup,
      'telephone',
      [0, 0.1, 7],
      [0.1, 0.1, 0.1],
      [0, 0, 0]
    )

    await loadThisModel(
      '../gltfmodels/bar_stool.glb',
      contactsGroup,
      'bar_stool',
      [5, 1.75, 1],
      [0.08, 0.08, 0.08],
      [0, 0, 0],
      true
    )

    await loadSocials(
      '../assets/socials/newinstaIcon.png',
      contactsGroup,
      'I HOPE YOU LIKE\nSKETCHES AND\nGRAPHICS',

      [3.1, 0.75, 3],
      [1, 1, 1],
      [-Math.PI / 2 + Math.PI / 6, 0, 0]
    )

    await loadSocials(
      '../assets/socials/githubicon2.png',
      contactsGroup,
      'HERE RESIDES\nALL OF MY CODE',
      [1.3, 0.75, 3],
      [0.8, 0.8, 0.8],
      [-Math.PI / 2 + Math.PI / 6, 0, 0]
    )

    await loadSocials(
      '../assets/socials/newlinkedinIcon.png',
      contactsGroup,
      `FEELING\nPROFESSIONAL?`,
      [-0.5, 0.75, 3],
      [1, 1, 1],
      [-Math.PI / 2 + Math.PI / 6, 0, 0]
    )

    await loadSocials(
      '../assets/socials/newmailIcon.png',
      contactsGroup,
      `OH SO WE'RE\nACTING FORMAL\nNOW?`,

      [-2.3, 0.75, 3],
      [0.8, 0.8, 0.8],
      [-Math.PI / 2 + Math.PI / 6, 0, 0]
    )

    await loadSocials(
      '../assets/socials/newtwitterIcon.png',
      contactsGroup,
      'A virtual daycare\nfor maladjusted adults\n\t- UD',
      [-4.1, 0.75, 3],
      [0.7, 0.7, 0.7],
      [-Math.PI / 2 + Math.PI / 6, 0, 0]
    )

    await loadThisModel(
      '../gltfmodels/rocking_chair.glb',
      contactsGroup,

      'rocking_chair',
      [0, 0.1, -2],
      [3, 3, 3],
      [0, Math.PI / 4, 0],
      true
    )

    const contactsGroupLight = new THREE.PointLight(0xffffff, 1.0, 20)
    contactsGroupLight.castShadow = true
    contactsGroupLight.position.set(-3, 6.5, 3)

    contactsGroup.add(contactsGroupLight)

    await loadThisModel(
      '../gltfmodels/industrial_lamp.glb',
      contactsGroup,

      'projector',
      [-3, 10.5, 3],
      [0.02, 0.02, 0.02],
      [0, Math.PI, 0],
      false
    )

    const contactsGroupLeftWallGeo = new THREE.PlaneGeometry(12, 10)
    const contactsGroupLeftWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const contactsGroupLeftWall = new THREE.Mesh(
      contactsGroupLeftWallGeo,
      contactsGroupLeftWallMaterial
    )
    contactsGroupLeftWall.position.set(4.25, 5, -3)
    contactsGroupLeftWall.rotation.set(0, -Math.PI / 4, 0)
    contactsGroupLeftWall.receiveShadow = true

    const contactsGroupRightWallGeo = new THREE.PlaneGeometry(12, 10)
    const contactsGroupRightWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    const contactsGroupRightWall = new THREE.Mesh(
      contactsGroupRightWallGeo,
      contactsGroupRightWallMaterial
    )
    contactsGroupRightWall.position.set(-4.25, 5, -3)
    contactsGroupRightWall.rotation.set(0, Math.PI / 4, 0)
    contactsGroupRightWall.receiveShadow = true

    await loadThisModel(
      '../gltfmodels/shiphelmwheel.glb',
      contactsGroupRightWall,
      'ship-wheel',
      [0, -3, -0.1],
      [3, 3, 3],
      [0, 0, 0],
      true
    )

    const contactsGroupBottomWallGeo = new THREE.BoxGeometry(12, 12, 0.05)
    const contactsGroupBottomWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.5
    })

    const contactsGroupBottomWall = new THREE.Mesh(
      contactsGroupBottomWallGeo,
      contactsGroupBottomWallMaterial
    )
    contactsGroupBottomWall.position.set(0, 0, 1)
    contactsGroupBottomWall.rotation.set(Math.PI / 2, 0, Math.PI / 4)
    contactsGroupBottomWall.receiveShadow = true
    contactsGroup.add(contactsGroupLeftWall)
    contactsGroup.add(contactsGroupRightWall)
    contactsGroup.add(contactsGroupBottomWall)

    contactsGroup.position.set(0, -2, -35)
  }

  let stars = null

  async function loadFinalModelsAndStuff () {
    await loadThisModel(
      '../gltfmodels/sci_fi_bridge.glb',
      scene,
      'bridge1',
      [-11, -2.4, -35.5],
      [0.1, 0.02, 0.07],
      [0, Math.PI / 2, 0],
      true
    )

    await loadThisModel(
      '../gltfmodels/sci_fi_bridge.glb',
      scene,
      'bridge1',
      [0, -2.4, -6.5],
      [0.1, 0.02, 0.1],
      [0, 0, 0],
      true
    )

    await loadThisModel(
      '../gltfmodels/sci_fi_bridge.glb',
      scene,
      'bridge1',
      [25.5, -2.4, -35.5],
      [0.1, 0.02, 0.07],
      [0, Math.PI / 2, 0],
      true
    )

    await loadThisModel(
      '../gltfmodels/sci_fi_bridge.glb',
      scene,
      'bridge1',
      [-38, -2.4, -7],
      [0.1, 0.02, 0.1],
      [0, -Math.PI / 20, 0],
      true
    )

    async function addStar () {
      const startexture = await textureLoader.loadAsync(
        '../assets/images/startexture.png'
      )
      const starsGeometry = new THREE.BufferGeometry()
      const starsMaterial = new THREE.PointsMaterial({
        transparent: true,
        map: startexture
      })

      const starVertices = []
      for (let i = 0; i < 1000; i++) {
        const [x, y, z] = Array(3)
          .fill()
          .map(() => THREE.MathUtils.randFloatSpread(200))
        starVertices.push(x, y, z)
      }

      starsGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(starVertices, 3)
      )

      return new THREE.Points(starsGeometry, starsMaterial)
    }

    stars = await addStar()
    scene.add(stars)

    await loadThisModel(
      '../gltfmodels/brightspace.glb',
      spaceGroup,
      'space',
      [0, 50, -80],
      [8, 8, 8],
      [0, 0, 0]
    )
  }

  await loadMainSpawn()
  await loadProjects()
  await loadExperiences()
  await loadSkills()
  await loadContacts()
  await loadFinalModelsAndStuff()

  animate()

  // loadMainSpawn().then(() => {
  //   loadProjects().then(() => {
  //     loadExperiences().then(() => {
  //       loadSkills().then(() => {
  //         loadContacts().then(() => {
  //           loadFinalModelsAndStuff().then(() => {
  //             animate()
  //           })
  //         })
  //       })
  //     })
  //   })
  // })

  function animate () {
    requestAnimationFrame(animate)
    const delta = clock.getDelta()
    cameraControls.update(delta)

    if (stars) {
      stars.rotation.x += 0.001
    }
    surroundingGroup1.rotation.z += 0.003
    surroundingGroup2.rotation.x += 0.005

    surroundingGroup3.rotation.z += 0.005
    surroundingGroup3.rotation.x += 0.002

    surroundingGroup4.rotation.x += 0.004
    surroundingGroup4.rotation.z += 0.002

    surroundingGroup5.rotation.y += 0.005
    surroundingGroup5.rotation.z += 0.005

    surroundingGroup6.rotation.z += 0.001
    surroundingGroup6.rotation.y += 0.001

    spaceGroup.rotation.y += 0.00005

    renderer.shadowMap.render(scene, camera)
    renderer.render(scene, camera)
  }
}

main().catch(err => {
  console.error(err)
})
