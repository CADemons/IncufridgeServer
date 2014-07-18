function submit() {
    var warns = document.getElementsByClassName("warn");
    var fail = false;
    for(var i=0; i<warns.length; i++) {
        
        check(warns[i].previousSibling);
        if(warns[i].innerHTML !== ""){
            alert("Please resolve all errors before submitting");
            fail = true;
        }
    }
    if(!fail) {
        console.log("submitted");
        document.getElementById("form").submit();
    }
}

function check(field) {
    console.log("checking");
    var type = field.getAttribute("data-type");
    if(type === "name") {
        var regex = /[^a-z0-9_-]/i;
        console.log(field.value);
        var exists = false;
        for(var file in incufridge.exists) {
            var fname = field.value + ".txt";
            if(fname === incufridge.exists[file]) {
                exists = true;
                break;
            }
        }
        if(regex.test(field.value)) {
            field.nextSibling.innerHTML = "Name can only be letters, numbers, - or _";
            console.log("fail");
        } else if(field.value === "") {
            field.nextSibling.innerHTML = "Name cannot be empty";
        } else if(exists) {
            field.nextSibling.innerHTML = "Name already exists";
        } else {
            field.nextSibling.innerHTML = "";
        }
    }
}