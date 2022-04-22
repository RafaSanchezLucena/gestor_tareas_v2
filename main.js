const dragArea = document.querySelector("#dragArea");
const cbox1 = document.querySelector("#presencial");
const cbox2 = document.querySelector("#telefono");
const botonNueva = document.querySelector("#nueva");
const botonLimpiar = document.querySelector("#limpiar");
const contenedor = document.querySelector(".contenedor__notas");
const campo1 = document.querySelector(".campo1");
const campo2 = document.querySelector(".campo2");
const lista = document.querySelector(".lista");
const textoArea = document.querySelector(".text__area");
const botonCerrar = document.querySelector(".boton__cerrar");


var data = [];

// Esta función se ejecuta al iniciar la aplicación y carga los datos del loscalStorage.
const cargarInicial = () => {
  const datos = JSON.parse(localStorage.getItem("notas"));
  if (datos != undefined) { // Comprueba si el array contiene datos y los carga.
    const cita = datos.map((elemento, index) => /*html*/ `<div class="nota">
          <p class="parrafo"><strong>Nombre: </strong>${elemento.solicitante}</p>
          <p class="parrafo"><strong>Cita con: </strong>${elemento.destinatario}</p>
          <p class="parrafo"><strong>Acerca de: </strong>${elemento.tema}</p>
          <p class="parrafo"><strong>Presencial: </strong>${elemento.presencial}</p>
          <p class="parrafo"><strong>Por teléfono: </strong>${elemento.telefono}</p>
          <p class="parrafo"><strong>Nº teléfono: </strong>${elemento.numero}</p>
          <div class="contenedor__boton">
            <button onclick="cerrarNota(${index})" class="boton__cerrar">x</button>
          </div>
        </div>`);
    contenedor.insertAdjacentHTML("beforeend", cita);
    datos.forEach(elemento => data.push(elemento)); // Añade al array los datos del localStorage.
  } 
};

cargarInicial();

Sortable.create(dragArea, {
  animation: 200,
});

cbox1.addEventListener("change", () => {
  if (cbox1.checked) {
    cbox1.value = "Sí";
    cbox2.value = "No";
  }
});

cbox2.addEventListener("change", () => {
  if (cbox2.checked) {
    cbox2.value = "Sí";
    cbox1.value = "No";
  }
});

// Añade elementos nuevos (notas) en el array e inmediatamente después llama a la función "cargarNota"
// para pintar en pantalla los datos del array.
botonNueva.addEventListener("click", () => {
  let nota = {
    solicitante: campo1.value,
    destinatario: lista.value,
    tema: textoArea.value,
    presencial: cbox1.value,
    telefono: cbox2.value,
    numero: campo2.value,
  };
  data.push(nota);
  cargarNota();
});

const cerrarNota = (valorIndice) => {
  data.splice(valorIndice, 1);
  cargarNota();
};


// Pinta en pantalla todos los datos del array.
const cargarNota = () => {
  contenedor.innerHTML = " ";
  localStorage.setItem("notas", JSON.stringify(data));
  const datos = JSON.parse(localStorage.getItem("notas"));
  const cita = datos.map((elemento, index) => /*html*/ `<div class="nota">
          <p class="parrafo"><strong>Nombre: </strong>${elemento.solicitante}</p>
          <p class="parrafo"><strong>Cita con: </strong>${elemento.destinatario}</p>
          <p class="parrafo"><strong>Acerca de: </strong>${elemento.tema}</p>
          <p class="parrafo"><strong>Presencial: </strong>${elemento.presencial}</p>
          <p class="parrafo"><strong>Por teléfono: </strong>${elemento.telefono}</p>
          <p class="parrafo"><strong>Nº teléfono: </strong>${elemento.numero}</p>
          <div class="contenedor__boton">
            <button onclick="cerrarNota(${index})" class="boton__cerrar">x</button>
          </div>
        </div>`);
  contenedor.insertAdjacentHTML("beforeend", cita);
};

// Al presionar el botón "limpiar" se limpian todos los campos.
botonLimpiar.addEventListener("click", () => {
  campo1.value = "";
  campo2.value = "";
  textoArea.value = "";
  cbox1.checked = false; // Desactiva el check
  cbox2.checked = false;
  cbox1.value = " ";
  cbox2.value = " ";
  campo2.value = "";
  lista.value = "Toni";
});