document.addEventListener("DOMContentLoaded",function (event){ 
// Variables 

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];


// Funciones

const CrearItem = (actividad) => {

  let item = {
    actividad: actividad,
    estado: false
  }

  arrayActividades.push(item);

  return item;

}

const GuardarDB = () => {

  localStorage.setItem('activity', JSON.stringify(arrayActividades));

  PintarDB();

}

const PintarDB = () => {

  listaActividadesUI.innerHTML = '';

  arrayActividades = JSON.parse(localStorage.getItem('activity'));
  
  if(arrayActividades === null){
    arrayActividades = [];
  }else{

    arrayActividades.forEach(element => {

      if(element.estado){
        listaActividadesUI.innerHTML += `<div class="alert alert-success d-flex justify-content-between" role="alert"><i class="fa-solid fa-thumbtack"></i><b>${element.actividad}</b> <span class="float-right"><i class="material-icons ">done</i><i class="material-icons">delete</i></span></div>`
    }else{
      listaActividadesUI.innerHTML += `<div class="alert alert-warning bg-opacity-50 d-flex justify-content-between" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> <span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
    }
    });

  }
}

const EliminarDB = (actividad) => {
  let indexArray;
  arrayActividades.forEach((elemento, index) => {
    
    if(elemento.actividad === actividad){
      indexArray = index;
    }
    
  });

  arrayActividades.splice(indexArray,1);
  GuardarDB();

}

const EditarDB = (actividad) => {

  let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);

  arrayActividades[indexArray].estado = true;

  GuardarDB();

}


// EventListener

formularioUI.addEventListener('submit', (e) => {

  e.preventDefault();
  let actividadUI = document.querySelector('#actividad').value;

  CrearItem(actividadUI);
  GuardarDB();

  formularioUI.reset();

});

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadesUI.addEventListener('click', (e) => {

  e.preventDefault();

  if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
    let texto = e.path[2].childNodes[1].innerHTML;
    if(e.target.innerHTML === 'delete'){
      EliminarDB(texto);
    }
    if(e.target.innerHTML === 'done'){
      EditarDB(texto);
    }
  }

});
});
