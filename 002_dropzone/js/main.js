"use strict";

var dropzone;

function setup() {
    //createCanvas(200, 200);
    //background(0);
    
    dropzone = select("#dropzone");
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);
}

function gotFile(file) {
	console.log(file.name);
    createP(file.name + " " + file.size);
    //var img = createImg(file.data);
    //img.size(100, 100);
    loadJSON(file.data, tester);
}

function tester(data) {
	console.log(data.grease_pencil[0].layers[0]);
}

function highlight() {
    dropzone.style("background-color","#ccc");
}

function unhighlight() {
    dropzone.style("background-color","#fff");
}

function loadJSON(filepath, callback) { 
    // https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript  
    //var filepath = animationPath;
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', filepath, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}