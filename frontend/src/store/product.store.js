import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // CREATE A NEW PRODUCT
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.imageURL) {
      return { success: false, message: "Please provide all correct fields" };
    }

    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      return { success: false, message: `Error: ${res.statusText}` };
    }

    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return { success: true, message: "Product created!" };
  },

  // FETCH ALL THE PRODUCTS
  fetchProducts: async () => {
    const res = await fetch(`${API_BASE_URL}/api/products`);

    const data = await res.json();
    set({ products: data.data });
  },

  // DELETE A PRODUCT
  deleteProduct: async (pid) => {
    const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // update the UI immediately
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  // UPDATE A PRODUCT
  updateProduct: async (pid, product) => {
    const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the UI immediately
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return { success: true, message: data.message };
  },
}));
