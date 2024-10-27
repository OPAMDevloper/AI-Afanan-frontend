import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingModel from '../components/FloatingModel/FloatingModel';
import { Cloud, Clouds, Environment } from '@react-three/drei';
import { Text } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

const SceneTwo = () => {
    const groupRef = useRef(null);
    const modelRef = useRef(null);
    const cloudsRef = useRef(null);
    const cloud1Ref = useRef(null);
    const cloud2Ref = useRef(null);
    const textRefs = useRef([]); // Refs for text elements

    const modelPath = '/brown_perfume_bottle1.glb';

    const ANGLE = 75 * (Math.PI / 180);

    const getXPosition = (distance) => distance * Math.cos(ANGLE);
    const getYPosition = (distance) => distance * Math.sin(ANGLE);

    const getXYPosition = (distance) => ({
        x: getXPosition(distance),
        y: getYPosition(-1 * distance),
    });

    useLayoutEffect(() => {
        if (!cloudsRef.current || !modelRef.current || !cloud1Ref.current || !cloud2Ref.current || textRefs.current.length === 0) return;

        gsap.set(cloudsRef.current.position, { z: 0 });
        
        // Set model's initial opacity to 0
        gsap.set(modelRef.current, { opacity: 0 });

        gsap.set(modelRef.current.position, {
            ...getXYPosition(-4),
            z: 1.1
        });

        gsap.to(modelRef.current.rotation, {
            y: Math.PI * 2,
            duration: 1,
            repeat: -1,
            ease: 'none',
        });

        const DISTANCE = 15;
        const DURATION = 6;

        gsap.set([cloud1Ref.current.position, cloud2Ref.current.position], {
            ...getXYPosition(DISTANCE),
        });

        gsap.to(cloud1Ref.current.position, {
            y: `+=${getYPosition(DISTANCE * 2)}`,
            x: `+=${getXYPosition(DISTANCE * -2).x}`,
            ease: 'none',
            repeat: -1,
            duration: DURATION,
        });

        gsap.to(cloud2Ref.current.position, {
            y: `+=${getYPosition(DISTANCE * 2)}`,
            x: `+=${getXYPosition(DISTANCE * -2).x}`,
            ease: 'none',
            repeat: -1,
            delay: DURATION / 2,
            duration: DURATION,
        });

        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".empty-container",
                pin: true,
                start: "top top",
                end: "+=3000",
                scrub: 2,
            }
        });

        scrollTl
            .to(cloud1Ref.current.position, { z: 0, duration: 0.3 }, 0)
            .to(modelRef.current, { opacity: 1, duration: 1, ease: 'power1.inOut' }, 0) // Fade-in effect
            .to(modelRef.current.position, { x: 0, y: 0, duration: 0.2, ease: "back.out(1.7)" })
            .to(modelRef.current.position, {
                ...getXYPosition(4),
                duration: 0.5,
                ease: "back.in(1.7)",
            }, "+=1.8")
            .to(modelRef.current, { opacity: 0, duration: 1, ease: 'power1.inOut' }, "-=0.5"); // Fade-out effect

        // Diagonal animation for each text element with staggered delay and different colors
        textRefs.current.forEach((text, index) => {
            scrollTl.fromTo(
                text.position,
                { x: 6.5 + index * 1.5, y: -4 - index * 1.5, z: -1 }, // Start at bottom-right with staggered positions
                { x: -6, y: 4, duration: 3, delay: index * 0.3 }, // Move to top-left with delay for each word
                0 // Start at the beginning of the timeline
            );
        });
    });

    return (
        <group ref={groupRef}>
          <group rotation={[0, 0, 0.5]}>
            <FloatingModel
              ref={modelRef}
              modelPath={modelPath}
              rotationIntensity={0}
              floatIntensity={3}
              floatSpeed={3}
            >
              <pointLight intensity={80} color="#3b51a7" decay={0.6} />
            </FloatingModel>
          </group>
    
          <Clouds ref={cloudsRef}>
            <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} seed={1} scale={2} volume={5} fade={15} />
            <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} seed={1} scale={2} volume={5} fade={15} />
          </Clouds>
    
          <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />

          {/* Text elements with different colors */}
          <Text ref={(el) => textRefs.current[0] = el} fontSize={0.6} position={[6, -4, -1]} font="/fonts/Font.woff" color="#e24040">
            Dive
          </Text>
          <Text ref={(el) => textRefs.current[1] = el} fontSize={0.6} position={[7.5, -5.5, -1]} font="/fonts/Font.woff" color="#e24040">
            Into
          </Text>
          <Text ref={(el) => textRefs.current[2] = el} fontSize={0.6} position={[9, -7, -1]} font="/fonts/Font.woff" color="#e24040">
            The
          </Text>
          <Text ref={(el) => textRefs.current[3] = el} fontSize={0.6} position={[10.5, -8.5, -1]} font="/fonts/Font.woff" color="#e24040">
            World
          </Text> 
          <Text ref={(el) => textRefs.current[4] = el} fontSize={0.6} position={[12, -10, -1]} font="/fonts/Font.woff" color="#e24040">
            Of
          </Text>
          <Text ref={(el) => textRefs.current[5] = el} fontSize={0.6} position={[13.5, -11.5, -1]} font="/fonts/Font.woff" color="#e24040">
            Fragrance
          </Text>
        </group>
      );
};

export default SceneTwo;