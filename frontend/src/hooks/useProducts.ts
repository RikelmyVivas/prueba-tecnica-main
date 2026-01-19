import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const refreshProducts = useCallback(() => {
    setRefreshVersion((v) => v + 1);
  }, []);

  const deleteProduct = async (id: string) => {
    const deletingPromise = new Promise<void>(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("No se pudo eliminar");

        setProducts((prev) => prev.filter((p) => p.id !== id));
        resolve();
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });

    toast.promise(
      deletingPromise,
      {
        loading: "Eliminando...",
        success: "Producto eliminado correctamente",
        error: "Error al eliminar el producto",
      },
      {
        style: {
          background: "#333",
          color: "#fff",
        },
      },
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const baseUrl = `${API_URL}/api/products`;
        const url = search ? `${baseUrl}?search=${search}` : baseUrl;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }

        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        toast.error("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, refreshVersion, API_URL]);

  // Exportar deleteProduct
  return {
    products,
    loading,
    error,
    search,
    setSearch,
    refreshProducts,
    deleteProduct,
  };
}
