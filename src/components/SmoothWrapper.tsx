"use client";
import SmoothScroll from "./SmoothScroll";

export default function SmoothWrapper({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}