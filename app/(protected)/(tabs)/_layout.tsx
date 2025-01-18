import { CartIcon } from "@/components/CartCOmponents/CartIcon";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { TabIcon } from "@/components/TabIcon";
import { colors } from "@/constants";
import { AntDesign, Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";




export default function 
TabsLayout() {
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor={"rgba(25, 148, 6, 1)"} />
        <Tabs screenOptions={{
            headerShown: false,
            tabBarInactiveTintColor: colors.dark,
            tabBarActiveTintColor: "rgba(29, 164, 7, 1)",
            headerTintColor: "rgba(29, 164, 7, 1)",
            headerStyle: {
                backgroundColor: colors.dark
            },
            headerRight: () => <CartIcon />,
            tabBarHideOnKeyboard: true
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color, size}) => <Entypo name="home" color={color} size={size}  />
                }}
            />
            <Tabs.Screen
                name="pricelist"
                options={{
                    title: "Price List",
                    tabBarIcon: ({color, size}) => <FontAwesome name="money" color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="post"
                options={{
                    title: "Post",
                    tabBarIcon: ({color, size}) => <Entypo name="squared-plus" color={color} size={size}  />
                }}
            />

<Tabs.Screen
                name="ecopoint"
                options={{
                    title: "Eco Point",
                    tabBarIcon: ({color, size}) => <FontAwesome name="calendar-check-o" color={color} size={size}  />
                }}
            />

<Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({color, size}) => <MaterialIcons name="account-circle" color={color} size={size}  />
                }}
            />
        </Tabs>
        </>
    );
}
