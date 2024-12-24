import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Scene from "../../pages/Scene";

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/shop");
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Elevate Your Spirit with Victory Scented Fragrances!</h1>
        <p>Shop now and embrace the sweet smell of victory with Local Face.</p>
        <button className="hero-btn" onClick={handleShopNowClick}>
          Shop Now
        </button>
      </div>
      <div className="ModelContainer" style={{ display: "flex", width:'50%' ,  flex:3}}>
        <Canvas style={{ width: "100%", height: "100%" }}>
          {/* Add spacing between models */}
          <Scene modelPath="/open.glb" position={[-3, 0, 0]} rotationSpeed={0.06} />
          <Scene modelPath="/Aseel.glb" position={[0, 0, 0]} rotationSpeed={0.015} />
          <Scene modelPath="/Dubai_Nights.glb" position={[3, 0, 0]} rotationSpeed={0.02} />
          <Environment files="/hdr/lobby.hdr" intensity={1.5} />
        </Canvas>
      </div>
    </div>
  );
};

export default Hero;
