import { useRef, useEffect } from 'react';
import FloatingModel from '../components/FloatingModel/FloatingModel';
import { Environment, OrbitControls, Text, Cloud } from '@react-three/drei';
import gsap from 'gsap';

const Scene = () => {
  const modelRefs = Array.from({ length: 6 }, () => useRef(null));
  const textRefs = Array.from({ length: 6 }, () => useRef(null));

  const FLOAT_SPEED = 1.5;

  const modelPaths = [
    '/black_perfume_bottle1.glb',
    '/red_perfume_bottle1.glb',
    '/caribbean_green_perfume_bottle1.glb',
    '/purple_perfume_bottle1.glb',
    '/brown_perfume_bottle1.glb',
    '/mexican_pink_perfume_bottle1.glb'
  ];

  const modelTexts = [
    "TEA ROSE", "AFSHAA",
    "FIDAI", "ETERNITY",
    "TEST", "TEST"
  ];

  useEffect(() => {
    if (modelRefs.some(ref => !ref.current) || textRefs.some(ref => !ref.current)) return;

    modelRefs.forEach((modelRef) => {
      gsap.set(modelRef.current.position, { x: 4, y: 0, z: 0.3 });
      gsap.set(modelRef.current.rotation, { y: 0 });
    });

    textRefs.forEach((textRef) => {
      gsap.set(textRef.current.position, { x: 8, y: 0, z: 1 });
      gsap.set(textRef.current, { opacity: 0 });
    });

    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    const duration = 0.5;

    modelRefs.forEach((modelRef, index) => {
      const textRef = textRefs[index].current;

      timeline
        .to([modelRef.current.position, textRef.position], {
          x: 0,
          duration,
          ease: "power1.out"
        }, `>${index * duration}`)
        .to(modelRef.current.rotation, {
          y: "+=6.283", // 3 full spins
          duration: 3,
          ease: "power1.out"
        }, `<`)
        .to(textRef, { opacity: 1, duration: duration / 2 }, `<`)
        .to([modelRef.current.position, textRef.position], {
          x: -8,
          y: 0,
          z: 1,
          duration,
          ease: "power1.in"
        }, `>${duration * 2}`)
        .to(textRef, { opacity: 0, duration: duration / 2 }, `<`);
    });
  }, []);

  return (
    <group>
      {/* Add Clouds in the Background */}
      <Cloud position={[0, 0, -20]} scale={[1, 2, 1]} opacity={0.3} speed={0.2} />

      
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