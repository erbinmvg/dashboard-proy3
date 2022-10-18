
(function() {


     



const url ="https://restcountries.com/v3.1/all";


const $input = document.querySelector("#countryInput");
const $btn = document.querySelector("#btnBuscar");

//$btn.addEventListener("click", function)
let arrPoblacionTotal = [];
let nombreContinente = [];

function getInfo(continente,arrPoblacionT,nombreCont){
    //-----Se resuelve la promesa devolviendo el Json de todos los paises
       fetch(url)
           .then(res=>{           
                let elJs = res.json()
              return elJs;        
            })
    
   
//-----Se resuelve la promesa creando nueva lista de Obj filtrando por
//-----el valor en la  key "subregion", que se pasa por parametro en la Funcion getInfo.       
        
        .then((data) => { 
                       
            let newArr = data.filter(e =>{
            return e.subregion === continente
            }); 
            return newArr;
            
        })

//-----Se resuelve la Promesa con el la lsita de Obj por subregion        
        .then(data => {

//-----Se imprime en consola el nombre de la subregion 
           console.log(data[0].subregion);
           nombreCont.push(data[0].subregion);
           
           
//-----Se crea una nueva lista con los datos de poblacion de cada pais en la subregion indicada
//-----por parametro en la Funcion getInfo
             let arrPoblacion = data.map(e => {
                return e.population;
             });
//-----Se guarda el total de la suma de todos los datos de poblacion en "arrPoblacion"             
             let totalP = arrPoblacion.reduce((a, b)=>{
                return a + b;
             })
//-----Se imprime en consola en total
            console.log(totalP);  
            arrPoblacionT.push(totalP)
        })

        .catch(err=>console.log(err))

       
}

function generaGrafico(nombreContLoc,arrPoblacionTLoc){
    nombre ='POBLACION POR SUBCONTINENTE';
    

    const graph = document.getElementById('graficoContinente');
    const myChart = new Chart(graph, {
        type: 'line',
        data: {
            labels: nombreContLoc,
            datasets: [{
                label: nombre,
                data: arrPoblacionTLoc,
                borderWidth: 1,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
            }],
        },
        options: {
        animations: {
            tension: {
            duration: 500,
            easing: 'linear',
            from: 2,
            to: 1,
            loop: true
            }
        },
        scales: {
            y: { // defining min and max so hiding the dataset does not change scale range
            min: 110000000,
            max: 15000000000
            }
        }
        }




    });  
}

    let arrySubcontinentes = ["Southern Europe","Eastern Asia","Southern Asia","Central Asia",
    "Western Asia","South-Eastern Asia","South America","North America","Central America",
    "Caribbean","Australia and New Zealand","Melanesia","Eastern Africa","Western Africa",
    "Northern Africa","Southern Africa"];

    for (var ind = 0; ind<arrySubcontinentes.length; ind++){
        getInfo(arrySubcontinentes[ind],arrPoblacionTotal,nombreContinente)
    }

    generaGrafico(nombreContinente,arrPoblacionTotal)



  

  
})();
  


