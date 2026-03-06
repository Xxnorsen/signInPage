import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const IMAGES = [
  require("../../assets/healthy-food4.png"),
  require("../../assets/healthy-food2.png"),
];

const INPUT_FIELDS = [
  {
    name: "email",
    label: "Email",
    placeholder: "Your email",
    icon: "mail" as const,
    keyboardType: "email-address" as const,
    autoCapitalize: "none" as const,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    icon: "lock-closed" as const,
    secureTextEntry: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm password",
    icon: "lock-closed-outline" as const,
    secureTextEntry: true,
  },
];

const useAnimations = () => {
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

const useImageAnimation = (images: any[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        Animated.timing(fade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fade, images.length]);

  return { currentImage: images[currentIndex], imageFade: fade };
};

const InputField = ({
  label,
  icon,
  isFocused,
  error,
  ...props
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  secureTextEntry?: boolean;
  keyboardType?: "email-address" | "default";
  autoCapitalize?: "none" | "sentences";
  error?: string;
}) => (
  <View style={styles.inputWrap}>
    <Text style={styles.label}>{label}</Text>
    <View
      style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error && styles.error,
      ]}
    >
      <Ionicons
        name={icon}
        size={16}
        color={error ? "#dc3545" : "#999"}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={error ? "#dc3545" : "#999"}
        {...props}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const HeroSection = ({
  currentImage,
  imageFade,
  onPress,
}: {
  currentImage: any;
  imageFade: Animated.Value;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress}>
    <View style={styles.hero}>
      <Animated.View style={[styles.imgWrap, { opacity: imageFade }]}>
        <Image source={currentImage} style={styles.img} />
      </Animated.View>
      <View style={styles.overlay}>
        <Text style={styles.heroTitle}>Fresh Food Delivered</Text>
        <Text style={styles.heroSubtitle}>Quality meals to your door</Text>
      </View>
    </View>
  </Pressable>
);

const LocationFeature = () => (
  <View style={styles.loc}>
    <View style={styles.locIcon}>
      <Ionicons name="location" size={16} color="#228b22" />
    </View>
    <View style={styles.locContent}>
      <Text style={styles.locTitle}>Always Fresh</Text>
      <Text style={styles.locText}>Best produce in your neighborhood</Text>
    </View>
  </View>
);

