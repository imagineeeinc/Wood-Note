window.addEventListener('load', e => {
  new PWAConfApp();
  registerSW(); 
});
async function registerSW() { 
  if ('serviceWorker' in navigator) { 
    try {
      await navigator.serviceWorker.register('./sw.js'); 
    } catch (e) {
      alert('ServiceWorker registration failed. Sorry about that.'); 
    }
  } else {
    document.querySelector('.alert').removeAttribute('hidden'); 
  }
}

window.onload = function() {
    var menu = document.getElementById('fmenu');
    menu.className = 'shownmenu';
    var home = document.getElementById('container').innerHTML;
    var controls = document.getElementById('controls').innerHTML;
    display_saved_note();
    document.getElementById('area').focus()
    /*document.getElementById('home').onclick = function() {
    document.getElementById('container').innerHTML = home;
    document.getElementById('controls').innerHTML = controls;
    document.getElementById('menu').className = 'hiddenmenu';
    display_saved_note();
}*/
}
/*function auto() {
    const chck = document.getElementById('auto').checked;
    if (chck == true) {
        save();
        auto();
    }
    else {
        return(false);
        auto()
    }
}*/

function check_web_storage_support() {
    if(typeof(Storage) !== "undefined") {
        return(true);
    }
    else {
        alert("Web storage unsupported!");
        return(false);
    }
}

function display_saved_note() {
    if(check_web_storage_support() == true) {
        result = localStorage.getItem('note');
    }
    if(result === null) {
        result = "Hello World!";
    }
    document.getElementById('area').value = result;
}

function save() {
    if(check_web_storage_support() == true) {
        var area = document.getElementById("area");
        if(area.value != '') {
            localStorage.setItem("note", area.value);
        }
        else {
            alert("Nothing to save");
        }
    }
}
function clear() {
    document.getElementById('area').value = "";
}

/*function home() {
	location.reload()
}

function about() {
//	document.getElementById('about').onclick = function() {
    document.getElementById('container').innerHTML = "";
    //document.getElementById('menu').className = 'hiddenmenu';
    var container = document.getElementById('container');
    var p = document.createElement('p');
    p.id = 'aboutus';

    container.appendChild(p);
    var text = document.createTextNode("Version Info[(Version:2.2.1) (Update: The File IO Update) (UpdateDescription: This Adds some UI Enhancements, a bullet point note feature, Give a name to the file you are saving and Load a file.)]");
    p.appendChild(text);

    container.appendChild(p);
    var text = document.createTextNode("Technoliges[HTML, css, Javascript & FileSaver.js]");
    p.appendChild(text);
}*/
function about() {
    alert("Version:3.0.0\n\nUpdate: The Better Mobile Update\n\nUpdateDescription: This the app more usable on mobile and some enhancments overall");
}
//}
function fmenuopen() {
		var menu = document.getElementById('fmenu');
        var fomenu = document.getElementById('fomenu');
        var hmenu = document.getElementById('hmenu');
        //if(menu.className != 'shownmenu') {
            menu.className = 'shownmenu';
            fomenu.className = 'fohiddenmenu';
            hmenu.className = 'hhiddenmenu';
        /*}
        else {
            menu.className = 'fhiddenmenu';
        }*/
    }

function fomenuopen() {
        var menu = document.getElementById('fomenu');
        var fmenu = document.getElementById('fmenu');
        var fomenu = document.getElementById('fomenu');
        //if(menu.className != 'shownmenu') {
            menu.className = 'shownmenu';
            fmenu.className = 'fhiddenmenu';
            hmenu.className = 'hhiddenmenu';
        /*}
        else {
            menu.className = 'fohiddenmenu';
        }*/
    }
function hmenuopen() {
        var menu = document.getElementById('hmenu');
        var fmenu = document.getElementById('fmenu');
        var fomenu = document.getElementById('fomenu');
        //if(menu.className != 'shownmenu') {
            menu.className = 'shownmenu';
            fmenu.className = 'fhiddenmenu';
            fomenu.className = 'fohiddenmenu';
        /*}
        else {
            menu.className = 'hhiddenmenu';
        }*/
    }

