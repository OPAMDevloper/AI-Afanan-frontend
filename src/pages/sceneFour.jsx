import { useRef } from 'react';
import FloatingModel from '../components/FloatingModel/FloatingModel';
import { Environment, OrbitControls, Text } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  const modelRefs = Array.from({ length: 4 }, () => useRef(null));
  const textRefs = Array.from({ length: 4}, () => useRef(null));

  const FLOAT_SPEED = 1.5;

  const modelPaths = [
    '/black_perfume_bottle1.glb',
    '/red_perfume_bottle1.glb',
    '/caribbean_green_perfume_bottle1.glb',
    '/purple_perfume_bottle1.glb'
    
  ];

  const backgroundColors = [
    '#111111', '#ff6161', '#00ac78', '#DAB1DA'
  ];

  const modelTexts = [
    "TEA ROSE", "AFSHAA",
    "FIDAI", "ETERNITY",

  ];

  useGSAP(() => {
    if (modelRefs.some(ref => !ref.current) || textRefs.some(ref => !ref.current)) return;

    modelRefs.forEach((modelRef) => {
      gsap.set(modelRef.current.position, { x: 4, y: 0, z: 0.3 });
      gsap.set(modelRef.current.rotation, { y: 0 });
    });

    textRefs.forEach((textRef) => {
      gsap.set(textRef.current.position, { x: 8, y: 0, z: 1 });
      gsap.set(textRef.current, { opacity: 0 });
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".collections-section",
        
        pin: true,
        start: "top top",
        end: "+=4000",
        scrub: 2,
        immediateRender: false,
      },
    });

    const enterDuration = 6;
    const exitDuration = 20;
    const stagger = 1;

    modelRefs.forEach((modelRef, index) => {
      const textRef = textRefs[index].current;

      scrollTl
        .to([modelRef.current.position, textRef.position], {
          x: 0,
          duration: enterDuration,
          ease: "power1.out"
        }, `>${stagger * index}`)
        .to(modelRef.current.rotation, {
          y: "+=6.283", // 3 full spins
          duration: 30,
          ease: "power1.out"
        }, `<`)
        .to(textRef, { opacity: 1, duration: enterDuration / 2 }, `<`)
        .to("body", {
          backgroundColor: backgroundColors[index],
          duration: enterDuration,
          ease: "power1.inOut",
        }, `<`)

        .to([modelRef.current.position, textRef.position], {
          x: -8,
          y: 0,
          z: 1,
          duration: exitDuration,
          ease: "power1.in"
        }, `>${enterDuration + stagger * index}`)
        .to(textRef, { opacity: 0, duration: exitDuration / 2 }, `<`);
    });
  }, []);

  return (
    <group>
      {modelRefs.map((modelRef, index) => (
        <FloatingModel key={index} ref={modelRef} modelPath={modelPaths[index]} floatspeed={FLOAT_SPEED} />
      ))}
      {modelTexts.map((text, index) => (
        <Text
          key={index}
          ref={textRefs[index]}
          font="/fonts/Font.woff"
          position={[4, 0, 0]}
          fontSize={0.2}
          fontWeight={900}
          color="ffffff"
          anchorX="center"
          anchorY="middle"
          opacity={0}
          outlineColor="black"
        >
          {text}
        </Text>
      ))}
      <Environment files='/hdr/lobby.hdr' environmentIntensity={1.5} />
      <OrbitControls />
    </group>
  );
};

export default Scene;