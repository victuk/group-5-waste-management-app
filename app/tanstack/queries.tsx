import { baseUrl } from "@/baseUrl";
import { IProduct, ProductPaginated } from "@/interfaces/productType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get("https://dummyjson.com/products");
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

export const useLogin = async (email: string, password: string) => {
    const {status, data} = await axios.post(baseUrl + "v1/auth/log-in", {
      email, password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return {
      status, data
    };
  }
  
  export const useRegister = async (firstName: string, lastName: string, email: string, password: string) => {
    const {status, data} = await axios.post(baseUrl + "v1/auth/sample-register", {
      firstName, lastName, email, password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return {
      status, data
    };
  }
