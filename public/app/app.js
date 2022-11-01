import { handlerStatus, log } from './utils/promise-helpers.js';
import './utils/array-helpers.js'

document
    .querySelector('#myButton')
    .onclick = () => 
        // fecth: api promisificada
        fetch('http://localhost:3000/notas')
        .then(handlerStatus)
        // .then(notas => notas.reduce((array, nota) => array.concat(nota.itens), []))
        .then(notas => notas
            .$flatMap(nota => nota.itens)
            .filter(item => item.codigo == '2143')
            .reduce((total, item) => total + item.valor, 0)
        )
        .then(console.log)
        .catch(console.log);