import { colors } from "@/constants";
import { AntDesign } from "@expo/vector-icons";

interface Props {
    focused: boolean;
    name: React.ComponentProps<typeof AntDesign>["name"];
    size: number;
}

export const TabIcon = ({focused, name, size}: Props): JSX.Element => {
    return (
        <AntDesign
            name={name}
            size={size}
            color= {focused ? colors.yellow : colors.dark}
            style={{marginBottom: -3}}
        />
    );
}