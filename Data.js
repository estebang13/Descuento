var Converter = require("csvtojson").Converter;
var json2csv = require("json2csv");
var fs = require('fs');
var converter = new Converter({});
var fields = ['Nombre','Descuento','Familia','SubFamilias'];

var final = {};

converter.on("end_parsed", function (jsonArray) {
	var data1 = [];
for (var key in jsonArray) { //Se recorren las cuentas para obtener los datos de cada una
  if (jsonArray.hasOwnProperty(key)) {
     var negociaciones=jsonArray[key].Negociacion; // Se obtiene los Datos de Negociacion
     var Nombre = null;
     var Descuento = "";
     var Familia = "";
     var SubFamilia = [] ; 
     for (var key1 in negociaciones){ //Se recorren las negociaciones y se buscan que cumplen las condiciones para cambiarlo
     if(negociaciones[key1].Familia == '012' && (negociaciones[key1].Descuento == '25')){ //Datos condicionales.
     Nombre = jsonArray[key].Nombre; //agrega los valores respectivos para hacer el ingreso porterior
     Descuento = negociaciones[key1].Descuento;
     Familia = negociaciones[key1].Familia;
     SubFamilia.push({"Subfamilia" : negociaciones[key1].SubFamilia}) // Array de SubFamilias
     }
     }
     if(Nombre!=null){
     console.log('Agrego -> Familia:'+Nombre+"Descuento"+Descuento+"Familia"+Familia+"SubFamilias"+SubFamilia);
     data1.push({ 
        "Nombre" : Nombre,
        "Descuento" : Descuento,
        "Familia" : Familia,
        "SubFamilias" : SubFamilia
    });}
     final.data1 = data1;
  }
}

 json2csv({ data: data1, fields: fields }, function(err, csv) { // Conversion de los datos a CSV.
   if (err) console.log(err);
       fs.writeFile('Filtro.csv', csv, function(err) {
   if (err) throw err;
    console.log('Archivo guardado como FiltroListo.csv');
  });
});

});

require("fs").createReadStream("./filtrar.csv").pipe(converter);

 //console.log("No cumplie -> Familia"+negociaciones[key1].Familia+'SubFamilia:'+ negociaciones[key1].SubFamilia);
