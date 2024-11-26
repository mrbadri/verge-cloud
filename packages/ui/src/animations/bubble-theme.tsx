"use client";

import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState, useRef } from "react";

export const useBubbleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const isInitialRender = useRef(true); // Track first render

  const captureScreenshot = useCallback(async () => {
    try {
      const screenshot = await htmlToImage.toPng(document.body, {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      });
      setImageUrl(screenshot);
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
    }
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false; // Skip the first run
      return;
    }
    captureScreenshot();
  }, [theme, captureScreenshot]);

  return {
    theme,
    setTheme,
    captureScreenshot,
    imageUrl,
  };
};

export const BubbleTheme = () => {
  const { theme, imageUrl } = useBubbleTheme();

  if (!imageUrl) return null;

  return (
    <motion.div
      key={theme}
      className="fixed inset-0 z-50 w-screen h-screen overflow-hidden"
      initial={{ clipPath: "circle(150% at 0% 0%)" }}
      animate={{ clipPath: "circle(0% at 0% 0%)" }}
      exit={{ clipPath: "circle(150% at 0% 0%)" }}
      transition={{ duration: 2.75, ease: "easeInOut" }}
    >
      <motion.img
        src={imageUrl}
        alt="Captured Screenshot"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover" }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};
