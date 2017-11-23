var input = document.getElementById('input_file');
var image = document.getElementById('image');
var caja = document.getElementById('momos');



(function(){
	firebase.database().ref('momos').on('child_added', function(snap){
		console.log(snap.val())
		caja.innerHTML += "<p><span>"+snap.val().username+"</span><img src='"+snap.val().image+"' width='150px'/></p>";
		
	})
})();


function subirArchivo(){

	var file = input.files[0]
	firebase.storage().ref().child('fotos/'+file.name).put(file)
		.then(function(r){
			image.setAttribute("src", r.downloadURL)
			console.log(r)
		}).catch(function(e){
			console.log(e)
		})
}

function subirMomo(){
	var image = document.getElementById("image").src;
	console.log(image)
	var user = firebase.auth().currentUser;
	var data = {
		image:image,
		username:user.displayName
	}
	firebase.database().ref('momos').push(data)
		.then(function(){

		})
}

function logIn(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider)
		.then(function(result){
			console.log(result)
		})
		
}







