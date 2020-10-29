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
  {x: 75, y: 0, w: 70, h: 80,isWalk:true}, // 2 arboles 
  {x: 150, y: 0, w: 80, h: 55, isWalk:true}, // Ultimo  arbol 
  {x: 0, y: 170, w: 35, h: 80, isWalk:true}, //peñasco para escalera izq
  {x: 70, y: 170, w: 35, h: 80, isWalk:true}, //peñasco para escalera derecha
  {x: 90, y: 140, w: 45, h: 100, isWalk:true}, // 1er peñasco derecha hasta jarrón 
  {x: 135, y: 140, w: 40, h: 65, isWalk:true}, // 1er peñasco derecha hasta limite 
  {x: 160, y: 110, w: 50, h: 70, isWalk:true}, // 2do peñasco derecha hasta limite 
  {x: 200, y: 80, w: 50, h: 115, isWalk:true}, // 4to peñasco derecha hasta limite incluyendo piedra 
  {x: 255, y: 0, w: 55, h: 235, isWalk:true}, // Rio  Sec1 
  {x: 220, y: 220, w: 55, h: 15, isWalk:true}, // Rio  Sec2.1
  {x: 220, y: 275, w: 55, h: 90, isWalk:true}, // Rio  Sec2.2 
  {x: 185, y: 340, w: 55, h: 50, isWalk:true}, // Rio  Sec3
  {x: 115, y: 370, w: 65, h: 50, isWalk:true}, // Rio  Sec4
  {x: 40, y: 280, w: 35, h: 45, isWalk:true}, // Piedra sec Izq  
  {x: 75, y: 300, w: 40, h: 45, isWalk:true}, // Piedra con flores sec Izq  
  {x: 315, y: 0, w: 80, h: 145, isWalk:true}, // Peñasco sec 2  
  {x: 390, y: 0, w: 70, h: 205, isWalk:true}, // Peñasco sec 3
  {x: 500, y: 0, w: 90, h: 205, isWalk:true}, // Peñasco sec 4
  {x: 570, y: 0, w: 90, h: 230, isWalk:true}, // Peñasco sec 5
  {x: 465, y: 140, w: 30, h: 65, isWalk:true}, // Entrada cueva
  {x: 320, y: 335, w: 290, h: 55, isWalk:true}, // Jardin parte baja
  {x: 390, y: 300, w: 160, h: 40, isWalk:true}, // Jardin parte arriba
  {x: 370, y: 200, w: 50, h: 20, isWalk:true}, // aviso entrada cueva
  {x: 440, y: 260, w: 110, h: 55, isWalk:true}, // Arbol parte abajo
  {x: 450, y: 240, w: 90, h: 55, isWalk:true}, // Arbol parte central
 
 ];
let contador = 0;
let sexId;
let imgPlayer = sessionStorage.getItem("personaje");



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
  draw () {    //Paso 2.1 Method para dibujar 
    
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


//Paso 6: Variables que me activan las clases

const newmapOne = new createBackground(0, 0, canvas.width, canvas.height, "./images/pruebacapauno.jpg");
const newmapTwo = new createBackground(0, 0, canvas.width, canvas.height, "./images/pruebacapados.jpg");
const newmapThree = new createBackground(0, 0, canvas.width, canvas.height, "./images/pruebacapatres.jpg");
const newCar = new creaCar(10, 80, 30, 30, imgPlayer);

const rivalOne = new creaCar(180, 240, 35, 35, "./images/rivalone.png");  //rivaltronco
const rivalTwo = new creaCar(270, 340, 35, 45, "./images/rivaltwo.png"); //rival junto a rio derecha
const rivalThree = new creaCar(560, 280, 45, 40, "./images/rivalthree.png"); // rival fin del mapa
const rivalDragon = new creaCar(465, 200, 50, 50, "./images/dragon.png"); //dragon
const limites = new pruebaWalls(enemyWalls);



//Paso 7: Activador del boton a traves del DOM
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
  startGame();
}


// Paso 8: Funcion stargame  y Update  
function startGame () {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  
  limites.pruebaDrawWalls(newCar);
  newmapOne.draw();
  newmapTwo.draw();
  //newmapThree.draw(); 
  newCar.draw();
  rivalOne.draw();
  rivalTwo.draw();
  rivalThree.draw();
  rivalDragon.draw();
  
  
  
  
  
  if(!requestId){ 
    gameOver()
    }else{
    requestId =  requestAnimationFrame(startGame)
}
}
}

// Paso 9: Validando tecla presionada por usuario
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
  }
})
      
// Paso 10: Informando Game Over
gameOver=()=>{
  //requestId = undefined;
  console.log("no avanzar")
  // requestId = 1;
  // txt.fillText(`Game Over, your final scores is ${wallCounters}`, 0, 880);
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






