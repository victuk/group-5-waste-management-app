import { useGetAllProducts } from "@/app/tanstack/queries";
import CustomInput from "@/components/form/CustomInput";
import { SearchInput } from "@/components/SearchInput";
import { Loading } from "@/components/ui/Loading";
import { Products } from "@/components/ui/Products";
import Wrapper from "@/components/ui/Wrapper";
import { colors } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { isLoading } from "expo-font";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    value: string;
    onChange: (value: string) => void
}

export default function Home() {


    const  router = useRouter();

    const [value, setValue] = useState("");

    const onClear = () => {
        setValue("");
    }

    const onPress = () => {
        router.push('/login');
    }

    const {data, isPending, isError} = useGetAllProducts();

    if(isError) {
        return <Text>Something went wrong</Text>
    }

    if(isPending) {
        return <Loading />
    }


    return (
        <Wrapper>
            <SearchInput onChange={(val) => {setValue(val)}} value={value} onClear={onClear} />
                <Products data={data} />
        </Wrapper>
    );
}



