"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Staircase() {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Animation khatam hone par pura container hide kar dena chahiye
        gsap.set(containerRef.current, { display: "none" });
      }
    });

    // Top bars: Smoothly sliding up
    tl.to(".stair-bar-top", {
      yPercent: -100, 
      duration: 1.2,
      stagger: {
        amount: 0.4, 
        from: "start"
      },
      ease: "expo.inOut", 
    }, 0);

    // Bottom bars: Smoothly sliding down
    tl.to(".stair-bar-bottom", {
      yPercent: 100,
      duration: 1.2,
      stagger: {
        amount: 0.4,
        from: "start"
      },
      ease: "expo.inOut",
    }, 0);

  }, []);

  const bars = Array.from({ length: 10 });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10001] pointer-events-none flex flex-col w-screen h-screen overflow-hidden">
      
      {/* Top Half */}
      <div className="relative flex w-full h-1/2 overflow-hidden">
        {bars.map((_, i) => (
          <div
            key={`top-${i}`}
            className="stair-bar-top w-[10.1%] h-full bg-premium-pink" 
            // 10.1% width gaps ko khatam karne ke liye hai
            style={{ willChange: "transform" }} // Browser performance boost
          />
        ))}
      </div>

      {/* Bottom Half */}
      <div className="relative flex w-full h-1/2 overflow-hidden">
        {bars.map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="stair-bar-bottom w-[10.1%] h-full bg-premium-pink"
            style={{ willChange: "transform" }}
          />
        ))}
      </div>
      
    </div>
  );
}