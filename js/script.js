//Paso 1: Conectando el Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var txt = document.getElementById('canvas').getContext("2d");


//Paso 2: Creando variables 
let frames = 0;
let wallCounters = 0;
let requestId = 1;
let movePlayer;
let enemyWalls = [
  {x: 0, y: 0, w: 70, h: 70,isWalk:true}, //arbol inicial
  {x: 75, y: 0, w: 70, h: 70,isWalk:true}, // 2 arboles 
  {x: 150, y: 0, w: 80, h: 55, isWalk:true}, // Ultimo  arbol 
  {x: 0, y: 170, w: 30, h: 70, isWalk:true}, //peñasco para escalera izq
  {x: 70, y: 170, w: 30, h: 70, isWalk:true}, //peñasco para escalera derecha
  {x: 90, y: 140, w: 45, h: 100, isWalk:true}, // 1er peñasco derecha hasta jarrón 
  {x: 135, y: 140, w: 40, h: 65, isWalk:true}, // 1er peñasco derecha hasta limite 
  {x: 160, y: 110, w: 50, h: 70, isWalk:true}, // 2do peñasco derecha hasta limite 
  {x: 200, y: 80, w: 50, h: 115, isWalk:true}, // 4to peñasco derecha hasta limite incluyendo piedra 
  {x: 255, y: 0, w: 55, h: 225, isWalk:true}, // Rio  Sec1 
  {x: 220, y: 210, w: 55, h: 15, isWalk:true}, // Rio  Sec2.1
  {x: 220, y: 265, w: 55, h: 90, isWalk:true}, // Rio  Sec2.2 
  {x: 185, y: 340, w: 55, h: 50, isWalk:true}, // Rio  Sec3
  {x: 115, y: 370, w: 65, h: 50, isWalk:true}, // Rio  Sec4
  {x: 40, y: 280, w: 35, h: 45, isWalk:true}, // Piedra sec Izq  
  {x: 75, y: 300, w: 40, h: 45, isWalk:true}, // Piedra con flores sec Izq  
  {x: 315, y: 0, w: 80, h: 145, isWalk:true}, // Peñasco sec 2  
  {x: 390, y: 0, w: 70, h: 205, isWalk:true}, // Peñasco sec 3
  {x: 500, y: 0, w: 90, h: 205, isWalk:true}, // Peñasco sec 4
  {x: 575, y: 0, w: 90, h: 230, isWalk:true}, // Peñasco sec 5
  {x: 465, y: 140, w: 30, h: 65, isWalk:true}, // Entrada cueva
  {x: 390, y: 335, w: 290, h: 55, isWalk:true}, // Jardin parte baja
  {x: 390, y: 300, w: 160, h: 40, isWalk:true}, // Jardin parte arriba
  {x: 370, y: 200, w: 50, h: 15, isWalk:true}, // aviso entrada cueva
  {x: 440, y: 270, w: 110, h: 55, isWalk:true}, // Arbol parte abajo
  {x: 450, y: 255, w: 90, h: 55, isWalk:true}, // Arbol parte central
 
 ];
let contador = 0;
let sexId;
let imgPlayer = sessionStorage.getItem("personaje");
let vikingArmy = [];
let saxonArmy = [];
let enemyId=0;
let StartId=0;
var potionOneId = document.getElementById("potionone");
var potionTwoId = document.getElementById("potiontwo");
var potionThreeId = document.getElementById("potionthree");
var potionFourId = document.getElementById("potionfour");
var lifeone = document.getElementById("lifepointone");
var lifetwo = document.getElementById("lifepointtwo");
var lifethree = document.getElementById("lifepointthree");
var timeControl = document.getElementById("timecontrol");
var timeDiv = document.getElementById("div-time");
var controlPot = 0;
let vidaPlayer = 300; 
var musicExplore = document.getElementById("music-explore");
var musicAccion = document.getElementById("music-accion");
var numberCont = document.getElementById("number");
var winResult = document.getElementById("ima-win");
var loseResult = document.getElementById("ima-lose");
var gameResult = 0; 
var timePos = document.getElementById("timepos");
var musicBtn = document.getElementById("music-btn");


//Paso 3: Clase para generar Background
class createBackground {
  constructor (x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width; 
    this.height = height;
    this.image = new Image();
    this.image.src = img;
    this.image1 = new Image();
    this.image2 = new Image();
    this.image1.src = "./images/pruebacapauno.jpg"
    this.image2.src = "./images/pruebacapados.jpg"

    }
  draw () {    //Paso 3.1 Method para dibujar 
    
    if (frames % 40 === 0) {
      this.image = this.image === this.image1 ? this.image2 : this.image1
    }
    ctx.drawImage(this.image, this.x,this.y, this.width,this.height) //creamos elemento (road o car)
    return; 
  }

};


