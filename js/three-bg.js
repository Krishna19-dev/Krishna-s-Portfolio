/**
 * three-bg.js
 * Implements a modern terminal-style 3D background.
 * A slow-rotating wireframe sphere (Icosahedron).
 */

const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 25;
// Move camera slightly right and up so the object is visually off-center
camera.position.x = 8;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create a wireframe Icosahedron (looks like a geometric sphere)
const geometry = new THREE.IcosahedronGeometry(12, 1);

// Material: terminal green, wireframe, slightly transparent so it's not distracting
const material = new THREE.MeshBasicMaterial({ 
    color: 0x4ade80, // Tailwind accent green
    wireframe: true,
    transparent: true,
    opacity: 0.35
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Add some subtle particles floating around
const particleCount = 200;
const particleGeometry = new THREE.BufferGeometry();
const particlePos = new Float32Array(particleCount * 3);

for(let i=0; i < particleCount * 3; i++) {
    particlePos[i] = (Math.random() - 0.5) * 60;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
const particleMaterial = new THREE.PointsMaterial({
    color: 0x4ade80,
    size: 0.1,
    transparent: true,
    opacity: 0.5
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Adjust camera position for mobile vs desktop for better framing
    if (window.innerWidth < 768) {
        camera.position.x = 0;
        camera.position.y = 8; // Move sphere up on mobile
    } else {
        camera.position.x = 8;
        camera.position.y = 2;
    }
});

// Initial orientation call
if (window.innerWidth < 768) {
    camera.position.x = 0;
    camera.position.y = 8;
}

// Interactivity (Mouse tracking to subtly tilt the sphere)
let targetRotationX = 0;
let targetRotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;

window.addEventListener('mousemove', (event) => {
    targetRotationY = ((event.clientX / window.innerWidth) - 0.5) * 0.5;
    targetRotationX = ((event.clientY / window.innerHeight) - 0.5) * 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();

    // Constant slow rotation
    sphere.rotation.x += 0.05 * delta;
    sphere.rotation.y += 0.08 * delta;

    // Smoothly interpolate towards target mouse rotation
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    
    // Apply mouse tilt to the whole scene
    scene.rotation.x = currentRotationX;
    scene.rotation.y = currentRotationY;

    // Slowly rotate particles too
    particles.rotation.y -= 0.02 * delta;

    renderer.render(scene, camera);
}

animate();
