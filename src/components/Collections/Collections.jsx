import { View } from '@react-three/drei';
import './Collections.css';
import Scene from '../../pages/sceneFour';

const Collections = () => {
  return (
    <div className="collections-section">
      <h2 className="title">Our Collections</h2>
      <div className="model-overlay">
        {/* Replace this with your model or overlay image */}
        <View className='Model' > 
          <Scene />
        </View>
      </div>
    </div>
  );
};

export default Collections;