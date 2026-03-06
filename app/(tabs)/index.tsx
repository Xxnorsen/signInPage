import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { HeroSection, LocationFeature } from "../../components/HeroSection";
import { InputField } from "../../components/InputField";
import { useAnimations, useImageAnimation } from "../../hooks/useAnimations";

const IMAGES = [
  require("../../assets/healthy-food4.png"),
  require("../../assets/healthy-food2.png"),
];

const INPUT_FIELDS = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    icon: "email" as const,
    keyboardType: "email-address" as const,
    autoCapitalize: "none" as const,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Create a password",
    icon: "lock" as const,
    secureTextEntry: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    icon: "lock-outline" as const,
    secureTextEntry: true,
  },
];

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const { fadeAnimation, slideAnimation } = useAnimations();
  const { currentImage, imageFade } = useImageAnimation(IMAGES);

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  const onFocus = (field: string) => setFocused(field);

  const handleSignUp = () => {
    const { email, password, confirmPassword } = form;
    if (!email || !password || !confirmPassword)
      return Alert.alert("Error", "Please fill in all fields");
    if (password !== confirmPassword)
      return Alert.alert("Error", "Passwords do not match");
    if (password.length < 6)
      return Alert.alert("Error", "Password must be at least 6 characters");
    Alert.alert("Success", "Welcome to FreshEats!");
  };

  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <ScrollView
        ref={scrollRef}
        style={s.flex}
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <HeroSection
          currentImage={currentImage}
          imageFade={imageFade}
          onPress={() => Keyboard.dismiss()}
        />
        <Animated.View
          style={[
            s.form,
            {
              opacity: fadeAnimation,
              transform: [{ translateY: slideAnimation }],
            },
          ]}
        >
          <Text style={s.title}>Create Account</Text>
          <Text style={s.subtitle}>Join our healthy food community</Text>
          <LocationFeature />
          <View style={s.inputs}>
            {INPUT_FIELDS.map((f) => (
              <InputField
                key={f.name}
                {...f}
                value={form[f.name as keyof typeof form]}
                onChangeText={(v: string) => updateField(f.name, v)}
                isFocused={focused === f.name}
                onFocus={() => onFocus(f.name)}
                onBlur={() => setFocused(null)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={s.btn}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <Ionicons name="leaf" size={16} color="white" style={s.btnIcon} />
            <Text style={s.btnText}>Start Healthy Eating</Text>
          </TouchableOpacity>
          <Text style={s.signIn}>
            Already have an account?{" "}
            <Text
              style={s.link}
              onPress={() => Alert.alert("Sign In", "Coming soon!")}
            >
              Sign In
            </Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: 250 },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -25,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 20,
  },
  inputs: { marginBottom: 15 },
  btn: {
    backgroundColor: "#228b22",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnIcon: { marginRight: 6 },
  btnText: { color: "white", fontSize: 14, fontWeight: "700" },
  signIn: { textAlign: "center", color: "#95a5a6", fontSize: 11 },
  link: { color: "#228b22", fontWeight: "700" },
});
