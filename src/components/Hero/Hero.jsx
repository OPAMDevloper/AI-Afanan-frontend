import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Hero.css'; // Import the CSS file for styling
import { View } from '@react-three/drei';
import Scene from '../../pages/Scene';

gsap.registerPlugin(useGSAP);

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Elevate Your Spirit with Victory Scented Fragrances!</h1>
        <p>Shop now and embrace the sweet smell of victory with Local Face.</p>
        <button className="hero-btn">Shop Now</button>
      </div>
      <div className="ModelContainer">
        {/* Overlay the model on top of the content */}
        <View className="Model">
          <Scene />
        </View>
      </div>
    </div>
  );
};

export default Hero;
