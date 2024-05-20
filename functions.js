const guardarContacto = (db, contacto) => {
  db.setItem(contacto.id, JSON.stringify(contacto));
  window.location.href = window.location.pathname;
};

const cargarContactos = (db, parentNode) => {
  const claves = Object.keys(db);

  parentNode.innerHTML = ""; // Limpiar el contenedor antes de cargar contactos

  if (claves.length === 0) {
    mostrarMensaje(parentNode, "No has agregado ningún contacto");
    return;
  }

  claves.forEach((clave) => {
    const contacto = JSON.parse(db.getItem(clave));
    crearContacto(parentNode, contacto, db);
  });
};

const mostrarMensaje = (parentNode, mensaje) => {
  const mensajeElemento = document.createElement("p");
  mensajeElemento.textContent = mensaje;
  parentNode.appendChild(mensajeElemento);
};

const crearContacto = (parentNode, contacto, db) => {
  const divContacto = document.createElement("div");
  const elementos = ["nombre", "numero", "direccion"];

  elementos.forEach((elemento) => {
    const elementoContacto = document.createElement(
      elemento === "nombre" ? "h3" : "p"
    );
    elementoContacto.textContent = contacto[elemento];
    divContacto.appendChild(elementoContacto);
  });

  const iconoBorrar = document.createElement("span");
  iconoBorrar.innerHTML = "delete_forever";
  iconoBorrar.classList.add("material-symbols-outlined", "icono");
  iconoBorrar.onclick = () => {
    db.removeItem(contacto.id);
    window.location.href = window.location.pathname;
  };
  divContacto.appendChild(iconoBorrar);

  divContacto.classList.add("tarea");
  parentNode.appendChild(divContacto);
};
