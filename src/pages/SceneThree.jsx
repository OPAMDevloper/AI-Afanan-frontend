import { useRef } from 'react';
import FloatingModel from '../components/FloatingModel/FloatingModel';
import { Environment, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = () => {
  const model1Ref = useRef(null);
  const model2Ref = useRef(null);
  const model3Ref = useRef(null);
  const model4Ref = useRef(null);
  const model5Ref = useRef(null);

  const groupRef = useRef(null);
  const FLOAT_SPEED = 1.5;
  const modelPaths = [
    '/caribbean_green_perfume_bottle1.glb',
    '/purple_perfume_bottle1.glb',
    '/white_perfume_bottle1.glb',
    '/brown_perfume_bottle1.glb',
    '/black_perfume_bottle1.glb',
  ];

  useGSAP(() => {
    if (
      !model1Ref.current ||
      !model2Ref.current ||
      !model3Ref.current ||
      !model4Ref.current ||
      !model5Ref.current
    ) return;

    // Initial positions
    gsap.set(model1Ref.current.position, { x: -4, y: 0.2 });
    gsap.set(model2Ref.current.position, { y: 5, z: 2 });
    gsap.set(model3Ref.current.position, { x: 2, y: 1.5, z: 2 });
    gsap.set(model4Ref.current.position, { x: 3, y: -1 });
    gsap.set(model5Ref.current.position, { y: -5 });

    // Scroll-triggered animation
    const scrollTl = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".heroTwo-container",
        pin: true,
        start: "top top",
        end: "+=1000",
        scrub: 2,
        immediateRender: false,
        ease: "power1.inOut",
      },
    });

    scrollTl
      .to(model1Ref.current.position, { x: -0.8, y: -0.2, z: 0.8 }, 0)
      .to(model1Ref.current.rotation, { z: -0.3 }, 0)
      .to(model2Ref.current.position, { x: -1.4, y: -0.2, z: 0.8 }, 0)
      .to(model2Ref.current.rotation, { z: 0.3 }, 0)
      .to(model3Ref.current.position, { x: -1.8, y: 0.3, z: 0.2 }, 0)
      .to(model3Ref.current.rotation, { z: 0.2 }, 0)
      .to(model4Ref.current.position, { x: -0.8, y: -0.1, z: 1.8 }, 0)
      .to(model4Ref.current.rotation, { z: 0 }, 0)
      .to(model5Ref.current.position, { x: -0.7, y: 0.3, z: 0.2 }, 0)
      .to(model5Ref.current.rotation, { z: -0.25 }, 0);


  }, []);

  return (
    <group ref={groupRef}>
      <FloatingModel ref={model1Ref} modelPath={modelPaths[0]} floatspeed={FLOAT_SPEED} />
      <FloatingModel ref={model2Ref} modelPath={modelPaths[1]} floatspeed={FLOAT_SPEED} />
      <FloatingModel ref={model3Ref} modelPath={modelPaths[2]} floatspeed={FLOAT_SPEED} />
      <FloatingModel ref={model4Ref} modelPath={modelPaths[3]} floatspeed={FLOAT_SPEED} />
      <FloatingModel ref={model5Ref} modelPath={modelPaths[4]} floatspeed={FLOAT_SPEED} />

      <Environment files='/hdr/lobby.hdr' environmentIntensity={1.5} />
      <OrbitControls />
    </group>
  );
};

export default Scene;