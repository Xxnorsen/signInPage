import { Text, TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const textStyle = {
    default: { fontSize: 16, color: "#000" },
    title: { fontSize: 32, fontWeight: "700", color: "#000" },
    subtitle: { fontSize: 20, fontWeight: "600", color: "#666" },
    link: {
      fontSize: 16,
      color: "#0066cc",
      textDecorationLine: "underline" as const,
    },
  }[type];

  return <Text style={[textStyle, style]} {...rest} />;
}
