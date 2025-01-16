import { create } from "zustand";

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  setOrders: (orders) => set({ orders }),

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/orders"); 
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log("Fetched orders from API:", data);
      set({ orders: data, loading: false }); 
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      set({ error: error.message, loading: false });
    }
  },
}));
