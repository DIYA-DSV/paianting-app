var database;
var drawing = [], currentPath = [], isDrawing = false;
var saveButton;
var dbColourRed, dbColourGreen, dbColourBlue, dbCanvasColour, r = 255, g = 255, b = 255, canvasColour = "black";

function setup() {
    canvas = createCanvas(1100,600);
    database = firebase.database();
    canvas.parent("canvascontainer");
    
    var ref = database.ref("drawings")
    ref.on("value", gotData, errData)
    
}

function draw() {
    background(canvasColour);
    
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
    
}

function saveDrawing(){
    var ref = database.ref("drawings");
    var data ={
        drawing : drawing
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

      dbColourRed = dbDrawing.red;
      dbColourGreen = dbDrawing.green;
      dbColourBlue = dbDrawing.blue;
      dbCanvasColour = dbDrawing.canvas;

      r = dbColourRed;
      g = dbColourGreen;
      b = dbColourBlue;
      canvasColour = dbCanvasColour;

      console.log(drawing);
    }

}