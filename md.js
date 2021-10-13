// libreria de node.js que permite interactuar con el sistema de archivos (file system)
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const FileHound = require('filehound');

// Variable route contiene la ruta 
let route = process.argv[2];
route = path.normalize(route)
console.log('Esta es mi ruta ', route);
// validar ruta absoluta o si no convertirla -- path.resolve()devolverá la ruta absoluta del directorio de trabajo actual.
const validateRoute = path.resolve(route);
console.log('Convertir en absoluta ', validateRoute);
// console.log('Es relativa', validateRoute(path))

const mdLinks = (path, options) => isDirectory(path)
  .then((res) => {
    if (res === true) {
      return readDir(path);
    } else {
      return [path];
    }
  })
  .then((arrayList) => {
    console.log('archivo', fileMd(arrayList));
    return fileMd(arrayList);
  })
  .then(readfiles)
  .then((nestedObjects) => nestedObjects.flatMap((nestedObject) => nestedObject))
  .then((linkObjects)=>{
    if(options.validate){
      return 'Option validate';
    }
  })


// rutas de los archivos del directorio
const readDir = (path) => FileHound.create().paths(path).find();


// validar si es un archivo ext md y crea un nuevo arreglo archivos md
let fileMd = (pathList) => pathList.filter(file => path.extname(file) === '.md');

// recibe una ruta y retorna una promesa 
const isDirectory = (path) => new Promise((resolve, reject) => {
  fs.stat(path, (error, stats) => {
    if (error) {
      reject('No se puede leer el directorio');
    } else {
      resolve(stats.isDirectory());
    }
  })
});

// leer el archivo con extensión .md
const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(getLinks(data, path));

    })
  })
}

// Leer archivos de directorio
const readfiles = (routesMd) => {
  return Promise.all(routesMd.map(readFile));
}

// usando marked extrayendo propiedades (href, texto, file) 

const getLinks = (textfile, file) => {
  console.log('mio', file);
  let arrayLink = [];
  const renderer = new marked.Renderer();
  renderer.link = (href, _title, text) => {
    arrayLink.push({
      href: href,
      text: text,
      file: file,
    });
  }
  marked(textfile, { renderer: renderer });
  return arrayLink;
}

// Se recibe como option --Validate


// md.js 'C:\Users\ESTEF\Documents\Laboratoria\BOG003-md-links\md.js'

module.exports = mdLinks
