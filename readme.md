# 🛒 E-commerce Backend con Express y MongoDB

Este proyecto es una implementación de un backend completo para una tienda online. Desarrollado con Node.js, Express y MongoDB, incluye funcionalidades para gestionar productos, carritos de compra, vistas dinámicas y persistencia de datos utilizando Mongoose.

---

## 🚀 Tecnologías utilizadas

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Handlebars  
- JavaScript moderno (ES Modules)

---

## 📂 Instalación y ejecución

1. Cloná el repositorio:

```bash
git clone https://github.com/usuario/mi-proyecto-ecommerce.git
cd mi-proyecto-ecommerce
```
Instalá las dependencias:

```bash
npm install
```
Iniciá el servidor:

```bash
npm run dev
```

#🧪 Uso de la API y vistas
1. Vista pública de productos
URL: http://localhost:8080/

![image](https://github.com/user-attachments/assets/ecdae4ad-329a-42bb-ab80-b5f374895b5d)


Muestra todos los productos con paginación, ordenamiento y filtros por categoría o estado.

Incluye un formulario para agregar nuevos productos.

Cada producto es clickeable y lleva a la vista detalle.

2. Vista detalle de producto
URL: http://localhost:8080/product/:pid


![image](https://github.com/user-attachments/assets/a9581df1-c231-4361-89f1-eac7fa80a9de)


Muestra información completa del producto seleccionado, incluyendo fotos (thumbnails), precio, stock y descripción.

Permite agregar o quitar unidades del producto al carrito.

3. API productos
Base URL: /api/products

![image](https://github.com/user-attachments/assets/018d8319-ffaf-481c-b032-8c5e4d6e4725)


GET /api/products
Devuelve un array paginado de productos con soporte para query params:

limit: cantidad de productos por página

page: número de página

query: categoría o estado (ejemplo: query=ropa o query=true)

sort: asc o desc por precio

Ejemplo:

```bash
GET http://localhost:8080/api/products?limit=5&page=2&query=ropa&sort=desc
GET /api/products/:pid
```
Obtener producto por ID.

POST /api/products
Crear un nuevo producto (se valida que el código sea único).

DELETE /api/products/:pid
Eliminar un producto por ID.

4. Vista carrito
URL: /api/carts/:cid

Muestra el carrito con todos los productos agregados.

![image](https://github.com/user-attachments/assets/759f02ae-3f95-41a0-aa27-0953a4fd01c5)


Incluye botones para aumentar, disminuir hasta eliminar el producto del carrito.

5. API carritos
POST /api/carts
Crear un nuevo carrito vacío.

GET /api/carts/:cid
Obtener productos de un carrito (con detalles completos).

POST /api/carts/:cid/products/:pid
Agregar un producto al carrito.

PUT /api/carts/:cid
Reemplazar todo el carrito con un nuevo array de productos, ejemplo:

```json
{
  "products": [
    { "product": "664b93698cdabc6fc75497b2", "quantity": 2 }
  ]
}
```
PUT /api/carts/:cid/products/:pid
Modificar la cantidad de un producto específico:

```json
{ "quantity": 5 }
```
DELETE /api/carts/:cid/products/:pid
Eliminar un producto específico del carrito.

DELETE /api/carts/:cid
Vaciar completamente el carrito.

✅ Validaciones y manejo de errores
Todos los endpoints contemplan errores comunes (datos faltantes, ID inválido, código duplicado, etc.).

Las respuestas incluyen mensajes claros y estados HTTP apropiados.

Se evita la caída del servidor ante errores fatales.

🧑‍💻 Autor
Desarrollado por Gerónimo como entrega final del curso de Backend - Coderhouse
📅 Mayo 2025
📩 Contacto disponible por GitHub o LinkedIn

📌 Notas finales
La lógica de negocio sigue la estructura vista durante el curso.

La persistencia se realiza exclusivamente en MongoDB.

Las vistas están pensadas como herramienta auxiliar para validar el funcionamiento.

La gestión de imágenes permite cargar varias fotos (thumbnails) por producto y se renderizan en la vista detalle.

¡Gracias por visitar este proyecto! 🙌
Probalo, exploralo y sentite libre de dejar feedback ⭐
