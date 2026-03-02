"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Staircase() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

useEffect(() => {
    const tl = gsap.timeline();

    // Top bars ko upar se neeche lane ke liye (y: -100% to 0)
    // Bottom bars ko neeche se upar lane ke liye (y: 100% to 0)
    
    tl.to(".stair-bar-top", {
      y: '-100%',
      duration: 1,
      stagger: 0.1,
      ease: "power4.inOut",
    }, 0);

    tl.to(".stair-bar-bottom", {
      y: '100%',
      duration: 1,
      stagger: 0.1,
      ease: "power4.inOut",
    }, 0);

  }, []);

  // 10 divs create karne ka array
  const bars = Array.from({ length: 10 });

  return (
    <div className="fixed inset-0 z-10001 pointer-events-none flex flex-col w-screen h-screen">
      
      {/* Top Half (50%) */}
      <div ref={topRef} className="relative flex w-full h-1/2 overflow-hidden">
        {bars.map((_, i) => (
          <div
            key={`top-${i}`}
            className="stair-bar-top w-[10%] h-full"
            style={{ 
              backgroundColor:  '#F0A6CA' 
            }}
          />
        ))}
      </div>

      {/* Bottom Half (50%) */}
      <div ref={bottomRef} className="relative flex w-full h-1/2 overflow-hidden">
        {bars.map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="stair-bar-bottom w-[10%] h-full "
            style={{ 
              backgroundColor:  '#F0A6CA' 
            }}
          />
        ))}
      </div>
      
    </div>
  );
}