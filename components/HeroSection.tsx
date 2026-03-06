import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type HeroProps = {
  currentImage: any;
  imageFade: Animated.Value;
  onPress: () => void;
};

export const HeroSection = ({
  currentImage,
  imageFade,
  onPress,
}: HeroProps) => (
  <Pressable onPress={onPress}>
    <View style={s.hero}>
      <Animated.View style={[s.imgWrap, { opacity: imageFade }]}>
        <Image source={currentImage} style={s.img} />
      </Animated.View>
      <View style={s.overlay}>
        <Text style={s.title}>Fresh Food Delivered</Text>
        <Text style={s.subtitle}>Quick delivery straight to your home</Text>
      </View>
    </View>
  </Pressable>
);

export const LocationFeature = () => (
  <View style={s.loc}>
    <View style={s.locIcon}>
      <Ionicons name="location" size={16} color="#228b22" />
    </View>
    <View style={s.locContent}>
      <Text style={s.locTitle}>Always Fresh</Text>
      <Text style={s.locText}>Best produce in your neighborhood</Text>
    </View>
  </View>
);

const s = StyleSheet.create({
  hero: { height: "45%", position: "relative" },
  imgWrap: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    paddingHorizontal: 20,
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    lineHeight: 20,
  },
  loc: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f8f0",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8f5e8",
  },
  locIcon: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locContent: { flex: 1 },
  locTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#228b22",
    marginBottom: 2,
  },
  locText: { color: "#666", fontSize: 11, fontWeight: "500" },
});
