window.onload = function() {
    var menu = document.getElementById('fmenu');
    menu.className = 'shownmenu';
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
function about() {
    alert("This is a special terrible edition for fun.");
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

function bullet() {
    var text = document.getElementById('area').value;
    document.getElementById('area').value = text + "\u2022 ";
}
//\u2022 for bullet point

function copy() {
    var copyText = document.getElementById("area");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
}
