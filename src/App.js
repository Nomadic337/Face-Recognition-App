import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRegnition';
import Clarifai from 'clarifai';
import Logo from './Components/Logo/Logo';
import Register from './Components/Register/Register';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Signin from './Components/Signin/Signin';
import './App.css';

// Clarifai API key
const app = new Clarifai.App({
 apiKey: '52178bdd052b404bacc099f514b720ec'
});

// Particle.js edits for background display
const ParticlesOptions = {
    particles: {
      number: {
        value: 120, 
        density: {
          enable: true,
          value_area: 700
        }
      }
    }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  // Determines where the face is and thus the box's outlines
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // Displays box around image when 
  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  // Tracking user input 
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

    // Changes state to display box around face in the picture for user
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log(error));

  }

  // Displays appropriate components depending on state
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({isSignedIn: true })
    }

    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={ParticlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} /> {/* sign in/up */}
        {route === 'home' 
          ? <div>
              <Logo /> {/* Basic logo */}
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} 
              /> {/* Search bar to enter image link */}
              <FaceRecognition box={box} imageUrl={imageUrl} /> {/* performs face recognition */}
            </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />    
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );

  }

}

export default App;
