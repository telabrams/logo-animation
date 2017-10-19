'use strict'

$(document).ready(function(){
    if ($('div').is('.logo-animated')) {
      let containers = $('.logo-animated');

      containers.each(function(){
        let container = $(this);
        let scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
        let camera = new THREE.PerspectiveCamera( 15, container.outerWidth()/container.outerHeight(), 0.1, 1000 );
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        renderer.setSize( container.outerWidth()*1.8, container.outerHeight()*1.8 );
        container.append( renderer.domElement );
        $(renderer.domElement).css('width', parseInt(container.outerWidth()) + 'px');
        $(renderer.domElement).css('height', parseInt(container.outerHeight()) + 'px');

        // instantiate a  loader
        let logoShape = new THREE.TextureLoader(),
            backShadow = new THREE.TextureLoader(),
            back = container.data('back'),
            logo = container.data('logo');

        logoShape.load(
          // resource URL
          logo,
          // Function when resource is loaded
          function ( texture ) {
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            // do something with the texture
            let material = new THREE.MeshBasicMaterial( {
              map: texture
            } );
            // material.depthWrite = false;
            material.transparent = true;
            let geometry = new THREE.SphereGeometry( .51, 32, 32, 0, 6.3, 3, 3.5 );
            let sphere = new THREE.Mesh( geometry, material );
            sphere.castShadow = true; //default is false
            // sphere.receiveShadow = false; //default

            scene.add(sphere)

            camera.position.z = 5;

            let animate = function () {
              requestAnimationFrame( animate );

              sphere.rotation.y -= .07;
              renderer.render(scene, camera);
            };

            animate();
            containers.addClass('canv-loaded');
          },
          // Function called when download progresses
          function ( xhr ) {
            // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
          },
          // Function called when download errors
          function ( xhr ) {
            // console.log( 'An error happened' );
          }
        )

        backShadow.load(
          // resource URL
          back,
          // Function when resource is loaded
          function ( texture ) {
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            // do something with the texture
            let material = new THREE.MeshBasicMaterial( {
              map: texture
            } );

          let planeGeometry = new THREE.PlaneBufferGeometry( 1.1, 1.1, 32, 32 );
          material.depthWrite = false;
          let plane = new THREE.Mesh( planeGeometry, material );
          plane.receiveShadow = true;
          scene.add( plane );

        })

      })

    }
})
