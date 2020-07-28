var database;
var drawing = [], currentPath = [], isDrawing = false;
var saveButton;
var r = 255, g = 255, b = 255;
var redButton,blueButton,greenButton,yellowButton,whiteButton,rainbowButton;
var rainbow = false;
var changeR = "no", changeG = "no", changeB = "no"; 
var chanceR = "no", chanceG = "no", chanceB = "no";
var colorE, canvasColourE;
var gridButton, gx, gy, removeGrid;
var canvasColour = "black", whiteCanvas, blackCanvas, greenCanvas, blueCanvas;
var B1, B2;

function setup() {
    canvas = createCanvas(1100,600);
    database = firebase.database();
    canvas.parent("canvascontainer");
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);

    saveButton = createButton("save")
    saveButton.position(1150,30)
    saveButton.mousePressed(saveDrawing);

    clearButton = createButton("clear")
    clearButton.position(1150,70)
    clearButton.mousePressed(clearDrawing);

    gx = createSprite(1100/2,600/2,1100,1);
    gx.shapeColor = "white";
    gx.visible = false;
    gy = createSprite(1100/2,600/2,1,600);
    gy.shapeColor = "white";
    gy.visible = false;

    gridButton = createButton("grids");
    gridButton.position(1210,30);
    gridButton.mousePressed(()=>{
      gx.visible = true;
      gy.visible = true;
    });

    removeGrid = createButton("remove grids");
    removeGrid.position(1210,70);
    removeGrid.mousePressed(()=>{
      gx.visible = false;
      gy.visible = false;
    })
    
    redButton = createButton("red");
    redButton.position(180,605);
    redButton.mousePressed(()=>{
      rainbow = false;
      r = 255;
      g = 0;
      b = 0;
      chanceR = "no";
      chanceG = "no";
      chanceB = "no";
    });

    blueButton = createButton("blue");
    blueButton.position(180,630)
    blueButton.mousePressed(()=>{
      rainbow = false;
      r = 0;
      g = 0;
      b = 255;
      chanceR = "no";
      chanceG = "no";
      chanceB = "no";

    });

    whiteButton = createButton("white");
    whiteButton.position(240,605);
    whiteButton.mousePressed(()=>{
      rainbow = false;
      r = 255;
      g = 255;
      b = 255;
      chanceR = "no";
      chanceG = "no";
      chanceB = "no";

    });

    greenButton = createButton("green");
    greenButton.position(240,630)
    greenButton.mousePressed(()=>{
      rainbow = false;
      r = 0;
      g = 255;
      b = 0;
      chanceR = "no";
      chanceG = "no";
      chanceB = "no";

    });

    yellowButton = createButton("yellow");
    yellowButton.position(300,605);
    yellowButton.mousePressed(()=>{
      rainbow = false;
      r = 255;
      g = 255;
      b = 0;
      chanceR = "no";
      chanceG = "no";
      chanceB = "no";

    });

    rainbowButton = createButton("rainbow");
    rainbowButton.position(300,630);
    rainbowButton.mousePressed(()=>{
      r = 255;
      g = 0;
      b = 6;
      rainbow = true;
    });

    colorE = createElement("h1","COLOUR :")
    colorE.position(5,590);

    canvasColourE = createElement("h2", "Canvas Colour :")
    canvasColourE.position(400,595);

    whiteCanvas = createButton("white");
    whiteCanvas.position(580,605);
    whiteCanvas.mousePressed(()=>{
      canvasColour = "white";
    });

    blackCanvas = createButton("black");
    blackCanvas.position(580,630);
    blackCanvas.mousePressed(()=>{
      canvasColour = "black";
    });

    blueCanvas = createButton("blue");
    blueCanvas.position(640,605);
    blueCanvas.mousePressed(()=>{
      canvasColour = "blue";
    });

    greenCanvas = createButton("green");
    greenCanvas.position(640,630);
    greenCanvas.mousePressed(()=>{
      canvasColour = "green";
    });

    B1 = createSprite(1100/2,599.9,1100,1);
    B1.shapeColor = "black";
    B2 = createSprite(1099.9,600/2,1,600);
    B2.shapeColor = "black";
    
}

