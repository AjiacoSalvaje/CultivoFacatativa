// Lista de productos (5 frutas y 5 verduras) con precios en pesos colombianos (COP)
const productos = [
  // Frutas
  { nombre: 'Manzanas', precio: 8000, imagen: 'https://th.bing.com/th/id/OIP.MzUnr860GKPa0J3v96sicgHaFj?rs=1&pid=ImgDetMain' },     // Precio por kg
  { nombre: 'Plátanos', precio: 5000, imagen: 'https://th.bing.com/th/id/OIP.vW4iMLzWb4n7eJ8IpHT3UAHaFj?rs=1&pid=ImgDetMain' },     // Precio por kg
  { nombre: 'Fresas', precio: 12000, imagen: 'https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/article_1200_800_fallback/public/2022-04/fresas%C2%A9iStock.jpg?itok=iBcd_HLd' },      // Precio por kg
  { nombre: 'Naranjas', precio: 7000, imagen: 'https://elcampesino.co/wp-content/uploads/2015/03/Naranjas.jpg' },     // Precio por kg
  { nombre: 'Uvas', precio: 10000, imagen: 'https://th.bing.com/th/id/OIP.pxR1WpT9QADVJm2k5KJV_gHaE8?rs=1&pid=ImgDetMain' },        // Precio por kg

  // Verduras
  { nombre: 'Zanahorias', precio: 4500, imagen: 'https://th.bing.com/th/id/R.423c950148ce4029ce08f8230b619dbc?rik=idQhlt%2f9vZPvwg&riu=http%3a%2f%2fwww.vidamediterranea.es%2fwp-content%2fuploads%2f2018%2f05%2fzanahorias3.jpg&ehk=NHtWhVcTN5jDsneW6MkeFJRzu8aJ2RUb%2ftkaV0tOBMc%3d&risl=1&pid=ImgRaw&r=0' },   // Precio por kg
  { nombre: 'Brócoli', precio: 7000, imagen: 'https://th.bing.com/th/id/R.cd1ee4210df7a578c3d99360d3a82e43?rik=7cd9pCJoTGFlkQ&pid=ImgRaw&r=0' },      // Precio por kg
  { nombre: 'Espinacas', precio: 6000, imagen: 'https://i.blogs.es/9b66d6/espinacas/1366_2000.jpg' },    // Precio por kg
  { nombre: 'Pepinos', precio: 3500, imagen: 'https://www.infoescola.com/wp-content/uploads/2010/08/pepino_769056490.jpg' },      // Precio por kg
  { nombre: 'Tomates', precio: 6500, imagen: 'https://th.bing.com/th/id/R.fc831af5ff51d3336c2e18cc08e0f286?rik=w6tEUvsFdMXkOg&pid=ImgRaw&r=0' }       // Precio por kg
];

// Array para almacenar los productos en el carrito
let carrito = [];

// Función para renderizar productos en la página
function mostrarProductos() {
  const productosGrid = document.querySelector('.productos-grid');
  productos.forEach((producto, index) => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto-item');
    productoDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio.toLocaleString('es-CO')} COP / kg</p>
      <button class="add-to-cart" data-index="${index}">Añadir al carrito</button>
    `;
    productosGrid.appendChild(productoDiv);
  });
}

// Función para añadir productos al carrito
function agregarAlCarrito(index) {
  const producto = productos[index];
  carrito.push(producto);
  actualizarCarrito();
}

// Función para actualizar la vista del carrito y calcular el total
function actualizarCarrito() {
  const carritoDiv = document.querySelector('.carrito');
  carritoDiv.innerHTML = ''; // Limpia el contenido actual
  let total = 0;

  if (carrito.length === 0) {
    carritoDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
  } else {
    carrito.forEach((producto, i) => {
      total += producto.precio;
      const productoCarrito = document.createElement('div');
      productoCarrito.classList.add('producto-carrito');
      productoCarrito.innerHTML = `
        <p>${producto.nombre} - $${producto.precio.toLocaleString('es-CO')} COP / kg</p>
        <button class="remove-from-cart" data-index="${i}">Eliminar</button>
      `;
      carritoDiv.appendChild(productoCarrito);
    });

    // Mostrar el total a pagar
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `<h3>Total: $${total.toLocaleString('es-CO')} COP</h3>`;
    carritoDiv.appendChild(totalDiv);

    // Botón de "Comprar"
    const comprarBtn = document.createElement('button');
    comprarBtn.classList.add('comprar-btn');
    comprarBtn.innerText = 'Comprar';
    carritoDiv.appendChild(comprarBtn);

    // Acción al hacer clic en el botón "Comprar"
    comprarBtn.addEventListener('click', () => {
      alert(`Gracias por tu compra. El total a pagar es $${total.toLocaleString('es-CO')} COP`);
      carrito = []; // Limpiar el carrito
      actualizarCarrito(); // Actualizar la vista del carrito
    });
  }
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Event listeners
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    const index = event.target.getAttribute('data-index');
    agregarAlCarrito(index);
  }

  if (event.target.classList.contains('remove-from-cart')) {
    const index = event.target.getAttribute('data-index');
    eliminarDelCarrito(index);
  }
});

// Inicializar productos en la página
mostrarProductos();
