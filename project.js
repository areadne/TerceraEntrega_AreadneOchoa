const productos = [
  { id: 1, producto: "Labial en barra (rojo)", precio: 2500, stock: 10 },
  { id: 2, producto: "Labial en barra (burdeos)", precio: 2500, stock: 2 },
  { id: 3, producto: "Labial en barra (rosa)", precio: 2500, stock: 12 },
  { id: 4, producto: "Labial liquido (durazno)", precio: 3500, stock: 2 },
  { id: 5, producto: "Labial liquido (rojo)", precio: 3500, stock: 8 },
  { id: 6, producto: "Labial liquido (rosa)", precio: 3500, stock: 0 },
  { id: 7, producto: "Rubor en polvo (tres colores)", precio: 15000, stock: 6 },
  { id: 8, producto: "Rubor en polvo (dos colores)", precio: 10000, stock: 0 },
  { id: 9, producto: "Rubor en barra (rosa)", precio: 25000, stock: 3 },
  { id: 10, producto: "Rubor en barra (durazno)", precio: 25000, stock: 0 },
  {
    id: 11,
    producto: "Rubor en barra (marron)",
    precio: 25000,
    stock: 1,
  },
  { id: 12, producto: "Corrector de ojeras (claro)", precio: 20000, stock: 4 },
  { id: 13, producto: "Corrector de ojeras (medio)", precio: 20000, stock: 0 },
  {
    id: 14,
    producto: "Sombras para contornear rostro",
    precio: 16000,
    stock: 5,
  },
  { id: 15, producto: "Iluminador", precio: 12000, stock: 8 },
  {
    id: 16,
    producto: "Mascara para pestañas (transparente)",
    precio: 20000,
    stock: 14,
  },
];

let ingresarPrecio = document.getElementById("precio");
let ingresarStock = document.getElementById("stock");
let boton = document.getElementById("boton");
let botonActualizarPrecio = document.getElementById("botonActualizarPrecio");
let contenedorMenu = document.getElementById("menu");
let contenerdorTabla = document.getElementById("contenedorTabla");
let botonConsultar = document.getElementById("botonConsultar");
let contenedorBotonConsultar = document.getElementById(
  "contenedorBotonConsultar"
);

const productosIngresadosPorUsuario = [];

//Inicio: Creación de menú de opciones
const arrayDeProductos = [];

for (const producto of productos) {
  arrayDeProductos.push(producto.producto);
}

console.log(arrayDeProductos);

let menu = document.createElement("select");
menu.id = "producto";
menu.innerHTML = `
<option>${arrayDeProductos[0]}</option>
<option>${arrayDeProductos[1]}</option>
<option>${arrayDeProductos[2]}</option>
<option>${arrayDeProductos[3]}</option>
<option>${arrayDeProductos[4]}</option>
<option>${arrayDeProductos[5]}</option>
<option>${arrayDeProductos[6]}</option>
<option>${arrayDeProductos[7]}</option>
<option>${arrayDeProductos[8]}</option>
<option>${arrayDeProductos[9]}</option>
<option>${arrayDeProductos[10]}</option>
<option>${arrayDeProductos[11]}</option>
<option>${arrayDeProductos[12]}</option>
<option>${arrayDeProductos[13]}</option>
<option>${arrayDeProductos[14]}</option>
<option>${arrayDeProductos[15]}</option>`;
contenedorMenu.append(menu);

console.log(productos);
//Fin: Creación de menú de opciones

botonConsultar.onclick = () => {
  botonConsultarDatos();
};

let tablaConsultar = document.createElement("table");
tablaConsultar.id = "TablaConsultar";

function botonConsultarDatos() {
  for (const producto of productos) {
    if (menu.value == producto.producto) {
      tablaConsultar.innerHTML = `
                      <tbody>
                      <tr>
                      <th>${"Producto"}</th>
                      <th>${"Precio"}</th>
                      <th>${"Stock"}</th>
                  </tr>
                      <tr>
                      <td>${producto.producto}</td>
                      <td>${producto.precio}</td>
                      <td>${producto.stock}</td>
                      </tr>
                      </tbody>`;
    }
  }
  contenedorBotonConsultar.append(tablaConsultar);
}

// Inicio: traer información del LS

let datosEnLS = JSON.parse(localStorage.getItem("datos"));
let contenedorTablaLS = document.getElementById("contenedorTablaLS");

if (datosEnLS) {
  console.log(datosEnLS);

  for (const item of datosEnLS) {
    let tablaLS = document.createElement("table");
    tablaLS.id = "TablaLS";

    tablaLS.innerHTML = `
        <tbody>
        <tr>
        <td>${item.producto}</td>
        <td>${item.precio}</td>
        <td>${item.stock}</td>
        </tr>
        </tbody>`;
    contenedorTablaLS.append(tablaLS);
  }
}

// Fin: traer información del LS

boton.onclick = () => {
  ingresarProductoNuevo();
  guardarEnLS();
};

function ingresarProductoNuevo() {
  for (const producto of productos) {
    if (menu.value == producto.producto) {
      let sumaDeStock = producto.stock + Number(ingresarStock.value);
      producto.stock = sumaDeStock;

      let tabla = document.createElement("table");
      tabla.id = "tabla";

      tabla.innerHTML = `
      <tbody>
      <tr>
      <td>${menu.value}</td>
      <td>${producto.precio}</td>
      <td>${producto.stock}</td>
      </tr>
      </tbody>
      `;

      contenerdorTabla.append(tabla);

      productosIngresadosPorUsuario.push({
        producto: menu.value,
        precio: producto.precio,
        stock: producto.stock,
      });
      console.log(productosIngresadosPorUsuario);
    }
  }
  console.log(productos);
}

botonActualizarPrecio.onclick = () => {
  actualizarPrecio();
};

function actualizarPrecio() {
  for (const producto of productos) {
    if (menu.value == producto.producto) {
      producto.precio = Number(ingresarPrecio.value);

      let tabla = document.createElement("table");
      tabla.id = "tablaPrecio";

      tabla.innerHTML = `
      <tbody>
      <tr>
      <td>${menu.value}</td>
      <td>${producto.precio}</td>
      <td>${producto.stock}</td>
      </tr>
      </tbody>
      `;

      contenerdorTabla.append(tabla);

      productosIngresadosPorUsuario.push({
        producto: menu.value,
        precio: producto.precio,
        stock: producto.stock,
      });
    }
  }
}

function guardarEnLS() {
  let enviarProductoLSJSON = JSON.stringify(productosIngresadosPorUsuario);

  localStorage.setItem("datos", enviarProductoLSJSON);
}

console.log(productosIngresadosPorUsuario);
