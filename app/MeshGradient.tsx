"use client";

import { useEffect, useRef } from "react";

export const MeshGradient = () => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(move);
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    move();

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <div id="MeshGradient" className="MeshGradient">
      <svg xmlns="http://www.w3.org/2000/svg" className="MeshGradient-goo">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div id="MeshGradient-meshContainer">
        <div id="MeshGradient-meshContainer-mesh1" />
        <div id="MeshGradient-meshContainer-mesh2" />
        <div id="MeshGradient-meshContainer-mesh3" />
        <div id="MeshGradient-meshContainer-mesh4" />
        <div id="MeshGradient-meshContainer-mesh5" />
        <div id="MeshGradient-meshContainer-interactive" ref={bubbleRef} />
      </div>
    </div>
  );
};
