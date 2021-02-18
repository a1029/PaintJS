const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_VALUE = "#2c2c2c";

let painting = false;
let filing = false;

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_VALUE;
ctx.fillStyle = INITIAL_VALUE;
ctx.lineWidth = 2.5;


function stopPainting(){
    painting = false;
}

function startPainting(){
    if(filing===false){
        painting = true;
    }
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event){
    if(filing === true){
        filing = false;
        mode.innerText = "Fill";
    } else {
        filing = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filing){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint";
    link.click();

}
if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// change color
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

// change thickness
if (range){
    range.addEventListener("input", handleRangeChange);
}

// fill canvas
if (mode){
    mode.addEventListener("click", handleModeClick);
}

// save image
if (save){
    save.addEventListener("click", handleSaveClick)
}
