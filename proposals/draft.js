import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import ThreeMeshUI from 'https://cdn.skypack.dev/three-mesh-ui';

let scene, camera, renderer, controls;
let userTexts = [];
const objsToTest = [];
const uiGroup = new THREE.Group();
let currentYOffset = 0;

window.addEventListener( 'load', () => {

	const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  controls = new OrbitControls( camera, renderer.domElement );
  
  scene.add(uiGroup);

  makeTextPanel();
  makePanel();
  
	animate();

})

let textPanelContents = [];
textPanelContents[0] = "1. The image shows a tortilla placed on a cutting board.";
//push
textPanelContents.push("2. The image shows a jar of nut butter.");


function setTextPanel(textPanelContent){
				// set text
        const conText = new ThreeMeshUI.Block( {
          width: 1.9,
          height: 0.5,
          padding: 0.10,
          justifyContent: "center",
          textAlign: "left",
         	bestFit: 'auto',
          
          borderRadius: 0.11,
          borderWidth: 0.01,
          borderOpacity: 1,
          borderColor: new THREE.Color( 0x7421FF ),
          
          backgroundColor: new THREE.Color( 0x1E0646 ),
          backgroundOpacity: 1,
          
          fontFamily: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.json',
					fontTexture: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.png'
        } );
  
			  conText.position.set(0, -0.6 + currentYOffset, 0);
        conText.add(
          new ThreeMeshUI.Text({
            content: textPanelContent,
            fontSize: 0.05,
          })
        );
        uiGroup.add(conText);

        currentYOffset -= 0.55;
}

function makeTextPanel() {
        
				// set background
        const containerBlank = new ThreeMeshUI.Block( {
          justifyContent: 'start',  
          contentDirection: 'column',
          fontFamily: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.json',
          fontTexture: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.png',
          fontSize: 0.07,
          //bestFit: 'auto',
          padding: 0.04,
          borderWidth: 0.01,
          borderOpacity: 1,
          borderColor: new THREE.Color( 0x0D87E0 ),
          backgroundColor: new THREE.Color( 0x062B46 ),
          backgroundOpacity: 1,
          borderRadius: 0.11,
          width: 1.9,
            height: 0.8,
        } );
			  containerBlank.position.set(0, 0.25, 0);
      	uiGroup.add(containerBlank);
        
        // set text
        const containerText = new ThreeMeshUI.Block( {
          width: 1.8,
          height: 0.5,
          padding: 0.05,
          justifyContent: "start",
          textAlign: "left",
         	bestFit: 'auto',
          borderRadius: 0.11,
          backgroundOpacity: 0,
          fontFamily: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.json',
					fontTexture: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.png'
        } );
  
			  containerText.position.set(0, 0.35, -0.001);
        containerText.add(
          new ThreeMeshUI.Text({
            content: "Step 2: Use a butter knife to scoop nut butter from the jar. Spread nut butter onto tortilla, leaving 1/2-inch uncovered at the edges.",
            fontSize: 0.05,
          })
        );
        uiGroup.add(containerText);
        
        for (let i=0; i<textPanelContents.length; i++){
        setTextPanel(textPanelContents[i]);
        //set an offset on Y axis for each text panel
        //textPanelContents[i].position.set(0, 0.5, 0);
        }
        
}

function makePanel() {

	// Container block, in which we put the two buttons.
	// We don't define width and height, it will be set automatically from the children's dimensions
	// Note that we set contentDirection: "row-reverse", in order to orient the buttons horizontally
      
  
	const container = new ThreeMeshUI.Block( {
		justifyContent: 'start',
		contentDirection: 'row-reverse',
		fontFamily: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.json',
    fontTexture: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.png',
		fontSize: 0.07,
//              bestFit: 'auto',
		padding: 0.02,
    backgroundOpacity: 0,
		borderRadius: 0.11
	} );
  
/*   containerSuper.position.set( 0,0.1,0 );
  //	container.rotation.x = -0.55;
    scene.add( containerSuper ); */
  
  container.position.set( 0,0,-0.03 );
//	container.rotation.x = -0.55;
	uiGroup.add( container );
  
 

	// BUTTONS

	// We start by creating objects containing options that we will use with the two buttons,
	// in order to write less code.

	const buttonOptions = {
		width: 0.4,
		height: 0.15,
		justifyContent: 'center',
		offset: 0.05,
		margin: 0.02,
        backgroundColor: new THREE.Color( 0x0D87E0 ),
//    backgroundOpacity: 0,
		borderRadius: 0.075
	};
  
  const buttonOptionsEmpty = {
		width: 0.81,
		height: 0.15,
		justifyContent: 'center',
		offset: 0.05,
		margin: 0.02,
    backgroundOpacity: 0,
		borderRadius: 0.075
	};

	// Options for component.setupState().
	// It must contain a 'state' parameter, which you will refer to with component.setState( 'name-of-the-state' ).

	const hoveredStateAttributes = {
		state: 'hovered',
		attributes: {
			offset: 0.035,
			backgroundColor: new THREE.Color( 0x999999 ),
			backgroundOpacity: 1,
			fontColor: new THREE.Color( 0xffffff )
		},
	};

	const idleStateAttributes = {
		state: 'idle',
		attributes: {
			offset: 0.035,
			backgroundColor: new THREE.Color( 0x666666 ),
			backgroundOpacity: 0.3,
			fontColor: new THREE.Color( 0xffffff )
		},
	};

	// Buttons creation, with the options objects passed in parameters.

	const buttonNext = new ThreeMeshUI.Block( buttonOptions );
  const buttonEmpty = new ThreeMeshUI.Block( buttonOptionsEmpty );
	const buttonPrevious = new ThreeMeshUI.Block( buttonOptions );

	// Add text to buttons

	buttonNext.add(
		new ThreeMeshUI.Text( { content: 'Next' } )
	);
  
  buttonEmpty.add(
		new ThreeMeshUI.Text( { content: ' ' } )
	);

	buttonPrevious.add(
		new ThreeMeshUI.Text( { content: 'Previous' } )
	);

	// Create states for the buttons.
	// In the loop, we will call component.setState( 'state-name' ) when mouse hover or click

	const selectedAttributes = {
		offset: 0.02,
		backgroundColor: new THREE.Color( 0x777777 ),
		fontColor: new THREE.Color( 0x222222 )
	};

	buttonNext.setupState( {
		state: 'selected',
		attributes: selectedAttributes,
		onSet: () => {

			currentMesh = ( currentMesh + 1 ) % 3;
			showMesh( currentMesh );

		}
	} );
	buttonNext.setupState( hoveredStateAttributes );
	buttonNext.setupState( idleStateAttributes );

	//

	buttonPrevious.setupState( {
		state: 'selected',
		attributes: selectedAttributes,
		onSet: () => {

			currentMesh -= 1;
			if ( currentMesh < 0 ) currentMesh = 2;
			showMesh( currentMesh );

		}
	} );
	buttonPrevious.setupState( hoveredStateAttributes );
	buttonPrevious.setupState( idleStateAttributes );

	//

	container.add( buttonNext, buttonEmpty, buttonPrevious );
	objsToTest.push( buttonNext, buttonPrevious );

}



//

const animate = function () {
  requestAnimationFrame( animate );
  
  ThreeMeshUI.update();
  
  controls.update();

  renderer.render( scene, camera );
};
