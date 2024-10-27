import { View } from '@react-three/drei';
import './empty.css'
import SceneTwo from '../../pages/SceneTwo';

const EmptyComponent = () => {
  return (
    <div className="empty-container">
        <View className='Model'>
            <SceneTwo />
        </View>
    </div>
    
  );
};

export default EmptyComponent;