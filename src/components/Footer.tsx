"use client";
import React, { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      const pinkColor = "var(--premium-pink)";

      // 1. Initial State: Sab clear rakho
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: "transparent", // Start with NO fill
        stroke: pinkColor,
        strokeWidth: 2,
        opacity: 1
      });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      tl.to(path, {
        // Step 1: Draw the outline (Stroke)
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
      })
      .fromTo(path, 
        { fill: "transparent" }, // Yahan se start karo
        { 
          // Step 2: Solid Fill (Drawing ke end par)
          fill: pinkColor, 
          duration: 1, 
          ease: "none" 
        }, 
        "-=0.5" // Stroke khatam hone se thora pehle fill shuru ho
      )
      .to(path, {
        // Step 3: Outro before repeat
        opacity: 0,
        duration: 0.6,
        delay: 1
      });
    }
  }, { scope: containerRef });

  return (
    <footer className="w-full bg-background pt-20 pb-10 px-8">
      {/* Top Links Row */}
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-4">
        <a href="https://www.linkedin.com/in/samman-qaiser-39178431a" target="_blank" rel="noopener noreferrer" className="hover:text-premium-pink transition-colors">LINKEDIN</a>
        <a href="https://github.com/Samman-Qaiser" target="_blank" rel="noopener noreferrer" className="hover:text-premium-pink transition-colors">GITHUB</a>
      </div>

      {/* Info Row */}
      <div className="flex py-5 border-primary border-t border-b flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 gap-6">
        <div>PRIVACY POLICY</div>
        <div className="hover:text-white cursor-pointer transition-colors uppercase">sammansheikh6@gmail.com</div>
        <div className="hidden md:block">ALL RIGHTS RESERVED SAMMAN QAISER {currentYear}©</div>
        <div>SARGODHA, PK</div>
        <div>COOKIE POLICY</div>
      </div>

      {/* BIG NAME SECTION */}
      <div className="mt-16 overflow-hidden" ref={containerRef}>
        <h1 className="text-[11vw] lg:text-[13vw] leading-[0.8] font-black tracking-tighter text-primary flex items-baseline justify-center whitespace-nowrap">
          <span>SAMMAN QAI</span>
          
          <div className="relative px-2 h-[0.9em] w-[1.2em] flex items-center justify-center translate-y-[0.05em]">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 109 154" 
          
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              <path 
                ref={pathRef}
               d="M105.903 108.955C105.903 102.35 104.592 96.7442 101.971 92.1387L101.713 91.6963C98.9193 87.0088 95.3682 83.1734 91.0596 80.1904C87.0646 77.3496 82.8822 75.0708 78.5127 73.3535L77.6357 73.0176C73.5757 71.4847 69.8421 70.241 66.4346 69.2881L64.9941 68.8975L50.2217 64.9209C47.8602 64.2995 45.2993 63.5141 42.5391 62.5664L41.3438 62.1504C38.1241 60.9667 35.0459 59.476 32.1104 57.6768C29.1747 55.8302 26.7602 53.5333 24.8662 50.7871C23.135 48.1681 22.2156 45.0704 22.1074 41.4941L22.0967 40.7725C22.0968 36.1325 23.4218 31.9895 26.0732 28.3438C28.7721 24.698 32.5128 21.8333 37.2949 19.75C42.1244 17.6667 47.759 16.625 54.1982 16.625C63.0051 16.625 70.4394 18.6135 76.5 22.5908C82.3712 26.4438 85.798 31.808 86.7812 38.6826L86.8691 39.3525H103.914C103.685 32.2427 101.545 25.866 97.4941 20.2227L97.0967 19.6787C92.8353 13.9022 87.0582 9.35734 79.7666 6.04297C72.475 2.68125 64.1416 1 54.7666 1C45.4864 1.00002 37.0821 2.70519 29.5537 6.11426L28.8564 6.43262C21.701 9.77241 15.9679 14.4014 11.6562 20.3184C7.25287 26.3789 5.05081 33.4811 5.05078 41.625C5.05078 51.4261 8.36535 59.3574 14.9941 65.418C21.6229 71.4785 30.619 76.1422 41.9824 79.4092L59.8809 84.5225C64.9944 85.9429 69.7529 87.6002 74.1562 89.4941C78.5596 91.3881 82.1107 93.8506 84.8096 96.8809C87.5084 99.9111 88.8574 103.841 88.8574 108.671L88.8535 109.166C88.7589 114.263 87.1972 118.738 84.1699 122.591C81.0449 126.521 76.8074 129.599 71.457 131.824C66.1068 134.002 60.07 135.091 53.3467 135.091V134.091C59.9617 134.091 65.8675 133.019 71.0801 130.897C76.2952 128.727 80.3846 125.745 83.3877 121.969C86.3647 118.178 87.8574 113.759 87.8574 108.671C87.8574 104.037 86.5683 100.359 84.0625 97.5459C81.477 94.6429 78.0539 92.2596 73.7607 90.4131C69.4029 88.5388 64.687 86.896 59.6123 85.4863L41.708 80.3711L41.7061 80.3701C30.5977 77.1764 21.6657 72.6423 14.9609 66.7324L14.3193 66.1562C7.46312 59.8877 4.05078 51.6783 4.05078 41.625C4.05081 33.2894 6.30827 25.9769 10.8467 19.7305L10.8477 19.7295C15.4094 13.4693 21.518 8.6289 29.1436 5.20215C36.816 1.72823 45.3625 2.18136e-05 54.7666 0C64.2621 0 72.7424 1.70318 80.1855 5.13477C87.6109 8.51066 93.5256 13.1565 97.8984 19.083C102.193 24.8405 104.522 31.3598 104.885 38.6152L104.914 39.3203L104.947 40.3525H85.9805L85.876 39.4697C85.0839 32.7819 81.9679 27.5765 76.4883 23.7891L75.9512 23.4268C70.0857 19.5775 62.8523 17.625 54.1982 17.625C47.8666 17.625 42.3725 18.6481 37.6934 20.666L37.6943 20.667C33.0518 22.6895 29.4612 25.4492 26.8818 28.9307L26.8828 28.9316C24.3595 32.4012 23.0968 36.3372 23.0967 40.7725L23.1064 41.4629C23.2095 44.8791 24.0849 47.7891 25.6973 50.2305C27.5076 52.8522 29.8154 55.0497 32.6318 56.8232C35.5114 58.5881 38.5309 60.051 41.6885 61.2119C44.8833 62.3392 47.8114 63.252 50.4756 63.9531L50.4814 63.9551L65.2471 67.9307C69.0749 68.9355 73.3224 70.3197 77.9854 72.0801C82.7539 73.8623 87.3021 76.2934 91.6279 79.3682C95.7821 82.2441 99.2487 85.8893 102.025 90.293L102.572 91.1846C105.478 96.0611 106.903 102.001 106.903 108.955L106.896 109.707C106.769 117.453 104.659 124.492 100.564 130.801L100.565 130.802C96.3779 137.326 90.2575 142.484 82.2559 146.292C74.2759 150.112 64.6274 152 53.3467 152C42.8248 152 33.6606 150.302 25.8828 146.872H25.8809C18.4043 143.554 12.4338 138.952 8.00293 133.057L7.5791 132.481L7.57617 132.478C3.28979 126.495 0.813825 119.585 0.135742 111.773L0.0761719 111.015L0 109.943H20.1729L20.252 110.857C20.7091 116.16 22.4809 120.489 25.5303 123.902C28.6742 127.32 32.6477 129.884 37.4746 131.587C42.3811 133.253 47.6697 134.091 53.3467 134.091V135.091L52.2676 135.081C47.2546 134.988 42.5316 134.242 38.0986 132.844L37.1533 132.534C32.1818 130.782 28.062 128.131 24.7949 124.58C21.5752 120.982 19.7293 116.436 19.2559 110.943H1.07324C1.64142 118.898 4.07996 125.882 8.38867 131.896C12.7447 137.909 18.7114 142.596 26.2871 145.958C33.6719 149.215 42.3676 150.893 52.374 150.995L53.3467 151C64.5206 151 74.0138 149.13 81.8262 145.39C89.686 141.649 95.6526 136.606 99.7246 130.262C103.715 124.115 105.773 117.258 105.897 109.689L105.903 108.955Z" fill="none"
              />
            </svg>
          </div>
          
          <span className="ml-[-1vw]">ER</span>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;