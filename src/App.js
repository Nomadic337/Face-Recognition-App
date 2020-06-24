import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRegnition';
import Clarifai from 'clarifai';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';


const app = new Clarifai.App({
 apiKey: '52178bdd052b404bacc099f514b720ec'
});

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
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // console.log('Click');
    app.models
    .predict(
      Clarifai.COLOR_MODEL,
      "https://samples.clarifai.com/face-det.jpg")
    .then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={ParticlesOptions}/>

        <Navigation /> {/* sign in/up */}
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} 
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
  
      </div>
    );

  }

}

export default App;
