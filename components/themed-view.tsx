import { View, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedViewProps) {
  const backgroundColor = "#fff";

  return <View style={[{ backgroundColor }, style]} {...rest} />;
}
