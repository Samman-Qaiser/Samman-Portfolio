"use client";
import { useState, useRef, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

import { Plane } from "lucide-react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Plugin register karna zaroori hai
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

export const UnicornSceneloader = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const planeRef = useRef(null);
  const containerRef = useRef(null);

  const handleStart = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Timeline for the plane
    const tl = gsap.timeline();

    // 1. Plane ko center mein show karna
    tl.set(planeRef.current, { opacity: 1, scale: 0, x: 0, y: 0 });

    // 2. Plane ka "Explosion" aur Circular flight
    tl.to(planeRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    })
    .to(planeRef.current, {
      motionPath: {
        path: [
          { x: 100, y: -350 },
          { x: 250, y: -350 },
          { x: 100, y: 150 },
          { x: -100, y: 150 },
          { x: -250, y: 0 },
          { x: -100, y: -150 },
          { x: 0, y: 0 }
        ],
        curviness: 2,
        autoRotate: true,
      },
      duration: 5, // Thoda slow rakha hai taake "lavish" feel aaye
      ease: "power2.inOut",
      onComplete: () => {
        console.log("Plane animation done! Now Staircase.");
        // Yahan hum Staircase ka function call karenge next step mein
      }
    });
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none">
      <UnicornScene
        projectId="xFFIQFpjj8D0gIINmUGe"
        className="w-full h-full object-cover"
      />

    </div>
  );
};