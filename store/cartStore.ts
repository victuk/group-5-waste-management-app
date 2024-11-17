import { CartItem } from "@/interfaces/cartInterface";
import {create} from "zustand";

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clear: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id == item.id);

        if(existingItem) {
            return {items: state.items.map((i) => (i.id == item.id ? {...i, quantity: i.quantity + 1} : i))};
        }
        return {items: [...state.items, {...item, quantity: 1}]};
    }),
    removeItem: (id) => set((state) => {
        const existingItem = state.items.find((i) => i.id == id);

        if(existingItem && existingItem.quantity > 1) {
            return {items: state.items.map((i) => (i.id == id ? {...i, quantity: i.quantity - 1} : i))};
        }

        return {items: state.items.filter((i) => i.id != id)};

    }),
    clear: () => set(() => {
        return {items: []}
    })
}));