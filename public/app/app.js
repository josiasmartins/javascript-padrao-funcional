import { handlerStatus, log } from './utils/promise-helpers.js';
import './utils/array-helpers.js'
import { notasService as service } from './nota/service.js';

document
    .querySelector('#myButton')
    .onclick = () => 
        service
            // fecth: api promisificada
            // fetch('http://localhost:3000/notas')
            // .then(handlerStatus)
            // .then(notas => notas.reduce((array, nota) => array.concat(nota.itens), []))
            .sumItems('2143')
            .then(console.log)
            .catch(console.log);