var cargaPag = function(){
	$("#boton").click(validaciones);
}

$(document).ready(cargaPag);

var validaciones= function(){
	var nohayvacios = true;
	var limitecorrecto = true;
	var aniovalido = true;

	if ($("#titulo").val()==0 || $("#artista").val()==0 ||
		$("#anio").val()==0 || $("#genero").val()==0){
		nohayvacios = false;
		alert("Complete todos los espacios por favor");
	}

	if (nohayvacios) {
		if ($("#titulo").val().length > 40){
			limitecorrecto =  false;
			var mensaje = $("<p></p>").text("Título inválido");
			mensaje.css("color","red");
			$("#errores").append(mensaje);
		}
		if ($("#artista").val().length > 60){
			limitecorrecto =  false;
			var mensaje = $("<p></p>").text("Artista inválido");
			mensaje.css("color","red");
			$("#errores").append(mensaje);
		}
		if ($("#genero").val().length > 30){
			limitecorrecto =  false;
			var mensaje = $("<p></p>").text("Género inválido");
			mensaje.css("color","red");
			$("#errores").append(mensaje);
		}

		if ($("#anio").val() < 1899 || $("#anio").val() > 2017){
			aniovalido = false;
			var mensaje = $("<p></p>").text("Anio inválido");
			mensaje.css("color","red");
			$("#errores").append(mensaje);
		}
		
	}
}