function lomenuopen() {
        var menu = document.getElementById('lomenu');
        if(menu.className != 'shownmenu') {
            menu.className = 'shownmenu';
        }
        else {
            menu.className = 'hhiddenmenu';
        }
    }

function savefailas() {
	var textFile = null,
        makeTextFile = function(text) {
            var data = new Blob([text], {
                type: 'text/plain'
            });

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);

            return textFile;
        }
    var create = document.getElementById('create'),
            textbox = document.getElementById('textbox');

        create.addEventListener('click', function() {
            var link = document.getElementById('downloadlink');
            link.href = makeTextFile(textbox.value);
            link.style.display = 'block';
            document.getElementById('create').style.display = 'none';
        }, false);
    }

function saveasother() {
	var data = document.getElementsByName('textarea')[0].value;
	window.open("data:application/text," + encodeURIComponent(data), "_self");
}

function saveas(textarea) {
    var Name = "wood_note_page.txt"
    var Name = prompt("Please enter your the name of the text file", "wood_note_page.txt");
    if (Name == "") {
        alert("you can not save in that name")
    } else {
        var data = document.getElementsByName('textarea')[0].value;
        var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        saveAs(blob, Name);
    }
}
/*function lodf() {
	document.getElementById('area').value = "";
	document.getElementById('inputfile') 
              
            var fr=new FileReader(); 
            fr.onload=function(){
            	document.getElementById('area') 
                        .textContent=fr.result;
            } 
              
        fr.readAsText(this.files[0]);
}*/

/*function loadf(file) {
	var fileToLoad = inputfile;
	var fileReader = new FileReader();
	fileReader.onload = function(fileToLoad) {
		content = e.target.result;
		console.log("File loaded properly!");;
};
document.getElementById('area').textContent=fileReader.result;
fileReader.readAsText(this.files[0]);
}*/
function bullet() {
    //document.getElementById('area').value = text + "\u2022 ";
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "\u2022 " + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
        //+ document.getElementById('area')
        //+ document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
//\u2022 for bullet point

/*function loadf() {
    document.querySelector("#load").addEventListener('click', function() {
    if(document.querySelector("#inputfile").files.length == 0) {
        alert('Error : No file selected');
        return;
    var file = document.querySelector("#inputfile").files[0];
    var reader = new FileReader();
    reader.addEventListener('loadstart', function() {
    console.log('File reading started');
    reader.addEventListener('load', function(e) {
    var text = e.target.result;

    document.getElementById('area').value = text;
    });

    reader.addEventListener('error', function() {
        alert('Error : Failed to read file');
    });

    reader.addEventListener('progress', function(e) {
        if(e.lengthComputable == true) {
            var percent_read = Math.floor((e.loaded/e.total)*100);
            console.log(percent_read + '% read');
        }
    });

    reader.readAsText(file);
});*/

function loadf(that) {
        if(that.files && that.files[0]){
            var reader = new FileReader();
            reader.onload = function (e) {  
                var output=e.target.result;
                //window.confirm("Are You Sure You Want To Over Right The Text That Is In The Text Box");

                if (confirm("Are You Sure You Want To Over Right The Text That Is In The Text Box")) {
                    document.getElementById('area').value = output;
                }
                else {
                alert("You Cancelled")
            }
            };
            reader.readAsText(that.files[0]);
        }
}
function signin() {
}
function copy() {
    var copyText = document.getElementById("area");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
}
function bracketi() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "(" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function bracketii() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + ")" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function sqrbracketi() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "[" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function sqrbracketii() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "]" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function curbracketi() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "{" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function curbracketii() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "}" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function under() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "_" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function star() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "*" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function plus() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "+" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function dash() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "-" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function equal() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "=" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function slash() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "/" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function enter() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "\n" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}
function at() {
    var startPos = document.getElementById('area').selectionStart;
    var endPos = document.getElementById('area').selectionEnd;
    //console.log(startPos + "," + endPos)
    document.getElementById('area').value = document.getElementById('area').value.substring(0, startPos) + "@" + document.getElementById('area').value.substring(endPos, document.getElementById('area').value.length);
}