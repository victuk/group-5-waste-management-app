import { IProduct, ProductPaginated } from "@/interfaces/productType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get("https://dummyjson.com/products");
            console.log("Products", res.data);
            return res.data as ProductPaginated;
        }
    })
}

export const useGetProductById = (id: number) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axios.get("https://dummyjson.com/products/" + id);
            return res.data as IProduct;
        }
    })
}


export const useSimilarProducts = (category: string, limit: number) => {
    return useQuery({
        queryKey: ["product-by-category", category],
        queryFn: async () => {
            const res = await axios.get("https://dummyjson.com/products/category/" + category + "?limit=" + limit);
            return res.data as ProductPaginated;
        }
    })
}
