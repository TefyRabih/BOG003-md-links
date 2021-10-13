#!/usr/bin/env node
 const mdLinks = require('./md.js');
 const axios = require("axios");
 
 // Variable route que contiene el argumento pasado en la consola 
 const route = process.argv[2];
 const optionsOne = process.argv[3];
 const optionsTwo = process.argv[4];
 
 
 // Comprobar si recibe como option --validate 
 let isValidate = (optionsOne === '--validate') ? true : false;
 let isStats = (optionsTwo === '--stats') ? true : false;


// md-links ./readme2.md --validate 
mdLinks(route, {validate: isValidate, stats: isStats})
.then(console.log)
.catch(console.log) 

