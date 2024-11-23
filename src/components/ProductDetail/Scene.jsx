import { useRef, useEffect } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingModel from '../FloatingModel/FloatingModel';

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ modelPath = '/blue_perfume_bottle1.glb' }) => {
  const model1Ref = useRef(null);
  const groupRef = useRef(null);

  const FLOAT_SPEED = 1.5;

  useEffect(() => {
    if (!model1Ref.current) return;

    const isMobile = window.innerWidth <= 1026; // Adjust breakpoint as needed
    const initialPosition = isMobile ? { x: 0, y: 0, z: 0 } : { x: 0, y: 0, z: 0 };

    // Set initial position
    gsap.set(model1Ref.current.position, initialPosition);

    // Initial entry animation: move to center of the screen
    gsap.fromTo(
      model1Ref.current.position,
      { y: 3, z: 0 },
      {
        y: initialPosition.y,
        z: initialPosition.z,
        duration: 2,
        ease: 'power2.out',
      }
    );

    // Scroll-triggered animation: move down and stop based on scroll position
    gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container', // The container that controls the scroll
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth syncing with scroll
        onUpdate: (self) => {
          // Adjust based on scroll progress
          const progress = self.progress; // 0 to 1
          model1Ref.current.position.y = initialPosition.y - progress * 5; // Move down
        },
      },
    });

    // Continuous spinning animation
    gsap.to(model1Ref.current.rotation, {
      y: Math.PI * 2,
      duration: 3, // Duration for one full spin
      repeat: -1, // Infinite loop
      ease: 'none', // Constant speed
    });
  }, []);

  return (
    <group ref={groupRef}>
      <FloatingModel
        ref={model1Ref}
        modelPath={modelPath}
        floatspeed={FLOAT_SPEED}
        scale={[2.2, 2.2, 2.2]}
        position={[0, 0, 0]}
      />
      <Environment files='/hdr/lobby.hdr' environmentIntensity={1.5} />
      <OrbitControls />
    </group>
  );
};

export default Scene;
