$(document).ready(function(){
    let idSuperheroe = 0;
    // Evento boton
    $("#buscarheroe").on('click',function() {
        idSuperheroe = $("#superID").val(); // Obtenemos el valor del input form
        
        // Construyendo grafico del dolar
        let statsHeroes = []; // Aca van los datos a apendar con la API
        let optionGrafico = { // Parametros gráfico
            animationEnabled: true,
            title: {
                text: "Stats"
            },
            axisX: {
                interval: 1
            },
            axisY: {
                title: "Cantidad",
                titleFontSize: 24,
            },
            data: [{
                type: "bar",
                name: "test",
                // color: "#014D65",
                axisYType: "secondary",
                dataPoints: statsHeroes,
            }
            ]
        };
        
        // Evaluamos si es un número
        
        if(/^-?\d+$/.test(idSuperheroe)) { // Aqui comienza la API e inyecciones
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
            // Primera aparición
            let primeraAparicion = apiData.biography["first-appearance"];

            // Estatura
            let estaturaHeroe = apiData.appearance.height[1] // Queremos en centimetros!

            // Peso
            let pesoHeroe = apiData.appearance.weight[1] // En kilos

            // Stats

            let statsHeroeApi = apiData.powerstats;

            for (let stat in statsHeroeApi) {
                console.log("probando")
                statsHeroes.push({
                    y: parseInt(statsHeroeApi[stat]),
                    label : stat

                })
            }

            // Borrando la propiedad "x" que se me genera en el array de objetos
            for (var i = 0; i < statsHeroes.length; i++) {
                delete statsHeroes[i].x;
            }
            console.log(statsHeroes);
            $("#stats-heroe").CanvasJSChart(optionGrafico)



            // Inyectando variables en el HTML
            $(".card-title").text(nombreHeroe);
            $("#imagen-heroe").attr('src',imagenHeroe);
            $("#aliases").text(aliasesHeroe);
            $("#lugar-nacimiento").text(lugarNacimiento);
            $("#primera-aparicion").text(primeraAparicion);
            $("#estatura").text(estaturaHeroe);
            $("#peso-heroe").text(pesoHeroe);
          });
            // Hacemos aparecer los resultados
            $("#biografia-heroe").removeAttr('hidden');
            $("#stats-heroe").removeAttr('hidden');

        } // Termina api e inyecciones
         else {
            alert("Solo debes ingresar un número!");
            $("#superID").val("");
        }

    })
})