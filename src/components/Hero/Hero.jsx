import { useNavigate } from "react-router-dom";
import './Hero.css';
import { View } from '@react-three/drei';
import Scene from '../../pages/Scene';

const Hero = () => {
    const navigate = useNavigate(); // React Router's hook for navigation

    const handleShopNowClick = () => {
        navigate("/shop"); // Navigate to ProductList page
    };

    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1>Elevate Your Spirit with Victory Scented Fragrances!</h1>
                <p>Shop now and embrace the sweet smell of victory with Local Face.</p>
                <button className="hero-btn" onClick={handleShopNowClick}>Shop Now</button>
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