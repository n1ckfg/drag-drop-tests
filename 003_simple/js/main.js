// http://stackoverflow.com/questions/10261989/html5-javascript-drag-and-drop-file-from-external-window-windows-explorer
// http://stackoverflow.com/questions/14749224/accessing-data-from-a-json-object-selected-locally-using-html5-file-api

"use strict";

function main() {

    var dropZone = document.getElementById('dropZone');

    // Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
    dropZone.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    // Get file data on drop
    dropZone.addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files; // Array of all files
        for (var i=0, file; file=files[i]; i++) {
            var reader = new FileReader();
            if (file.type.match(/image.*/)) {
                reader.onload = function(e2) { // finished reading file data.
                    var img = document.createElement('img');
                    img.src= e2.target.result;
                    document.body.appendChild(img);
                }
                reader.readAsDataURL(file); // start reading the file data.
            } else {
                reader.onload = function(e2) {
                    console.log(e2.target.result);
                }
                reader.readAsText(file, 'UTF-8');
            }   
        }   
    });

    /*
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
    */

}

window.onload = main;