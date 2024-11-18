import { useRef, useState, useEffect } from "react";
import FloatingModel from "../components/FloatingModel/FloatingModel";
import { Environment, OrbitControls, Html } from "@react-three/drei";
import gsap from "gsap";

const Scene = ({modelPath}) => {
  const modelRefs = Array.from({ length: 1 }, () => useRef(null)); // Single model for simplicity
  const [isHovered, setIsHovered] = useState(false); // Track hover state for the model
  const FLOAT_SPEED = 1.5;

  const productDetails = [
    {
      name: "Ambar Ki Mas’huriyat",
      tagline: "Small tagline for this product",
      price: "1499 INR",
    },
  ];

  useEffect(() => {
   
    if (modelRefs.some((ref) => !ref.current)) return;

    // Create a continuous rotation using GSAP timeline
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 ,yoyo: true });

    modelRefs.forEach((modelRef) => {
      timeline.to(modelRef.current.rotation, {
        y: "+=6.283", // 1 full rotation (2*pi) around the Y-axis
        duration: 3, // Adjust the speed of the rotation
        ease: "none", // No easing for continuous movement
        repeat: -1, // Infinite repeat
      });
    });
    
  }, [modelPath]);

  return (
    <group>
      {modelPath && modelRefs.map((modelRef, index) => (
        <FloatingModel
          key={index}
          ref={modelRef[0]}
          modelPath={modelPath}
          floatspeed={FLOAT_SPEED}
          scale={[2.5, 2.5, 2.5]} // Increase the size of the model
          position={[0, 0, 0]} // Increase the size of the model
          onPointerOver={() => {
            setIsHovered(true); // Set hover state to true
            // Any additional hover effect like scaling can go here
            gsap.to(modelRef.current.scale, {
              x: 2.2,
              y: 2.2,
              z: 2.2,
              duration: 0.3,
              ease: "power1.out",
            });
          }}
          onPointerOut={() => {
            setIsHovered(false); // Reset hover state
            // Revert scale back to original
            gsap.to(modelRef.current.scale, {
              x: 2,
              y: 2,
              z: 2,
              duration: 0.3,
              ease: "power1.out",
            });
          }}
        />
      ))}

      {productDetails.map((product, index) => (
        <Html
          key={index}
          position={[1.5, 0, 0]} // Adjust based on model positioning
          distanceFactor={5}
          style={{
            background: "rgba(0, 0, 0, 0.9)",
            border: "1px solid #00d9ff",
            borderRadius: "15px",
            padding: "1rem",
            color: "#fff",
            width: "250px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "'Poppins', sans-serif",
            opacity: isHovered ? 1 : 0, // Only show text when hovered
            transform: isHovered ? "translateX(0)" : "translateX(100%)", // Move text from right to left on hover
            transition: "transform 0.5s ease, opacity 0.5s ease",
          }}
        >
          <img
            src="/path-to-image.png" // Replace with your image path
            alt={product.name}
            style={{
              width: "120px",
              height: "auto",
              marginBottom: "1rem",
            }}
          />
          <h2 style={{ margin: 0, fontSize: "1.2rem", textAlign: "center" }}>
            {product.name}
          </h2>
          <p style={{ margin: "0.5rem 0", fontSize: "0.9rem", textAlign: "center" }}>
            {product.tagline}
          </p>
          <p style={{ margin: "0.5rem 0", fontSize: "1rem", fontWeight: "bold" }}>
            Price - {product.price}
          </p>
          <button
            style={{
              padding: "0.5rem 1rem",
              background: "transparent",
              border: "1px solid #fff",
              borderRadius: "5px",
              color: "#fff",
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bag"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v1h3.5A1.5 1.5 0 0 1 15 5.5v9A1.5 1.5 0 0 1 13.5 16h-11A1.5 1.5 0 0 1 1 14.5v-9A1.5 1.5 0 0 1 2.5 3H6V2a2 2 0 0 1 2-2zm2 3V3a2 2 0 1 0-4 0v1h4z" />
            </svg>
            Add to Bag
          </button>
        </Html>
      ))}

      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
      <OrbitControls />
    </group>
  );
};

export default Scene;
