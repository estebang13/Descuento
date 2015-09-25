var Converter = require("csvtojson").Converter;
var converter = new Converter({});

 
converter.on("end_parsed", function (jsonArray) {
   var k = jsonArray;
for (var key in jsonArray) {
  if (jsonArray.hasOwnProperty(key)) {
     var id= JSON.stringify(jsonArray[key].ID);
     console.log(" ");
     console.log(id);
     console.log("");
     console.log(key + " -> " + JSON.stringify(jsonArray[key].Negociacion));
     var Negociaciones = new Array();
     Negociaciones = JSON.stringify(jsonArray[key].Negociaciones[1].Familia);
     console.log(" ");
     console.log("->"+Negociaciones);
     console.log(" ");
  
  }
}
});


require("fs").createReadStream("./descuento.csv").pipe(converter);
