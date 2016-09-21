var React = require('react');
var React3 = require('react-three-renderer');
var THREE = require('three');
var ReactDOM = require('react-dom');

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      shape: 'box'
    };

    this.toggleShape = this.toggleShape.bind(this);
  }

  toggleShape() {
    if(this.state.shape === 'box') {
      this.setState({ shape: 'circle' });
    } else {
      this.setState({ shape: 'box' });
    }
  }

  renderShape() {
    if(this.state.shape === 'box') {
      return <mesh>
        <boxGeometry
          width={1}
          height={1}
          depth={1}
          name='box'
          ref={
            (shape) => {
              this.shape = shape;
              console.log('box ref ' + shape);
            }
          }
        />
        <meshBasicMaterial
          color={0x00ff00}
        />
      </mesh>;
    } else {
      return <mesh>
        <circleGeometry
          radius={2}
          segments={50}
          name='circle'
          ref={
            (shape) => {
              this.shape = shape;
              console.log('circle ref ' + shape);
            }
          }
        />
        <meshBasicMaterial
          color={0x0000ff}
        />
      </mesh>
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate: the active shape is ' + this.shape.name);
    //this.shape.color = 0xff0000;
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    var position = new THREE.Vector3(0, 0, 10);
    var scale = new THREE.Vector3(100,50,1);

    var shape = this.renderShape();

    return (<div>
        <button onClick={this.toggleShape}>Toggle Shape</button>
        <React3
          mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
          width={width}
          height={height}
          onAnimate={this._onAnimate}>
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}
              position={this.cameraPosition}/>
            {shape}
          </scene>
        </React3>
    </div>);
  }
}

ReactDOM.render(<Simple/>, document.querySelector('.root-anchor'));
