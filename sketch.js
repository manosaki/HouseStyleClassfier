let input;
let img;
let inputImg;
let modelURL = './model/';


function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  canvas = createCanvas(1000, 1000);
  background(255);
  canvas.mouseClicked(classifyCanvas);
  
  let button = createButton('Clear Canvas');
  button.mousePressed(clearCanvas);
  
  input = createFileInput(handleFile);
  input.position(0, 100);
  classifier.classify(inputImg , gotResult);
  // Create 'label' and 'confidence' div to hold results
  label_1 = createDiv('風格1: ...');
  confidence_1 = createDiv('程度: ...');
  label_2 = createDiv('風格2: ...');
  confidence_2 = createDiv('程度: ...');
  label_3 = createDiv('風格3: ...');
  confidence_3 = createDiv('程度: ...');
}

function clearCanvas() {
  background(255);
}

function draw() {
  if (img) {
    image(img, 0, 120);
  }
  inputImg = loadImage(img);
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}



function classifyCanvas() {
  classifier.classify(img, gotResult);
}


// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  label_1.html('風格1: ' + results[0].label);
  confidence_1.html('程度: ' + nf(results[0].confidence, 0, 5));
  label_2.html('風格2: ' + results[1].label);
  confidence_2.html('程度: ' + nf(results[1].confidence, 0, 5));
  label_3.html('風格3: ' + results[2].label);
  confidence_3.html('程度: ' + nf(results[2].confidence, 0, 5));
}
