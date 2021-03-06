var Converter = require("csvtojson").Converter;
var json2csv = require("json2csv");
var fs = require('fs');
var converter = new Converter({});
var fields = ['Record ID','Negociacion'];


converter.on("end_parsed", function (jsonArray) {
    var e = 0;
for (var key in jsonArray) { //Se recorren las cuentas para obtener los datos de cada una
  if (jsonArray.hasOwnProperty(key)) {
     var negociaciones=jsonArray[key].Negociacion; // Se obtiene los Datos de Negociacion
     for (var key1 in negociaciones){ //Se recorren las negociaciones y se buscan que cumplen las condiciones para cambiarlo
     if(negociaciones[key1].Familia == '120' && (negociaciones[key1].SubFamilia == '66')){ //Datos condicionales.
     negociaciones[key1].Descuento = 10 ; 
     console.log('Cambio -> Familia:'+negociaciones[key1].Familia +'Sub:' +negociaciones[key1].SubFamilia + 'Descuento:' + negociaciones[key1].Descuento );
     }else{
     console.log("No cumplie -> Familia"+negociaciones[key1].Familia+'SubFamilia:'+ negociaciones[key1].SubFamilia);
     }
     }
     var aux = JSON.stringify(negociaciones);
    jsonArray[key].Negociacion = aux; // Esto es para darle el formato adecuado(No me lo generaba bien)
  }
}

 json2csv({ data: jsonArray, fields: fields }, function(err, csv) { // Conversion de los datos a CSV.
   if (err) console.log(err);
       fs.writeFile('cambioDescuento.csv', csv, function(err) {
   if (err) throw err;
    console.log('Se ha cambiado los valores, archivo guardado como cambioDescuento.csv');
  });
});

});

require("fs").createReadStream("./descuento.csv").pipe(converter);

 //console.log("No cumplie -> Familia"+negociaciones[key1].Familia+'SubFamilia:'+ negociaciones[key1].SubFamilia);
