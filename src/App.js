import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('Click');
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
        onButtonSubmit={this.onButtonSubmit} />
        {/* <FaceRecognition /> */}
  
      </div>
    );

  }

}

export default App;
