#!/usr/bin/env node
 const mdLinks = require('./md.js');
 const chalk = require('chalk');
 const figlet = require('figlet');
  
 // Variable route que contiene el argumento pasado en la consola 

 const route = process.argv[2];
 const optionsOne = process.argv[3];
 const optionsTwo = process.argv[4]; 
 
 // texto bienvenida mdlinks Chalk - color figlet - 
 console.log(chalk.magentaBright(figlet.textSync('MdLinks', { horizontalLayout: 'full' })));
 
 // Comprobar si recibe como option --validate 
 let isValidate = (optionsOne === '--validate') || (optionsOne === '--v') ? true : false;
 let isStats = (optionsTwo === '--stats') || (optionsTwo === '--s') ? true : false;


// md-links ./readme2.md --validate 
mdLinks(route, {validate: isValidate, stats: isStats})

.then((res) => console.log(res))
.catch((err) => console.log(err))  
  