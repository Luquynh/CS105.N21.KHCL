function init()
{
    // Khởi tạo cảnh
    var scene = new THREE.Scene();

    // Khởi tạo giao diện người dùng
    var gui = new dat.GUI();

    // Khởi tạo camera
    var camera = new THREE.PerspectiveCamera(
        45,window.innerWidth/window.innerHeight,
        1,
        1000
    );

    // Thiết lập vị trí cho camera
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    // Thiết lập điểm nhìn của camera
    camera.lookAt(new THREE.Vector3(0,0,0));

    // Khởi tạo khối hình hộp
    var torusknot = getSolidHeart(1, 0.1, 16, 100);
   
    //tao grid
    var gridHelper = new THREE.GridHelper(100, 30, "#fff", "#fff");
    gridHelper.position.y = -1;
    scene.add(gridHelper);   

    // Khởi tạo nền đất
    var plane = getPlane(20);
    plane.rotation.x = Math.PI/2;
    plane.position.y = -2;

    // Khởi tạo và đặt vị trí cho ánh sáng
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
    torusknot.name = 'torusknot';

    // Thêm các đối tượng vào cảnh
    scene.add(torusknot);
    scene.add(pointLight1);
    scene.add(pointLight2);
    scene.add(pointLight3);
    scene.add(plane);
    pointLight1.add(sphere1);
    pointLight2.add(sphere2);
    pointLight3.add(sphere3);

    // Thêm các thuộc tính vào bảng giao diện người dùng
    const pointLightFolder1 = gui.addFolder("pointLight1");
    const pointLightFolder2 = gui.addFolder("pointLight2");
    const pointLightFolder3 = gui.addFolder("pointLight3");
    const torusknotFolder = gui.addFolder("Heart");
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
    
    // torusknotFolder.add(torusknot.scale, 'x', 0, 2);
    // torusknotFolder.add(torusknot.scale, 'y', 0, 2);
    // torusknotFolder.add(torusknot.scale, 'z', 0, 2);
    torusknotFolder.add(torusknot.rotation, 'x', 0, 10);
    torusknotFolder.add(torusknot.rotation, 'y', 0, 10);
    torusknotFolder.add(torusknot.rotation, 'z', 0, 10);

    // Khởi tạo renderer
    var renderer = new THREE.WebGLRenderer();
    // Kích hoạt thuốc tính bóng của renderer
    renderer.shadowMap.enabled = true;

    // Thiết lập kích thước của renderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Thay đổi màu nền
    renderer.setClearColor('rgb(201, 146, 205)');

    // Đẩy thuộc tính domElement của renderer vào thẻ webgl trong file html
    document.getElementById('webgl').appendChild(renderer.domElement);

    // Khởi tạo biến điều khiển camera
    var controls = new THREE.OrbitControls(camera, renderer.domElement)
    // Khởi tạo biến điều khiển object
    var controls1 = new THREE.DragControls([torusknot], camera, renderer.domElement);
    // Gọi hàm update để có thể kết xuất ảnh liên tục
    update(renderer, scene, camera, controls);

    return scene;
}

function getPlane(size)
{
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(201, 146, 205)',
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

function getSolidTorusKnot(r, t, rs, ts)
{
    // Tạo khung cho hình cầu
    var geometry = new THREE.TorusKnotGeometry( r, t, rs, ts );
    // Tạo vật liệu cho hình cầu
    var textureLoader = new THREE.TextureLoader();
    image = textureLoader.load('diffuse.jpg');

    // Tạo vật liệu cho hình hộp
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(201, 146, 205)',
        map: image
    })

    // Kết hợp khung và vật liệu của hình hộp để có đối tượng
    var mesh = new THREE.Mesh(geometry,material);
    mesh.castShadow = true;
    return mesh;
}



//draw heart shape 
function getSolidHeart() {
    var heartShape = new THREE.Shape();
  
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, -0.5, -0.8, -1.5, -2, -1.5);
    heartShape.bezierCurveTo(-3.5, -1.5, -3.5, 0, -3.5, 0);
    heartShape.bezierCurveTo(-3.5, 1.5, -2, 3.5, 0, 4.5);
    heartShape.bezierCurveTo(2, 3.5, 3.5, 1.5, 3.5, 0);
    heartShape.bezierCurveTo(3.5, 0, 3.5, -1.5, 2, -1.5);
    heartShape.bezierCurveTo(0.8, -1.5, 0, -0.5, 0, 0);
  
    var extrudeSettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: false
    };
    var textureLoader = new THREE.TextureLoader();
    image = textureLoader.load('../assets/texture/redtexture.jpg');

    // Tạo vật liệu cho hình hộp
    var material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        map: image
    })
    var geometry = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.01, 0.01, 0.01); // Chỉnh kích thước nhỏ hơn ba lần
    mesh.rotation.z = Math.PI; // Xoay trái tim 180 độ theo trục Z
    mesh.castShadow = true;
  
    return mesh;
  }
  
  
  
  
function getPointLight(intensity){
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
}

function update(renderer, scene, camera, controls)
{
    // Truyền tham số đầu vào cho renderer
    renderer.render(scene,camera);

    // Thiết lập animation cho object
    var heart = scene.getObjectByName('torusknot');
    var time = Date.now() * 0.001; // Thời gian hiện tại

    // Tạo hiệu ứng đập trái tim bằng cách thay đổi scale theo thời gian
    var scale = 0.3 + 0.1 * Math.sin(time * 4); // Thay đổi scale từ 0.9 đến 1.1
    heart.scale.set(scale, scale, scale);

    controls.update();
    // Đệ quy hàm update
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    })
}
var scene = init();