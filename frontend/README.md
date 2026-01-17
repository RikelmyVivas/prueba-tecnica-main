# 🛒 InventoryPro - Frontend

Aplicación web moderna para la gestión de inventario de productos. Desarrollada como parte de la Prueba Técnica Frontend.

![Status](https://img.shields.io/badge/Status-Completed-success)
![Tech](https://img.shields.io/badge/Stack-React_TS_Tailwind-blue)

## 🚀 Tecnologías y Características

Este proyecto fue construido utilizando un stack moderno y enfocado en el rendimiento y la experiencia de usuario (UX):

* **Core:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Build ultra-rápido).
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto para mayor robustez).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Diseño responsive y sistema de diseño utility-first).
* **Iconografía:** [Lucide React](https://lucide.dev/) (Iconos SVG consistentes y ligeros).
* **Gestión de Estado:** Custom Hooks (`useProducts`) para lógica de negocio separada de la UI.
* **Runtime:** [Bun](https://bun.sh/) (Gestor de paquetes y runtime de alto rendimiento).

### ✨ Funcionalidades Implementadas (CRUD Completo)

* ✅ **Listado de Productos:** Vista en grid con diseño de tarjetas responsivas.
* ✅ **Buscador en Tiempo Real:** Filtrado instantáneo por nombre, categoría o descripción (con *debounce* para optimizar llamadas a API).
* ✅ **Crear Productos:** Formulario modal validado para añadir nuevos ítems.
* ✅ **Editar Productos:** Reutilización inteligente del formulario para actualizar datos existentes.
* ✅ **Eliminar Productos:** Modal de confirmación para prevenir borrados accidentales (UX mejorada).
* ✅ **Feedback Visual:** Indicadores de carga (Spinners), estados vacíos (Empty States) y mensajes de error amigables.

---

## 🛠️ Instrucciones de Instalación

Asegurarse de tener instalado **Bun** (o Node.js en su defecto) y que el **Backend** esté corriendo en el puerto `3000`.

1.  **Clonar el repositorio y entrar a la carpeta:**
    ```bash
    cd frontend
    ```

2.  **Instalar dependencias:**
    Usamos `bun` para una instalación rápida, pero `npm` también funciona.
    ```bash
    bun install
    # o si usas npm: npm install
    ```
---

## ▶️ Ejecución en Desarrollo

Para iniciar el servidor de desarrollo local:

```bash
bun run dev
# o: npm run dev

Hecho por Rikelmy Aldubi Vivas Nieto para la Prueba Técnica.