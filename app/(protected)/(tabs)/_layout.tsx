import { CartIcon } from "@/components/CartCOmponents/CartIcon";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { TabIcon } from "@/components/TabIcon";
import { colors } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";




export default function 
TabsLayout() {
    return (
        <>
        <StatusBar barStyle="light-content" />
        <Tabs screenOptions={{
            tabBarInactiveTintColor: colors.dark,
            tabBarActiveTintColor: colors.yellow,
            headerTintColor: colors.yellow,
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
                    tabBarIcon: ({focused, size}) => <TabIcon name="home" focused={focused} size={size} />
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    title: "Menu",
                    tabBarIcon: ({focused, size}) => <TabIcon name="bars" focused={focused} size={size} />
                }}
            />
            <Tabs.Screen
                name="more"
                options={{
                    title: "More",
                    tabBarIcon: ({focused, size}) => <TabIcon name="amazon" focused={focused} size={size} />
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Account",
                    tabBarIcon: ({focused, size}) => <TabIcon name="user" focused={focused} size={size} />
                }}
            />
        </Tabs>
        </>
    );
}
