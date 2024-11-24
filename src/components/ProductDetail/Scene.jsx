import { forwardRef, useRef, useImperativeHandle } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingModel from '../FloatingModel/FloatingModel';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = forwardRef(({ modelPath = '/blue_perfume_bottle1.glb' }, ref) => {
  const model1Ref = useRef(null);
  const groupRef = useRef(null);
  const FLOAT_SPEED = 1.5;

  // Expose a method to trigger the sinking animation from the parent
  useImperativeHandle(ref, () => ({
    startSinking: () => {
      handleButtonClick();
    },
  }));

  useGSAP(() => {
    if (!model1Ref.current) return;

    // Initial position for the model
    const initialPosition = { x: 0, y: 0.51, z: 1 };
    gsap.set(model1Ref.current.position, initialPosition);
    gsap.set(model1Ref.current.rotation, { x: 0, y: 0.5, z: 0 });

    // Scroll-based animations
    const scrollTl = gsap.timeline({
      defaults: {
        duration: 0, // No duration for immediate scroll sync
      },
      scrollTrigger: {
        trigger: '.hero-container', // The scroll container
        start: 'top top', // Start when the top of the container hits the top of the viewport
        end: '+=1000', // Limit scroll effect to 1000px
        scrub: 0.5, // Adjust the speed of the scroll (lower is slower)
        pin: true, // Pin the model in place after it reaches the stopping point
        immediateRender: true,
        ease: 'power1.inOut',
        onUpdate: ({ progress }) => {
          if (progress > 1) {
            gsap.set(model1Ref.current.position, { y: -1 });
          }
        },
      },
    });

    scrollTl
      .to(model1Ref.current.position, { y: -0.8, duration: 30, ease: 'power1.inOut' }, 0)
      .to(model1Ref.current.rotation, { z: 0 }, 0);

    gsap.to(model1Ref.current.rotation, {
      y: Math.PI * 2,
      duration: 3,
      repeat: -1, // Infinite rotation
      ease: 'power1.inOut',
    });

    ScrollTrigger.create({
      trigger: '.attend',
      start: 'top center',
      end: '+=1500',
      onEnter: () => {
        gsap.to(model1Ref.current.position, { y: model1Ref.current.position.y, ease: 'power1.inOut' });
      },
      onLeave: () => {
        gsap.to(model1Ref.current.position, { y: -0.8, ease: 'power1.inOut' });
      },
      scrub: true,
    });
  }, []);

  // Function to handle the button click animation (sinking effect)
  const handleButtonClick = () => {
    if (model1Ref.current) {
      const targetPosition = { x: 0, y: 0, z: 0 }; // Adjust as per your needs

      // Move the model into the button and scale it down
      gsap.to(model1Ref.current.position, {
        y: -2, // Move model down into the button's area
        x: 0, // Keep the x-axis same
        z: 0, // Keep the z-axis same
        duration: 5,
        ease: 'power2.out',
      });

      gsap.to(model1Ref.current.scale, {
        x: 0.1,
        y: 0.1,
        z: 0.1,
        duration: 1.5,
        ease: 'power2.out',
      });

      // Fade out the model (disappear effect)
      gsap.to(model1Ref.current, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
      });
    }
  };

  return (
    <group ref={groupRef}>
      <FloatingModel
        ref={model1Ref}
        modelPath={modelPath}
        floatspeed={FLOAT_SPEED}
        scale={[0.5, 0.5, 0.5]} // Adjust the size for around 100px height
      />
      <Environment files='/hdr/lobby.hdr' environmentIntensity={1.5} />
      <OrbitControls />
    </group>
  );
});

export default Scene;
