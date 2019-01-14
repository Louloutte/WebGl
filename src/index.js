import './css/style.styl'

import * as THREE from 'three'

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * House
 */
const house = new THREE.Object3D()
scene.add(house)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 1.5),
    new THREE.MeshBasicMaterial({ color: 0xffcc99 })
)
house.add(walls)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 4),
    new THREE.MeshBasicMaterial({ color: 0x66bb66, side: THREE.DoubleSide })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = - 0.5
house.add(floor)

for(let i = 0; i < 50; i++)
{
    const radius = Math.random() * 0.25

    const bush = new THREE.Mesh(
        new THREE.SphereGeometry(radius),
        new THREE.MeshBasicMaterial({ color: 0x55aa55 })
    )
    bush.position.x = (Math.random() - 0.5) * 4
    bush.position.z = (Math.random() - 0.5) * 4
    bush.position.y = - 0.5 + radius * 0.5
    house.add(bush)
}

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.25, 0.5, 4),
    new THREE.MeshBasicMaterial({ color: 0x885522 })
)
roof.position.y = 0.5 + 0.25
roof.rotation.y = Math.PI * 0.25
house.add(roof)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update house
    house.rotation.y += 0.003

    // Update camera
    camera.position.x = cursor.x * 3
    camera.position.y = - cursor.y * 3
    camera.lookAt(new THREE.Vector3())

    // Renderer
    renderer.render(scene, camera)
}
loop()

// // Hot
// if(module.hot)
// {
//     module.hot.accept()

//     module.hot.dispose(() =>
//     {
//         console.log('dispose')
//     })
// }

/**
 * Mesh

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)*/


// // Hot
// if(module.hot)
// {
//     module.hot.accept()

//     module.hot.dispose(() =>
//     {
//         console.log('dispose')
//     })
// }