var Converter = require("csvtojson").Converter;
var json2csv = require("json2csv");
var fs = require('fs');
var converter = new Converter({});
var fields = ['Record ID','Negociacion'];
converter.on("end_parsed", function (jsonArray) {
   var k = jsonArray;
for (var key in jsonArray) {
  if (jsonArray.hasOwnProperty(key)) {
     var negociaciones=jsonArray[key].Negociacion;
     for (var key in negociaciones){
     if(negociaciones[key].Familia == 120 && (negociaciones[key].SubFamilia == 66)){
     negociaciones[key].Descuento = 12 ; 
     }
     }
  }
}
 json2csv({ data: jsonArray, fields: fields }, function(err, csv) {
   if (err) console.log(err);
       fs.writeFile('cambioDescuento.csv', csv, function(err) {
   if (err) throw err;
    console.log('Se ha cambiado los valores, archivo guardado como cambioDescuento.csv');
  });
});
});
require("fs").createReadStream("./descuento.csv").pipe(converter);
