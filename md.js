/* libreria de node.js que permite interactuar con el sistema de archivos (file system) */
const fs = require ('fs');
const fsp = require("fs").promises;
const path = require('path');
const modulPath = require('path');

/* Variable route contiene la ruta */
let route = process.argv[2];
route = path.normalize(route);
console.log('Esta es mi ruta ', route);
// validar ruta absoluta o si no convertirla -- path.resolve()devolverá la ruta absoluta del directorio de trabajo actual.
const validateRoute = (filePath) => path.resolve(filePath); 
console.log('Convertir en absoluta ',validateRoute (route));
// console.log('Es relativa', validateRoute(path))
// ext md
let fileMd = (path) => modulPath.extname(path) === '.md' ? true : false;

// 

// validar si es un directorio
const isDirectory = (path) => new Promise ((resolve, reject) =>  {
  fs.stat(path, (error,stats)=> {
    if (error) {
    reject('No se puede leer el directorio');
  } 
  console.log('¿Es Directorio?', stats.isDirectory())
    resolve(stats.isDirectory());
    if (stats.isDirectory() === true) {
      console.log('soy directorio');
    } else if (stats.isDirectory() === false) {
      console.log('es archivo md', fileMd(route)) 
    }
      
  });
});
isDirectory(route);

// leer contenido del archivo
const readingFile = (route) => { 
    fsp.readFile(route, 'utf-8')
    .then(function (result) {
      console.log("se lee el archivo " + result);
    })
    .catch(function (error) {
      console.log(error);
    })
}    

// node md.js 'C:\Users\ESTEF\Documents\Laboratoria\BOG003-md-links\md.js'