const PasswordGuide = ({ password }: { password: string }) => {
  const checks = [
    { label: "8+ characters", passed: password.length >= 8 },
    { label: "Uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "Lowercase letter", passed: /[a-z]/.test(password) },
    { label: "Number", passed: /[0-9]/.test(password) },
  ];

  return (
    <View style={styles.guide}>
      <Text style={styles.guideTitle}>Password needs:</Text>
      {checks.map((check, idx) => (
        <View key={idx} style={styles.guideItem}>
          <Ionicons
            name={check.passed ? "checkmark-circle" : "ellipse-outline"}
            size={16}
            color={check.passed ? "#228b22" : "#ccc"}
          />
          <Text style={[styles.guideText, check.passed && styles.guidePassed]}>
            {check.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const SignUpPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const scrollRef = useRef<ScrollView>(null);
  const { fadeAnimation, slideAnimation } = useAnimations();
  const { currentImage, imageFade } = useImageAnimation(IMAGES);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Real-time validation
    const newErrors: typeof errors = { ...errors };

    if (field === "email") {
      if (!value) {
        newErrors.email = "Email required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "Valid email needed";
      } else {
        delete newErrors.email;
      }
    }

    if (field === "password") {
      if (!value) {
        newErrors.password = "Password required";
      } else if (value.length < 8) {
        newErrors.password = "At least 8 characters";
      } else if (!/[A-Z]/.test(value)) {
        newErrors.password = "Need an uppercase letter";
      } else if (!/[a-z]/.test(value)) {
        newErrors.password = "Need a lowercase letter";
      } else if (!/[0-9]/.test(value)) {
        newErrors.password = "Need a number";
      } else {
        delete newErrors.password;
      }
    }

    if (field === "confirmPassword") {
      if (!value) {
        newErrors.confirmPassword = "Confirm password";
      } else if (value !== form.password) {
        newErrors.confirmPassword = "Passwords don't match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  const onFocus = (field: string) => setFocused(field);

  const handleSignUp = () => {
    const { email, password, confirmPassword } = form;
    const newErrors: typeof errors = {};

    // Check if all fields are filled
    if (!email) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password";

    // Email format validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Valid email needed";

    // Password structure validation
    if (password) {
      if (password.length < 8) newErrors.password = "At least 8 characters";
      else if (!/[A-Z]/.test(password))
        newErrors.password = "Need an uppercase letter";
      else if (!/[a-z]/.test(password))
        newErrors.password = "Need a lowercase letter";
      else if (!/[0-9]/.test(password)) newErrors.password = "Need a number";
    }

    // Confirm password validation
    if (confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";

    setErrors(newErrors);

    // If no errors, show success
    if (Object.keys(newErrors).length === 0) {
      Alert.alert("Success", "You're all set!");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.flex} onPress={() => Keyboard.dismiss()}>
          <HeroSection
            currentImage={currentImage}
            imageFade={imageFade}
            onPress={() => Keyboard.dismiss()}
          />
          <Animated.View
            style={[
              styles.form,
              {
                opacity: fadeAnimation,
                transform: [{ translateY: slideAnimation }],
              },
            ]}
          >
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Join us today</Text>
            <LocationFeature />
            <View style={styles.inputs}>
              {INPUT_FIELDS.map((f) => (
                <InputField
                  key={f.name}
                  {...f}
                  value={form[f.name as keyof typeof form]}
                  onChangeText={(v: string) => updateField(f.name, v)}
                  isFocused={focused === f.name}
                  onFocus={() => onFocus(f.name)}
                  onBlur={() => setFocused(null)}
                  error={errors[f.name as keyof typeof errors]}
                />
              ))}
            </View>
            {focused === "password" && (
              <PasswordGuide password={form.password} />
            )}
            <TouchableOpacity
              style={styles.btn}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Ionicons
                name="leaf"
                size={16}
                color="white"
                style={styles.btnIcon}
              />
              <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
            <Text style={styles.signIn}>
              Have an account?{" "}
              <Text
                style={styles.link}
                onPress={() => Alert.alert("Sign In", "Coming soon!")}
              >
                Log in
              </Text>
            </Text>
          </Animated.View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: 250 },
  form: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
  inputs: { marginBottom: 20 },
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

  // Hero section styles
  hero: { height: 280, position: "relative" },
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
  heroTitle: {
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
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    paddingHorizontal: 20,
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    lineHeight: 20,
  },

  // Location feature styles
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

  // Input field styles
  inputWrap: { marginBottom: 16 },
  label: {
    fontSize: 14,
    color: "#2c3e50",
    marginBottom: 8,
    fontWeight: "600",
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    paddingHorizontal: 4,
  },
  focused: {
    borderColor: "#228b22",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
  },
  error: {
    borderColor: "#dc3545",
    backgroundColor: "#fff5f5",
    borderWidth: 2,
  },
  icon: { paddingHorizontal: 12 },
  input: {
    flex: 1,
    color: "#2c3e50",
    fontSize: 16,
    padding: 16,
    fontWeight: "400",
  },
  inputError: {
    color: "#dc3545",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: "500",
  },

  // Password guide styles
  guide: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#228b22",
  },
  guideTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 8,
  },
  guideItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  guideText: {
    fontSize: 12,
    color: "#95a5a6",
    marginLeft: 8,
    flex: 1,
  },
  guidePassed: {
    color: "#228b22",
    fontWeight: "600",
  },
});

export default SignUpPage;
