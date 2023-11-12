import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreCart {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<StoreCart>(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const existingItem = get().items.find((item) => item.id === data.id);
        if (existingItem) {
          return toast.error("Item already exists"); //return to stop the following codes
        }
        set({ items: [...get().items, data] });
        toast.success("Item added to cart successfully");
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-items", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
