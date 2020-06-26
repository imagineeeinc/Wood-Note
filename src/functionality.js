	if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}

window.onload = function() {
    var home = document.getElementById('container').innerHTML;
    var controls = document.getElementById('controls').innerHTML;
    display_saved_note();
    document.getElementById('home').onclick = function() {
    document.getElementById('container').innerHTML = home;
    document.getElementById('controls').innerHTML = controls;
    document.getElementById('menu').className = 'hiddenmenu';
    display_saved_note();
}
}

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
        result = "No note saved";
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

//Dev Note Is a test note taking app made using web technoliges. this was developed in DevMoon


function home() {
	location.reload()
}

function about() {
//	document.getElementById('about').onclick = function() {
    document.getElementById('container').innerHTML = "";
    document.getElementById('menu').className = 'hiddenmenu';
    var container = document.getElementById('container');
    var p = document.createElement('p');
    p.id = 'aboutus';

    container.appendChild(p);
    var text = document.createTextNode("Version:1.3.0 Update: PWA UpdateDescription: This update makes the application now able to be installed on your device.");
    p.appendChild(text);

    container.appendChild(p);
    var text = document.createTextNode("Wood Note Is a Minimlistic note taking app made using Vanila HTML, css & Javascript.");
    p.appendChild(text);

    container.appendChild(p);
    var text = document.createTextNode("You just write the notes and click save and is saved to your browser");
    p.appendChild(text);
    
}
//}
function menuopen() {
	document.getElementById('menulink').onclick = function() {
		var menu = document.getElementById('menu');
		if(menu.className != 'shownmenu') {
            menu.className = 'shownmenu';
        }
        else {
            menu.className = 'hiddenmenu';
        }
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
	var data = document.getElementsByName('textarea')[0].value;
	var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "wood_note_page.txt");
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
}

function loadf() {
	var fileToLoad = inputfile;
	var fileReader = new FileReader();
	fileReader.onload = function(fileToLoad) {
		content = e.target.result;
		console.log("File loaded properly!");;
};
document.getElementById('area').value = fileReader
}*/
