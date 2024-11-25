import { CartItem } from "@/interfaces/cartInterface";
import { FavouriteInterface } from "@/interfaces/favouriteInterface";
import {create} from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavouriteStore {
    favourites: FavouriteInterface[];
    addOrRemoveFavoutite: (item: FavouriteInterface) => void;
    isInFavourite: (id: number) => string;
}

export const useFavouriteStoreStore = create<FavouriteStore>()(
    persist(
      (set, get) => ({
        favourites: [],
        addOrRemoveFavoutite: (favouriteItem) => set((favouriteItems) => {
  
          // return {favourites: []}
  
          const alreadyAdded = favouriteItems.favourites.find(item => item.id === favouriteItem.id);
  
          if(alreadyAdded) {
            return {favourites: favouriteItems.favourites.filter(item => item.id !== favouriteItem.id)};
          }
          
          return {favourites: [...favouriteItems.favourites, favouriteItem]};
          
        }),
        isInFavourite: (id) => {
          const itemArray = get().favourites;
  
          const exists = itemArray.find(i => i.id == id);
  
          return exists ? "heart" : "hearto";
        }
       
      }),
      {
        name: 'cart',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );