$(document).ready(function(){
    let idSuperheroe = 0;
    $("#buscarheroe").on('click',function() {
        idSuperheroe = $("#superID").val(); // Obtenemos el valor del input form
        
        // Evaluamos si es un número
        
        if(/^-?\d+$/.test(idSuperheroe)) {
            // Ajax Query
            var settings = {
            "url": `https://www.superheroapi.com/api.php/4905856019427443/${idSuperheroe}`,
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (apiData) {
            // Nombre
            let nombreHeroe = apiData.name;
            // Image URL
            let imagenHeroe = apiData.image.url;
            // Obteniendo aliases
            let aliasesHeroe = [];
            if (apiData.biography.aliases.length == 1 && apiData.biography.aliases[0] == "-") {
                aliasesHeroe = "No poseé aliases"
            } else {
                apiData.biography.aliases.forEach(element => {
                    aliasesHeroe.push(element);
                })
            }
            // Lugar nacimiento
            let lugarNacimiento = ""
            if (apiData.biography["place-of-birth"] === "-") {
                lugarNacimiento = "Desconocido"
            } else {
                lugarNacimiento = apiData.biography["place-of-birth"]
            }


            // Inyectando variables en el HTML
            $(".card-title").text(nombreHeroe);
            $("#imagen-heroe").attr('src',imagenHeroe);
            $("#aliases").text(aliasesHeroe);
            $("#lugar-nacimiento").text(lugarNacimiento);
          });
            // Hacemos aparecer los resultados
            $("#biografia-heroe").removeAttr('hidden');
            $("#stats-heroe").removeAttr('hidden');

        } else {
            alert("Solo debes ingresar un número!");
        }

    })
})