#!/usr/bin/env node
 const mdLinks = require('./mdLinks.js');
 const calculateStats = require('./stats.js');
 const chalk = require('chalk');
 const figlet = require('figlet');
  
 // Variable route que contiene el argumento pasado en la consola 

 const route = process.argv[2];
 const optionsOne = process.argv[3];
 const optionsTwo = process.argv[4]; 
 
 // texto bienvenida mdlinks Chalk - color figlet - 
 console.log(chalk.magentaBright(figlet.textSync('MdLinks', { horizontalLayout: 'full' })));
 
 // Comprobar si recibe como option --validate 
 let isValidate = (optionsOne === '--validate') ? true : false;
 let isStats = (optionsTwo === '--stats') || (optionsOne === '--stats') ? true : false;

 
// md-links ./readme2.md --validate 
mdLinks(route, {validate: isValidate})
.then((res) => {
 if (isStats) {
   if (isValidate) {
     // esto se ejecuta cuando especifiquen stats y validate
     const stadistics = calculateStats(res);
     console.log(stadistics);
   }else{
     // esto se ejecuta cuando especifiquen stats sin validate
    const stadistics = calculateStats(res);
    // quitar broken
    console.log(stadistics);
   }
 }else{
  if (isValidate) {
    // esto se ejecuta cuando no especifique stats pero si validate
  }else{
    // esto se ejecuta cuando no se especifiquen ninguna
    console.log(res);
  }
 }
})


// .catch((err) => console.log(err))  
