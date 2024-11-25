import { useGetAllProducts } from "@/app/tanstack/queries";
import CustomInput from "@/components/form/CustomInput";
import { SearchInput } from "@/components/SearchInput";
import { ErrorComponent } from "@/components/ui/ErrorComponent";
import { Loading } from "@/components/ui/Loading";
import { Products } from "@/components/ui/Products";
import Wrapper from "@/components/ui/Wrapper";
import { colors } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { isLoading } from "expo-font";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    value: string;
    onChange: (value: string) => void
}

export default function Home() {

    const [value, setValue] = useState('');
  const { data, isPending, isError, refetch } = useGetAllProducts();
  const onClear = () => setValue('');

  const filteredProduct = useMemo(() => {
    if (!value) return data?.products || [];
    return (
      data?.products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      ) || []
    );
  }, [data?.products, value]);
  const onChange = (value: string) => setValue(value);
  if (isError) {
    return <ErrorComponent onRefresh={refetch} />;
  }

  if (isPending) return <Loading />;

    return (
        <Wrapper>
            <SearchInput onChange={onChange} value={value} onClear={onClear} />
                <Products data={filteredProduct} />
        </Wrapper>
    );
}



