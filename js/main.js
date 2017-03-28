$(document).ready(function () {

    // hide-menu
    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        $('.main-nav').toggleClass('hide-mobile');
    });

    //fullpage plugin
    $("#fullpage").fullpage({
        anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage', '5Page', '6Page'],
        menu: '#menu',
        scrollingSpeed: 1000,
        navigation: true,
        navigationTooltips: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', '5Page', '6Page']
    });

    //textillate plugin
    $('.animate-heading').textillate({
        in: { effect: 'bounce' }
    });





    $('.animate-heading').on('inAnimationEnd.tlt', function () {
        $('.hidden-animation').addClass('animate-subheading');
        $('.animate-subheading').textillate({
            minDisplayTime: 2000,
            initialDelay: 1,
            in: {
                effect: 'fadeIn',
                delayScale: 1,
                delay: 50
            }
        });
    });


    //bxslider plugin
    $('.slider1').bxSlider({
        slideWidth: 400,
        minSlides: 2,
        maxSlides: 3
    });


    //three.js
    var mouseX = 0, mouseY = 0,

        windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2,

        SEPARATION = 200,
        AMOUNTX = 10,
        AMOUNTY = 10,

        camera, scene, renderer;

    init();
    animate();

    function init() {

        var container, separation = 100, amountX = 50, amountY = 50,
            particles, particle;

        container = document.createElement("div");
        container.className = "animation";

        my_div = document.getElementById('header');
        document.body.insertBefore(container, my_div);


        camera = new THREE.PerspectiveCamera( 75, container.offsetWidth / container.offsetHeight, 1, 10000 );
        camera.position.z = 100;

        scene = new THREE.Scene();

        renderer = new THREE.CanvasRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( container.offsetWidth , container.offsetHeight );
        renderer.setClearColor ('#ffffff', 10);
        container.appendChild( renderer.domElement );

        // particles

        var PI2 = Math.PI * 2;
        var material = new THREE.SpriteCanvasMaterial( {

            color: 0xcccccc,
            program: function ( context ) {

                context.beginPath();
                context.arc( 0, 0, 0.5, 0, PI2, true );
                context.fill();

            }

        } );

        var geometry = new THREE.Geometry();

        for ( var i = 0; i < 100; i ++ ) {

            particle = new THREE.Sprite( material );
            particle.position.x = Math.random() * 2 - 1;
            particle.position.y = Math.random() * 2 - 1;
            particle.position.z = Math.random() * 2 - 1;
            particle.position.normalize();
            particle.position.multiplyScalar( Math.random() * 10 + 450 );
            particle.scale.x = particle.scale.y = 10;
            scene.add( particle );

            geometry.vertices.push( particle.position );

        }

        // lines

        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xcccccc, opacity: 0.9 } ) );
        scene.add( line );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function onDocumentMouseMove(event) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

    }

    function onDocumentTouchStart( event ) {

        if ( event.touches.length > 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

    }

    function onDocumentTouchMove( event ) {

        if ( event.touches.length == 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

    }

    //

    function animate() {

        requestAnimationFrame( animate );

        render();

    }

    function render() {

        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
        camera.lookAt( scene.position );

        renderer.render( scene, camera );

    }

});
