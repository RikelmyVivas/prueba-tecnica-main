import { useState } from "react";
import { useProducts, type Product } from "./hooks/useProducts";
import { ProductForm } from "./components/ProductForm";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ShoppingBag,
  PackageOpen,
  AlertCircle,
  Loader2,
} from "lucide-react";

function App() {
  const {
    products,
    loading,
    error,
    search,
    setSearch,
    refreshProducts,
    deleteProduct,
  } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Navbar Superior */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Inventario de Productos
              </span>
            </div>

            <button
              onClick={handleCreate}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center gap-2 text-sm shadow-lg shadow-slate-900/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {/* Barra de Herramientas (Buscador) */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              placeholder="Buscar productos por nombre, categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Modal del Formulario */}
        {isFormOpen && (
          <ProductForm
            onSuccess={refreshProducts}
            onClose={() => setIsFormOpen(false)}
            productToEdit={editingProduct}
          />
        )}

        {/* Estado de Carga */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-fade-in">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-600" />
            <p className="font-medium">Cargando inventario...</p>
          </div>
        )}

        {/* Estado de Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700 max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Catalogo de Productos */}
        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
                  >
                    {/* Contenedor de Imagen */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x300?text=Sin+Imagen")
                        }
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-slate-700 shadow-sm backdrop-blur-sm border border-slate-200">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3
                          className="font-semibold text-slate-900 text-lg leading-tight line-clamp-1"
                          title={product.name}
                        >
                          {product.name}
                        </h3>
                        <span className="font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 text-sm whitespace-nowrap">
                          ${product.price}
                        </span>
                      </div>

                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                        {product.description}
                      </p>

                      {/* Acciones */}
                      <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                          Editar
                        </button>

                        <button
                          onClick={() => setProductToDelete(product)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PackageOpen className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">
                  No hay productos
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                  No hemos encontrado productos que coincidan con tu búsqueda.
                </p>
                <button
                  onClick={handleCreate}
                  className="text-blue-600 font-medium hover:text-blue-700 flex items-center justify-center gap-1 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  Crear el primer producto
                </button>
              </div>
            )}
            {/* Modal de Confirmación (Eliminar) */}
            <DeleteConfirmModal
              isOpen={!!productToDelete}
              onClose={() => setProductToDelete(null)}
              onConfirm={async () => {
                if (productToDelete) {
                  await deleteProduct(productToDelete.id);
                  setProductToDelete(null);
                }
              }}
              productName={productToDelete?.name || ""}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
