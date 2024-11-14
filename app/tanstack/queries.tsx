import { IProduct } from "@/interfaces/productType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get("https://api.escuelajs.co/api/v1/products");
            return res.data as IProduct[];
        }
    })
}

export const useGetProductById = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axios.get("https://api.escuelajs.co/api/v1/products/" + id);
            return res.data as IProduct;
        }
    })
}
