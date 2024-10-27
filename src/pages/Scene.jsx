import { useRef, useEffect } from 'react';
import FloatingModel from '../components/FloatingModel/FloatingModel';
import { Environment, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = () => {
  const model1Ref = useRef(null);
  const groupRef = useRef(null);

  const FLOAT_SPEED = 1.5;
  const modelPath = '/blue_perfume_bottle1.glb';

  useGSAP(() => {
    if (!model1Ref.current) return;

    // Set initial position for desktop
    const isMobile = window.innerWidth <= 1024 // You can adjust this breakpoint as needed
    const initialPosition = isMobile ? { x: 0, y: -0.3 } : { x: 1.2, y: 0.2 };

    gsap.set(model1Ref.current.position, initialPosition);

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: 'back.out(1.4)',
      },
    });

    if (window.scrollY < 20) {
      introTl
        .from(model1Ref.current.position, { y: 5.3, x: initialPosition.x }, 0)
        .from(model1Ref.current.rotation, { z: 3 }, 0);
    }

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: '.hero-container',
        pin: true,
        start: 'top top',
        end: '+=1000',
        scrub: 2,
        immediateRender: false,
        ease: 'power1.inOut',
      },
    });

    scrollTl
      .to(model1Ref.current.position, { x: isMobile ? 0 : -3, y: -0.2, z: 6 }, 0)
      .to(model1Ref.current.rotation, { z: 0.8 }, 0);

    // Make the model spin continuously
    gsap.to(model1Ref.current.rotation, {
      y: Math.PI * 2,
      duration: 3, // duration of the spin
      repeat: -1, // infinite spin
      ease: 'none', // constant spinning
    });
  }, []);

  return (
    <group ref={groupRef}>
      <FloatingModel ref={model1Ref} modelPath={modelPath} floatspeed={FLOAT_SPEED} />
      <Environment files='/hdr/lobby.hdr' environmentIntensity={1.5} />
      <OrbitControls />
    </group>
  );
};

export default Scene;