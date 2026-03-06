import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const useAnimations = () => {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  return { fadeAnimation: fade, slideAnimation: slide };
};

export const useImageAnimation = (images: any[]) => {
  const [current] = useState(images[0]);
  const fade = useRef(new Animated.Value(1)).current;
  return { currentImage: current, imageFade: fade };
};
