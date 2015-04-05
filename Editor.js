listFiles();

function saveFile() {
	var data = new FormData();
	data.append("data", document.getElementById('textarea').value);
	data.append("filename", document.getElementById('filename').value);
	var xhr = new XMLHttpRequest();
	xhr.open('post', './write.php', true);
	xhr.send(data);

	var deleteChecked = new FormData();
	var xhr = new XMLHttpRequest();
	xhr.open('post', './deleteChecked.php', true);
	xhr.send(deleteChecked);

	console.log("Listing files in 1 second");
	setTimeout(function () { listFiles(); }, 1000);
}

function openFile() {
	openFile(document.getElementById('filename').value);
}

function openFile(filename) {
	$.ajax({
		type: "GET",
		cache: false,
		url: "Programs/" + filename,
		dataType: 'text',
		success: function(text) {
			document.getElementById('textarea').value = text;
		},
		error: function() {
			alert("File does not exist.");
		}
	});

	document.getElementById('filename').value = filename;
}

function deleteFile() {
	var deleteFile = new FormData();
	deleteFile.append("filename", document.getElementById('filename').value);
	var xhr = new XMLHttpRequest();
	xhr.open('post', './delete.php', true);
	xhr.send(deleteFile);

	document.getElementById("textarea").value = "";

	setTimeout(function () { listFiles(); }, 1000);
}

function listFiles() {
	console.log("Listing files");
	$.ajax({
		url : "./Programs/",
		cache: false,
		success : function(data) {
			var fileList = document.getElementById('fileList');
			fileList.innerHTML = "<h2>Recipes</h2>";
			console.log(data);
			$(data).find("td > a").each(function(){
				var filename = $(this).attr("href");
				if (!(filename === "/incu/")) {
					fileList.innerHTML = fileList.innerHTML + '<p><button id="' + filename + '" type="button" class="btn" onclick="openFile(this.id)">' + filename + '</button></p>';
				}
			});
		}
	});
}

function reload() { location = "editor.html"; }

function home() { location = "index.html"; }
