let imgPlayer =[];


//Modal para Instrucciones de Juego
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

//Paso 2.1 Creando clase para seleccionar male/female
function maleSelector() {
  var selectMale =document.getElementById("div-male");
  var selectFemale =document.getElementById("div-female");
  
  if (selectMale.style.display === "none") {
      selectMale.style.display = "block";
      selectFemale.style.display = "none";
  } else {
      selectMale.style.display = "none";
      selectFemale.style.display = "none";
  }
}

function femaleSelector() {
  var selectMale =document.getElementById("div-male");
  var selectFemale =document.getElementById("div-female");
  
  if (selectFemale.style.display === "none") {
      selectFemale.style.display = "block";
      selectMale.style.display = "none";
  } else {
      selectFemale.style.display = "none";
      selectMale.style.display = "none";
  }
}


//Paso 2.2 Seleccionando personaje y almacenando localmente



function characterSelector(element) {
/*   var elfMale =document.getElementById("elf-male");
  var wizardMale =document.getElementById("wizard-male");
  var knightMale =document.getElementById("knight-male");
  var cyborgMale =document.getElementById("cyborg-male"); */

  if(element==='elf-males') {
    imgPlayer = "./images/elf-male-der.png";
    sessionStorage.setItem("personaje",imgPlayer);
  }
  
  if(element==='wizard-males') {
    imgPlayer = "./images/wizard-male-der.png";
    sessionStorage.setItem("personaje",imgPlayer);
  } 
  if(element==='knight-males') {
    imgPlayer = "./images/knifemale.png";
    sessionStorage.setItem("personaje",imgPlayer);
  }
  if(element==='cyborg-males') {
    imgPlayer = "./images/shooter-male-der.png";
    sessionStorage.setItem("personaje",imgPlayer);
  }
  if(element==='elf-females') {
    imgPlayer = "./images/elf-female-der.png";
    sessionStorage.setItem("personaje",imgPlayer);
  } 

  if(element==='wizard-females') {
    imgPlayer = "./images/wizard-female-der.png";
    sessionStorage.setItem("personaje",imgPlayer);
  }
  if(element==='knight-females') {
    imgPlayer = "./images/knife-female.png";
    sessionStorage.setItem("personaje",imgPlayer);
  } 
  if(element==='cyborg-females') {
    imgPlayer = "./images/shooter-female-der.png";
    sessionStorage.setItem("personaje",imgPlayer);
  } 
}