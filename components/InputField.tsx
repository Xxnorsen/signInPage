import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  icon: keyof typeof MaterialIcons.glyphMap;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  secureTextEntry?: boolean;
  keyboardType?: "email-address" | "default";
  autoCapitalize?: "none" | "sentences";
};

export const InputField = ({ label, icon, isFocused, ...props }: Props) => (
  <View style={s.wrap}>
    <Text style={s.label}>{label}</Text>
    <View style={[s.inputWrap, isFocused && s.focused]}>
      <MaterialIcons name={icon} size={16} color="#999" style={s.icon} />
      <TextInput style={s.input} placeholderTextColor="#999" {...props} />
    </View>
  </View>
);

const s = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: {
    fontSize: 12,
    color: "#2c3e50",
    marginBottom: 5,
    fontWeight: "600",
    marginLeft: 4,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  focused: { borderColor: "#228b22", backgroundColor: "#fff" },
  icon: { paddingHorizontal: 8 },
  input: {
    flex: 1,
    color: "#2c3e50",
    fontSize: 14,
    padding: 12,
    fontWeight: "400",
  },
});
