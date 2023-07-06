import * as THREE from "../js/three.module.js";
import {GUI} from "../js/lil-gui.module.min.js";
import {OrbitControls} from "../js/OrbitControls1.js"
import {GLTFLoader} from "../js/GLTFLoader.js"
var mixer
function init() 
{
    var scene = new THREE.Scene();
    var gui = new GUI();

    var camera = new THREE.PerspectiveCamera(
        45,window.innerWidth/window.innerHeight,
        1,
        1000
    );

    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    // 'assets/animation 10 Rover.glb'
    camera.lookAt(new THREE.Vector3(0,0,0));
    var loader = new GLTFLoader();
    loader.load('./bird_orange.glb', function(glb){
        console.log(glb)
        var root;
        root = glb.scene;
 
        scene.add(root)
        var animations = glb.animations;
        mixer = new THREE.AnimationMixer(root);
        // console.log(animations[0])
        const action = mixer.clipAction(animations[0]);
        console.log(action)
        action.play();

    }, function(xhr){
        console.log((xhr.loaded/xhr.total * 180) + "% loaded")
    }, function(error){
        console.log('An error occured')
    })
    

    var plane = getPlane(20);
    plane.rotation.x = Math.PI/2;
    plane.position.y = -1;
    //action


    var pointLight1 = getPointLight(0.2);
    var pointLight2 = getPointLight(1);
    var pointLight3 = getPointLight(1);
    pointLight1.position.y = 1.5;
    pointLight2.position.y = 0.25;
    pointLight2.position.z = 2;
    pointLight3.position.y = 0.25;
    pointLight3.position.z = -2;
    var sphere1 = getSphere(0.05);
    var sphere2 = getSphere(0.05);
    var sphere3 = getSphere(0.05);

    scene.add(pointLight1);
    scene.add(pointLight2);
    scene.add(pointLight3);
    scene.add(plane);
    pointLight1.add(sphere1);
    pointLight2.add(sphere2);
    pointLight3.add(sphere3);

    const pointLightFolder1 = gui.addFolder("pointLight1");
    const pointLightFolder2 = gui.addFolder("pointLight2");
    const pointLightFolder3 = gui.addFolder("pointLight3");
    pointLightFolder1.add(pointLight1, 'intensity', 0, 10);
    pointLightFolder1.add(pointLight1.position, 'x', 0, 5);
    pointLightFolder1.add(pointLight1.position, 'y', 0, 5);
    pointLightFolder1.add(pointLight1.position, 'z', 0, 5);
    pointLightFolder2.add(pointLight2, 'intensity', 0, 10);
    pointLightFolder2.add(pointLight2.position, 'x', 0, 5);
    pointLightFolder2.add(pointLight2.position, 'y', 0, 5);
    pointLightFolder2.add(pointLight2.position, 'z', -2, 5);
    pointLightFolder3.add(pointLight3, 'intensity', 0, 10);
    pointLightFolder3.add(pointLight3.position, 'x', 0, 5);
    pointLightFolder3.add(pointLight3.position, 'y', 0, 5);
    pointLightFolder3.add(pointLight3.position, 'z', -2, 5);


    var renderer = new THREE.WebGLRenderer();

    renderer.shadowMap.enabled = true;

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor('rgb(  201, 146, 205 )');

    document.getElementById('webgl').appendChild(renderer.domElement);

    var controls = new OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);
    return scene;
}

function getPlane(size)
{
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(   194, 194, 194  )',
        side: THREE.DoubleSide
    })
    var mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    return mesh
}

function getSphere(size)
{
    // Tạo khung cho hình cầu
    var geometry = new THREE.SphereGeometry(size, 24, 24);
    // Tạo vật liệu cho hình cầu
    var material = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 255, 255)'
    })
    // Kết hợp khung và vật liệu của hình cầu để có đối tượng
    var mesh = new THREE.Mesh(geometry,material);
    return mesh;
}

function getPointLight(intensity){
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
}
const clock=new THREE.Clock()
function update(renderer, scene, camera, controls)
{
    // Truyền tham số đầu vào cho renderer
    if (mixer) {
        mixer.update(clock.getDelta()); // Kiểm tra nếu mixer đã được khởi tạo trước khi gọi update()
      }
    renderer.render(scene,camera);
    
    controls.update();
    // Đệ quy hàm update
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    })
}


var scene = init();