// Paso 4: Crear elementos del objeto (Barreras del mapa)
class pruebaWalls{
  constructor (x, y, w, h) {
    this.x = x; 
    this.y = y;
    this.w = w;
    this.h = h;
  }
  pruebaDrawWalls (carrito) {
  
    enemyWalls.forEach(element => {
    ctx.fillStyle = "red";
    ctx.fillRect(element.x, element.y, element.w, element.h); 
    if(carrito.collition(element)) {
      console.log(element.x)
      console.log(canvas.width)
      retornoPosicion();
    }
  });
}
}


//Paso 5: Clase con Inherencia para crear carro
class creaCar extends createBackground{
  draw () {
  
    ctx.drawImage(this.image, this.x,this.y, this.width,this.height)
  }
  collition(enemyWalls) {        //Validando colision

    return(this.x< enemyWalls.x +enemyWalls.w&& 
      this.x + this.width> enemyWalls.x &&
      this.y < enemyWalls.y + enemyWalls.h &&
      this.y + this.height > enemyWalls.y && enemyWalls.isWalk ) 
  }
} 


//Paso 6: Creando clases para luchar contra enemigos 

// Clase general para personaje general / Rivales
class characters {
  constructor(health, strength) {
      this.health = health;
      this.strength = strength;
  }
attack () {
   return this.strength
}

receiveDamage (damage) {
   this.health -= damage;
}
}

// Paso 6: Clase para Personaje Principal 
class  mainCharacter extends characters {
  constructor(name, health, strength){
      super(health,strength);
      this.name = name;
      
  }
  receiveDamage (damage) {
      this.health -= damage;
      if (this.health > 0) {
        console.log(this.health)
        return `${this.name} has received ${damage} points of damage`;
      }  else {
      return `${this.name} has died in act of combat`;
      }
  }
}

// Paso 7 : Clase para Enemigos  
class rivals extends characters {
  constructor(health, strength){
      super(health,strength);
  }
  receiveDamage(damage){
      this.health -= damage;
      if (this.health > 0) {
        console.log(this.health)  
        return `A Saxon has received ${damage} points of damage`;
      }  else {
      return `A Saxon has died in combat`;
      }
  }
}

// Paso 8: Funnciones para Atacar 
function addViking (viking) {
  vikingArmy.push(viking);
}

function addSaxon (saxon) {
  saxonArmy.push(saxon);
}

function vikingAttack(){        //Ataca personaje Principal
      const saxon = saxonArmy[enemyId];
      console.log(saxon);
      const viking = vikingArmy[0];
      const saxonHealt = saxon.receiveDamage(viking.strength);
      console.log(viking.strength)
      console.log(`prueba ${saxon.health}`)
      

      if (saxon.health <= 0) {
          if (enemyId === 0) {
            potionTwoId.style.display="inline"
            rivalOne.image.src="./images/vacio.png"
            controlPot=5;
            
          };
          if (enemyId === 1) {
            potionThreeId.style.display="inline"
            rivalTwo.image.src="./images/vacio.png"
            controlPot=6;
          };
          if (enemyId === 2) {
            potionFourId.style.display="inline"
            rivalThree.image.src="./images/vacio.png"
            controlPot=7;
          };
            
      }
      return saxonHealt;
  
  }

  function saxonAttack(){       //Atacan Enemigos
      const saxon = this.saxonArmy[enemyId];
      const viking = this.vikingArmy[0];
      const vikingHealt = viking.receiveDamage(saxon.strength);

      if (viking.health <= 0) {
        console.log("Viking Muerto")
        gameResult=1;
        gameOver();
      }
      return vikingHealt;
  }

  function showStatus(){
  
  if (this.vikingArmy.length === 0) {
      return `Saxons have fought for their lives and survived another day...`;
  } else if (this.saxonArmy.length === 0) {     
      return `Vikings have won the war of the century!`;
  } else {
      return `Vikings and Saxons are still in the thick of battle.`;
   }
  }


  
  // Paso 9: Dando inicio con condiciones iniciales
  function conditionValidation () {
  
  if(StartId===0){
    potionTwoId.style.display="none";
    potionThreeId.style.display="none";
    potionFourId.style.display="none";
    timePos.style.display="none"
    addViking(playerOne);
    addSaxon(enemyOne);
    addSaxon(enemyTwo);
    addSaxon(enemyThree);
    musicExplore.play();
    musicExplore.loop=true;
    loseResult.style.display="none"
    winResult.style.display="none"
    gameResult=0;
    controlPot=0;
    StartId=1;

    


  }
}

//Paso 10: Variables que me activan las clases

