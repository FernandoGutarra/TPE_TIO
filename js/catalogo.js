"use strict"
const url = "https://60d912e0eec56d00174775c6.mockapi.io/libros";

async function loadLibros() {
    try {
        let response = await fetch(url);
        if (response.ok) {
            elementos = await response.json();
            mostrarElementos();
        } else {
            console.log("Error - Failed URL!");
        }
    } catch (error) {
        console.log("Connection error");
    }
}

let elementos = [

];
mostrarElementos();

async function enviar_arreglo() {
    try {
        let renglon = {
            titulo: titulo.value,
            autor: autor.value,
            editorial: editorial.value,
            anio: parseInt(anio.value),
        }
        let respuesta = await fetch(url, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(renglon)
        });
        if (respuesta.ok) {
            elementos.push(renglon);

            mostrarElementos();
        } else {
            mensaje.innerHTML = 'Recuerde completar todos los campos.';

        }
    } catch (error) {
        console.log("Error: " + error);
    }
    //elementos push muestra

}
function borrar_arreglo() {
    let tam = elementos.length;
    if (tam > 1) {
        for (let i = 1; i < tam; i++) {
            elementos.pop();
        }
        mostrarElementos();

    }

}
function mostrarElementos() {
    let tabla = document.getElementById("tabla_dinamica");
    tabla.innerHTML = "";
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].anio == 90) {
            tabla.innerHTML +=
                `<tr class="resaltado">
                    <td> ${elementos[i].titulo}</td>
                    <td> ${elementos[i].autor} </td>
                    <td> ${elementos[i].editorial} </td>
                    <td> ${elementos[i].anio} </td>
                    <td> <button class="editar" id="${elementos[i].id}">Editar</button> </td>
                    <td> <button class="borrar" id="${elementos[i].id}">Borrar</button> </td>
                    </tr>`
        }
        else {
            tabla.innerHTML += `<tr>
                    <td> ${elementos[i].titulo}</td>
                    <td> ${elementos[i].autor} </td>
                    <td> ${elementos[i].editorial} </td> 
                    <td> ${elementos[i].anio} </td>
                    <td> <button class="editar" id="${elementos[i].id}">Editar</button> </td>
                    <td> <button class="borrar" id="${elementos[i].id}">Borrar</button> </td>
    
                </tr>`
        }
    }
    //Se le asigna los eventos a los botones
    let botonesBorrar = document.querySelectorAll(".borrar");
    botonesBorrar.forEach(e => {
        e.addEventListener("click", btnBorrarClick);
    });

    let botonesEditar = document.querySelectorAll(".editar");
    botonesEditar.forEach(e => {
        e.addEventListener("click", btnEditarClick);
    });

}
//Se borra una noticia
function mostrarx3_arreglo() {
    for (let j = 0; j < 3; j++) {
        enviar_arreglo();

    }

}
loadLibros();

//Se borra una noticia
async function btnBorrarClick() {
    let id = this.id
    console.log(id);
    try {
        let response = await fetch(`${url}/${id}`, {
            'method': "DELETE",
        });

        if (response.ok) {
            loadLibros();
            console.log(`Elemento borrado ${id}`);
        } else {
            console.log("No se pudo borrar");
        }
    } catch (error) {
        console.log("Error: " + error);
    }

}

//Se actualiza una noticia
async function btnEditarClick() {
    let id = this.id;
    try {
        let renglon = {
            titulo: titulo.value,
            autor: autor.value,
            editorial: editorial.value,
            anio: parseInt(anio.value),
        }

        let response = await fetch(`${url}/${id}`, {
            'method': "PUT",
            'headers': {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(renglon)
        });

        if (response.ok) {
            loadLibros();
            console.log("Actualizado");
        } else {
            console.log("Error");
        }
    } catch (error) {
        console.log("Error: " + error);
    }
}
function mostrar_decada() {
    
    let tabla = document.getElementById("tabla_dinamica");
    tabla.innerHTML = "";
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].anio <= parseInt(document.querySelector("[id=anio]").value)) {
            tabla.innerHTML =
                `<tr>
                    <td> ${elementos[i].titulo}</td>
                    <td> ${elementos[i].autor} </td>
                    <td> ${elementos[i].editorial} </td>
                    <td> ${elementos[i].anio} </td>
                    <td> <button class="editar" id="${elementos[i].id}">Editar</button> </td>
                    <td> <button class="borrar" id="${elementos[i].id}">Borrar</button> </td>
                    </tr>`
        }
    }
    console.log(elementos);
}

document.getElementById("btn-enviar").addEventListener('click', enviar_arreglo);
document.getElementById("btn-borrar").addEventListener('click', borrar_arreglo);
document.getElementById("btn-cargar").addEventListener('click', mostrarx3_arreglo);
document.getElementById("btn-decada").addEventListener('click', mostrar_decada);
