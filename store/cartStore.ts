import { CartItem } from "@/interfaces/cartInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    deleteFromCart: (id: number) => void;
    clear: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
      (set) => ({
        items: [],
        addItem: (item) =>
          set((state) => {
            // to check if the item is already in the cart
            const existingItem = state.items.find((i) => i.id === item.id);
  
            if (existingItem) {
              return {
                items: state.items.map((i) => {
                  return i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i;
                }),
              };
            }
  
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }),
        removeItem: (id: number) =>
          set((state) => {
            const existingItem = state.items.find((i) => i.id === id);
            if (existingItem && existingItem.quantity > 1) {
              return { items: state.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)) };
            }
            return { items: state.items.filter((i) => i.id !== id) };
          }),
        clear: () => set({ items: [] }),
        deleteFromCart: (id) => {
          return set((state) => ({
            items: state.items.filter((i) => i.id !== id),
          }));
        },
      }),
      {
        name: 'cart',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );