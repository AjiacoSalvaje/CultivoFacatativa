import { expect } from 'chai';
import { JSDOM } from 'jsdom';

// Simular el DOM
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div class="productos-grid"></div>
      <div class="carrito"></div>
    </body>
  </html>
`);

global.window = dom.window;
global.document = dom.window.document;

const { agregarAlCarrito, eliminarDelCarrito, carrito } = await import('../script.js');

global.window = dom.window;
global.document = dom.window.document;

describe('Funcionalidades del Carrito', () => {
  beforeEach(() => {
    carrito.length = 0; 
  });

  it('Debería agregar un producto al carrito', () => {
    agregarAlCarrito(0);
    expect(carrito).to.have.lengthOf(1);
  });

  it('Debería eliminar un producto del carrito', () => {
    agregarAlCarrito(0);
    eliminarDelCarrito(0);
    expect(carrito).to.be.empty;
  });

  it('El total debería calcularse correctamente', () => {
    agregarAlCarrito(0); 
    agregarAlCarrito(1); 
    const total = carrito.reduce((sum, p) => sum + p.precio, 0);
    expect(total).to.equal(13000);
  });
});