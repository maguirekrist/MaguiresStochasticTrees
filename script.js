const canvas = document.getElementById('canvas');
const container = document.getElementsByClassName('container')[0];
let ctx = canvas.getContext('2d');



const N = 5;
const init = 'X';
const F = 'FF';
const X = 'F[+X]F[-X]+XO';

renderLSystem(generateLString(init));

function generate() {
  renderLSystem(generateLString(init));
}

function getRandomNode() {
  let nodeOptions = [
    'F[+X]F[-X]+XO',
    'F[-X]FF[+X]-XO',
    'FF[+X]-F[-XF]+FXO'
  ]
  return nodeOptions[getRandomSize(0, nodeOptions.length)];
}

function getRandomEdge() {
  let edgeOption = [
    'FF',
  ]

  return edgeOption[getRandomSize(0, edgeOption.length)]; 
}

function getLeafColors() {
  let colorOptions = [
    'rgb(141, 249, 164)',
    'rgb(25, 178, 9)',
    'rgb(11, 185, 117)',
    'rgb(64, 215, 174'
  ];
  let rand = Math.floor(Math.random() * colorOptions.length);

  return colorOptions[rand];
}

function getRandomSize(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function generateLString(input) {
	let temp = input;
	for(let i = 0; i < N; i++) {
  	/* let versus = temp.replace(/F/g, F) */;
    
		for(let z = 0; z <= temp.length; z++) {
      
      if(temp[z] == 'F') {
        let k = temp.substr(z + 1, temp.length);
        temp = temp.substr(0, z) + getRandomEdge() + k;
        z = z + F.length - 1;
      } else if(temp[z] == 'X') {
        let k = temp.substr(z + 1, temp.length);
        temp = temp.substr(0, z) + getRandomNode() + k;
        z = z + X.length - 1;
      }
    }
    
    /* console.log(temp == versus); */
  }
  return temp;
}


function drawCircle(obj) {
  obj.ctx.beginPath();
  obj.ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI, false);
  if (obj.fill) {
      obj.ctx.fillStyle = obj.fill;
      obj.ctx.fill();
  }
  if (obj.stroke) {
      obj.ctx.lineWidth = obj.strokeWidth;
      obj.ctx.strokeStype = obj.stroke;
      obj.ctx.stroke();
  }
}


function renderLSystem(input) {
	console.log(input);
  ctx.canvas.width = container.offsetWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.beginPath();
  let x = canvas.width / 2;
  let y = canvas.height;
  let dir = 3 * Math.PI / 2;
  let turn = 20 * (Math.PI / 180);
  const D = 4;
  let turtleState = [];
  ctx.moveTo(x, y);
	for(let i = 0; i < input.length; i++) {
  	switch(input[i]) {
    	case 'F':
        ctx.moveTo(x, y);
        x = x + (D * Math.cos(dir));
        y = y + (D * Math.sin(dir));
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgb(87, 60, 0)';
        ctx.stroke();
      	break;
      case 'f':
        ctx.moveTo(x, y);
        x = x + (D * Math.cos(dir));
        y = y + (D * Math.sin(dir));
      	break;
      case '-':
      	dir = dir - (getRandomSize(15, 26) * (Math.PI / 180));
      	break;
      case '+':
      	dir = dir + (getRandomSize(15, 26) * (Math.PI / 180));
      	break;
      case '[':
      	turtleState.push({ x: x, y: y, dir: dir});
      	break;
      case ']':
      	let dat = turtleState.pop();
        x = dat.x;
        y = dat.y;
        dir = dat.dir;
      	break;
      case 'O':
      	//Place Flower
        drawCircle({
          ctx: ctx,
          x: x,
          y: y,
          radius: getRandomSize(5, 12),
          fill: getLeafColors(),
        });
    }
  }

}
