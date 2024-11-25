import { CartItem } from "@/interfaces/cartInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
    fullName: string;
    email: string;
    token: string;
  };
  
  type UserStore = {
    user: User | null,
    createUser: (user: User) => void;
    removeUser: () => void;
    getUser: () => User | null;
  }
  
  export const useUserStore = create<UserStore>()(
    persist(
      (set, get) => ({
        user: null,
        createUser: (newUser) =>
          set((_state) => {
            return { user: newUser };
          }),
        removeUser: () =>
          set((_state) => {
            
            return { user: null };
          }),
          getUser: () => {   
              return get().user;
            }
      }),
      {
        name: 'auth',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );