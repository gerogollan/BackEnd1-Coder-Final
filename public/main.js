
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  if (!form) {
    console.error('No se encontró el formulario con id="productForm"');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    console.log("formulario recibido y enviado");

    const formData = new FormData(event.target);
    const productData = {};

    formData.forEach((value, key) => {
      productData[key] = value;
    });

    // Convertir thumbnails a array
    if (productData.thumbnails) {
      if (productData.thumbnails.indexOf(',') !== -1) {
        productData.thumbnails = productData.thumbnails.split(',').map(s => s.trim());
      } else {
        productData.thumbnails = [productData.thumbnails];
      }
    } else {
      productData.thumbnails = [];
    }

    // Convertir price y stock a número
    productData.price = Number(productData.price);
    productData.stock = Number(productData.stock);

    try {
      console.log("Datos del producto a enviar:", productData);

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        console.log('Producto agregado:', newProduct);
      } else {
        // Manejo robusto de error
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          console.error('Error al agregar el producto:', json.error);
          alert('Error: ' + json.error);
        } catch (err) {
          console.error('Respuesta no válida:', text);
          alert('Error desconocido al agregar el producto');
        }
      }
    } catch (error) {
      alert('Hubo un error al intentar agregar el producto');
      console.error(error);
    }

    form.reset();
  });

});


// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('productForm');
//   if (!form) {
//     console.error('No se encontró el formulario con id="productForm"');
//     return;
//   }

//   const socket = io();

//   form.addEventListener('submit', async (event) => {
//     event.preventDefault();  

//    console.log("formulario recibido y enviado");
   

//     const formData = new FormData(event.target);
//     const productData = {};
  
//     formData.forEach((value, key) => {
//       productData[key] = value;
//     });
  
//     // Convertir thumbnails a array si es string
//     if (productData.thumbnails) {
//       if (productData.thumbnails.indexOf(',') !== -1) {
//         productData.thumbnails = productData.thumbnails.split(',').map(s => s.trim());
//       } else {
//         productData.thumbnails = [productData.thumbnails];
//       }
//     } else {
//       productData.thumbnails = [];
//     }
  
//     try {
//       console.log("Datos del producto a enviar:", productData);
      
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//       });
  
//       if (response.ok) {
//         const newProduct = await response.json();
//         console.log('Producto agregado:', newProduct);
//         // Emitir evento a través del socket
//         socket.emit("new-product", productData);
//       } else {
//         const error = await response.json();
//         console.error('Error al agregar el producto: ' + error.error);
//       }
//     } catch (error) {
//       alert('Hubo un error al intentar agregar el producto');
//       console.error(error);
//     }

//     form.reset();
//   });

//   socket.on('message', (data) => {
//     console.log("mensaje del servidor:" + data);
//   });
// });



// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('form');
//   if (!form) {
//     console.error('No se encontró el formulario con id="form"');
//     return;
//   }

//   form.addEventListener('submit', async (event) => {
//     event.preventDefault(); 
    
//     const formData = new FormData(event.target);
//     const productData = {};
  
//     formData.forEach((value, key) => {
//       productData[key] = value;
//     });
  
//     console.log('Datos del formulario:', productData);
  
//     if (productData.thumbnails && productData.thumbnails.indexOf(',') !== -1) {
//       productData.thumbnails = productData.thumbnails.split(',');
//     } else {
//       productData.thumbnails = [productData.thumbnails];
//     }
  
//     try {
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//       });
  
//       if (response.ok) {
//         const newProduct = await response.json();
//         // alert('Producto agregado correctamente');
//         console.log(newProduct);
//       } else {
//         const error = await response.json();
//         console.log('Error al agregar el producto: ' + error.error);
//       }
//     } catch (error) {
//       alert('Hubo un error al intentar agregar el producto');
//       console.error(error);
//     }

    
//     socket.emit("new-product", product)
//     form.reset()
//   });
// });


// const socket = io();

// socket.on('message', (data) => {
//   console.log("mensaje del servidor:" + data)
// });