function startPath(){
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath)
}

function endPath(){
    isDrawing = false;
}

function draw() {
    background(canvasColour);

    if (rainbow === true) {
      if(r >= 255 && b === 6){
        changeB = "plus";
        chanceR = "no";
        chanceG = "no";
        chanceB = "yes";
      };
      if(b >= 255 && g <= 0){
        changeR = "minus";
        chanceR = "yes";
        chanceG = "no";
        chanceB = "no";
      };
      if(r <= 0 && b >= 255){
        changeG = "plus";
        chanceR = "no";
        chanceG = "yes";
        chanceB = "no";
      };
      if(g >= 255 && r <= 0){
        changeB = "minus";
        chanceR = "no";
        chanceG = "no";
        chanceB = "yes";
      };
      if(b <= 0 && g >= 255){
        changeR = "plus";
        chanceR = "yes";
        chanceG = "no";
        chanceB = "no";
      };
      if(r >= 255 && b <= 0) {
        changeG = "minus";
        chanceR = "no";
        chanceG = "yes";
        chanceB = "no";
      };
      if(r >= 255 && b <= 0 && g <= 0){
        changeR = "no";
        changeG = "no";
        changeB = "no";
        chanceR = "no";
        chanceG = "no";
        chanceB = "no";
        r = 255;
        g = 0;
        b = 6;
      }
    };

    if(r >= 255 && chanceR === "no"){
      changeR = "no";
    } else if(r <= 0 && chanceR === "no"){
      changeR = "no"
    };
    if(g >= 255 && chanceG === "no"){
      changeG = "no";
    } else if(g <= 0 && chanceG === "no"){
      changeG = "no"
    };
    if(b >= 255 && chanceB === "no"){
      changeB = "no";
    } else if(b <= 0 && chanceB === "no"){
      changeB = "no"
    };

    if(changeR === "plus"){
      r = r + 2;
    };
    if(changeR === "minus"){
      r = r - 2;
    };
    if(changeG === "plus"){
      g = g + 2;
    } else if(changeG === "minus"){
      g = g - 2;
    };
    if(changeB === "plus"){
      b = b + 2;
    } else if(changeB === "minus"){
      b = b - 2;
    };

    if(isDrawing){
      var point = {
        x : mouseX,
        y : mouseY
      };
      currentPath.push(point);
    }

    stroke(r,g,b);
    strokeWeight(2);
    noFill();
    for (var i = 0; i < drawing.length; i++){
      var path = drawing[i];
      beginShape();
      for (var j = 0; j < path.length; j++){
        vertex(path[j].x, path[j].y);
      }
      endShape();
    };
    drawSprites();
}

function saveDrawing(){
    var ref = database.ref("drawings");
    var data ={
        drawing : drawing,
        red : r,
        green : g,
        blue : b,
        canvas : canvasColour,
    }
    var result = ref.push(data , dataSent);
    console.log(result.key);
     
    function dataSent(err, status){
        console.log(status);
    }
}

function clearDrawing(){
  drawing = [];
}

function gotData(data){
    var elements = selectAll(".listing")
    for (let i = 0; i < elements.length; i++) {
      elements[i].remove();
      
    }

    var drawings = data.val();
    var keys = Object.keys(drawings);
    for (let i = 0; i < keys.length; i++) {
        var key = keys[i];
        //console.log(key);
        var li = createElement('li', "");
        li.class("listing");
        var ahref = createA("#",key);
        ahref.mousePressed(showDrawing);
        ahref.parent(li);
        li.parent("drawinglist");
        
    }
}

function errData(err){
    console.log(err);
}

function showDrawing(){
    var key = this.html();
    //console.log(this.html());

    var ref = database.ref("drawings/" + key);
    ref.once("value", oneDrawing, errData);

    function oneDrawing(data){
      var dbDrawing = data.val();
      drawing = dbDrawing.drawing;
      console.log(drawing);
    }
}