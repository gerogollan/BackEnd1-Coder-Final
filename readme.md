# 🛒 E-commerce Backend con Express y MongoDB

Este proyecto es una implementación de un backend completo para una tienda online. Desarrollado con Node.js, Express y MongoDB, incluye funcionalidades para gestionar productos, carritos de compra, vistas dinámicas y persistencia de datos utilizando Mongoose.

---

## 🚀 Tecnologías utilizadas

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Handlebars  
- Bootstrap (para estilos de las vistas)  
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


🧪 Uso de la API (Postman o similares)
🔹 Productos
GET /api/products
Lista productos con soporte para:

limit: cantidad de productos por página

page: número de página

query: categoría o disponibilidad (por ejemplo, query=category=ropa)

sort: asc o desc (por precio)

Ejemplo:

```bash
GET http://localhost:8080/api/products?limit=5&page=2&query=category=ropa&sort=desc
GET /api/products/:pid
```
Obtener un producto por su ID.

POST /api/products
Crear un nuevo producto.

```json

{
  "title": "Remera Oversize",
  "description": "Remera de algodón",
  "code": "REM123",
  "price": 4500,
  "stock": 50,
  "category": "ropa"
}
```
PUT /api/products/:pid
Actualizar un producto.

DELETE /api/products/:pid
Eliminar un producto.

🔹 Carritos
POST /api/carts
Crear un nuevo carrito vacío.

GET /api/carts/:cid
Obtener todos los productos de un carrito (con populate para mostrar detalles).

POST /api/carts/:cid/products/:pid
Agregar un producto al carrito (por ID).

PUT /api/carts/:cid
Reemplazar todo el carrito con un nuevo array de productos:

```json

{
  "products": [
    {
      "product": "664b93698cdabc6fc75497b2",
      "quantity": 2
    }
  ]
}
```
PUT /api/carts/:cid/products/:pid
Modificar la cantidad de un producto específico:

```json
{
  "quantity": 5
}
```
DELETE /api/carts/:cid/products/:pid
Eliminar un producto específico del carrito.

DELETE /api/carts/:cid
Vaciar completamente el carrito.

💻 Vistas implementadas
🏠 /products - Vista principal de productos
Muestra todos los productos con paginación, ordenamiento y filtros.
🔎 ¡Ideal para navegar por el catálogo!

📸 ![image](https://github.com/user-attachments/assets/44c65a18-38d5-4c39-a3f1-4ee903d1a898)


🛍️ /products/:pid - Detalle de producto
Muestra información completa del producto seleccionado y permite agregarlo al carrito.
✨ ¡Perfecto para ver los detalles antes de comprar!

📸 ![image](https://github.com/user-attachments/assets/51214d60-a28a-461c-851d-3703304a5360)


🛒 /carts/:cid - Vista de carrito
Muestra todos los productos agregados por un usuario en su carrito.
🔧 Incluye botones para sumar, restar y eliminar productos.

     http://localhost:8080/carts/68351493525fa919906781f3
📸 ![image](https://github.com/user-attachments/assets/76208253-d0c9-4e22-adcf-72279cb4e688)


   http://localhost:8080/api/carts/68351493525fa919906781f3
  ![image](https://github.com/user-attachments/assets/e2edaf3b-df3e-4ea7-95a3-f2768b3dd433)



✅ Validaciones y manejo de errores
Todos los endpoints contemplan errores comunes (datos faltantes, ID inválido, etc.)

Las respuestas incluyen mensajes claros y estados HTTP apropiados

Se evita la caída del servidor ante errores fatales

🧑‍💻 Autor
Desarrollado por Gerónimo como entrega final del curso de Backend - Coderhouse
📅 Mayo 2025
📩 Contacto disponible por GitHub o LinkedIn

📌 Notas finales
La lógica de negocio sigue la estructura vista durante el curso.

La persistencia se realiza exclusivamente en MongoDB.

Las vistas están pensadas como herramienta auxiliar para validar el funcionamiento.

¡Gracias por visitar este proyecto! 🙌
Probalo, exploralo y sentite libre de dejar feedback ⭐
