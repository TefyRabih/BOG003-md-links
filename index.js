#!/usr/bin/env node
 const mdLinks = require('./mdLinks.js');
 const calculateStats = require('./stats.js');
 const chalk = require('chalk');
 const figlet = require('figlet');
 /* const inquirer = require('inquirer');

  inquirer.prompt([{
  name: 'path',
  message: 'por favor ingrese la ruta del archivo o directorio'
},{
  type: 'list',
  name: 'options',
  message: 'Por favor escoja entre las opciones',
  choices: ['--validate', '--stats', '--validate--stats']
}])
.then(res => {
  return mdLinks(res.path, res.options)
})
.then(res => console.log(res))
.catch(error => console.error(error)) */
  
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
     // esto se ejecuta cuando se especifique --stats y --validate
     const stadistics = calculateStats(res);
     console.log(stadistics);
   }else{
     // esto se ejecuta cuando solo especifiquen --stats 

    const stadisticsStats = {
    Total: calculateStats(res).totalLinks,
    Unique: calculateStats(res).unique,
    }
    console.log(stadisticsStats);
   }
 }else{
    // esto se ejecuta cuando no se especifiquen ninguna
  console.log(res);
 }
})
.catch((err) => chalk.red(err));
