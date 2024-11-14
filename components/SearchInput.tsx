import CustomInput from "@/components/form/CustomInput";
import { colors } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchInput({ onChange, onClear, value }: Props) {
  const router = useRouter();

  const onPress = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <AntDesign name="search1" color={colors.dark} size={25} />
      <CustomInput
        value={value}
        onChangeText={onChange}
        placeholder="Search"
        style={{ borderWidth: 0, flex: 1 }}
      />
      {value && (
        <Pressable>
          <AntDesign
            name="close"
            color={colors.dark}
            size={20}
            onPress={onClear}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    borderColor: colors.dark,
    borderWidth: 1,
    height: 60,
    marginTop: 20,
  },
});