const newmapOne = new createBackground(0, 0, canvas.width, canvas.height, "./images/pruebacapauno.jpg");
const newmapTwo = new createBackground(0, 0, canvas.width, canvas.height, "./images/pruebacapados.jpg");
const newmapThree = new createBackground(0, 0, canvas.width, canvas.height, "./images/pruebacapatres.jpg");
const newCar = new creaCar(10, 80, 35, 35, imgPlayer);
const rivalOne = new creaCar(180, 240, 35, 35, "./images/vacio.png");  //rivaltronco
console.log(rivalOne.image)
const rivalTwo = new creaCar(270, 340, 40, 45, "./images/vacio.png"); //rival junto a rio derecha
const rivalThree = new creaCar(560, 280, 35, 40, "./images/vacio.png"); // rival fin del mapa
//const rivalDragon = new creaCar(465, 200, 50, 50, "./images/dragon.png"); //dragon
const limites = new pruebaWalls(enemyWalls);
const playerOne = new mainCharacter('playerone', 100, 20);
const enemyOne = new mainCharacter('enemyone', 100, 20);
const enemyTwo = new mainCharacter('enemytwo', 100, 20);
const enemyThree = new mainCharacter('enemythree', 100, 20);



//Paso 11: Activador del boton a traves del DOM
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
  startGame();
}


// Paso 12: Funcion stargame  y Update  
function startGame () {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  limites.pruebaDrawWalls(newCar);
  newmapOne.draw();
  newmapTwo.draw();
  newCar.draw();
  rivalOne.draw();
  rivalTwo.draw();
  rivalThree.draw();
  conditionValidation();
  
  if(!requestId){ 
    gameOver()
    }else{
    requestId =  requestAnimationFrame(startGame)
}
}
}

// Paso 13: Validando tecla presionada por usuario
addEventListener('keydown', e => {
  e.preventDefault();
  switch (e.keyCode) {
    case 37:            //Desplanzado a la Izquierda validando limite de mapa
    newCar.x -= 10;
    if (newCar.x < 0) newCar.x = 0; 
    movePlayer = "izq"; 
    break; 
    
    case 39: //Desplanzado a la Derecha validando limite de mapa
    newCar.x += 10; 
    if (newCar.x+30 > canvas.width) newCar.x = canvas. width-30;
    movePlayer = "der";
    break; 
      
    case 38: //Desplanzado hacia arriba y validando limite mapa
    newCar.y -= 10; 
    movePlayer = "up";
    if (newCar.y < 0) newCar.y = 0; 
    break; 
    
    case 40: //Desplanzado hacia abajo y validando limite mapa  
    newCar.y += 10; 
    movePlayer = "down";
    if (newCar.y+30 > canvas.height) newCar.y = canvas.height-30; 
    break; 

    case 32: //atacando con barra espaciadora  
    if (newCar.x < 200)  {
      enemyId = 0; 
      console.log("enenmy",enemyId)
      vikingAttack();
    } 
    if (200 < newCar.x && newCar.x < 400 )  {
      enemyId = 1; 
      console.log("enenmy",enemyId)
      vikingAttack();
    } 

    if (420<newCar.x)  {
      enemyId = 2; 
      console.log("enenmy",enemyId)
      vikingAttack();
    }     
    break; 

    case 80: //activando pociones con tecla P
    console.log(controlPot)
    potionControl();
    break;

    case 72: //
    viking.health
    if (vidaPlayer <= 200) lifethree.style.display="none"
    if (vidaPlayer <= 100) lifetwo.style.display="none"
  }
})
      
// Paso 14: Informando Game Over
gameOver=()=>{
  //requestId = undefined;
  console.log("no avanzar")
  musicExplore.pause()
  musicAccion.pause()

  if(gameResult===1) { //Perder
    loseResult.style.display="inline"
  }else if (gameResult===2){ //Ganar
    winResult.style.display="inline"

  }
  requestId = undefined;
  
  
  // Paso 15: Retornando a Posicion valida
}

retornoPosicion=()=>{
  console.log("ya no debo caminar")
  console.log(movePlayer)
  console.log(`pos x ${newCar.x}`)

  switch(movePlayer) {
    case "izq": newCar.x+=10; break;
    case "der": newCar.x-=10; break;
    case "up" : newCar.y+=10; break;
    case "down" : newCar.y-=10;break;
  }

  } 


  // Paso 16: Activando pociones
function potionControl(){
  console.log(controlPot)
  if (controlPot ===0) {
    rivalOne.image.src="./images/rivalone.png"
    rivalTwo.image.src="./images/rivaltwo.png"
    rivalThree.image.src="./images/rivalthree.png"
    potionOneId.style.display="none"
    timePos.style.display="inline"
    controlTime()
    musicExplore.pause();
    musicAccion.play();
    controlPot=1; 
  } 
  if (controlPot===7){
    gameResult=2;
    gameOver();
  }
}

// Paso 17: Controlando tiempo de pocion
function controlTime() {
var n = 0;
var m = 0;
var l = document.getElementById("number");
window.setInterval(function(){
  l.innerHTML = 60-n;
  m=60-n;
  //timeControl.style= m +'%';
  timeControl.style.width= ((m*100)/60) +'%';
  n++;
  if(m<0) {
    numberCont.style.display="none";
    gameResult=1;
    gameOver();
  }
  
},1000);
}


  