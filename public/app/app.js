import { handlerStatus, log } from './utils/promise-helpers.js';
import './utils/array-helpers.js'
import { notasService as service } from './nota/service.js';
import { debounceTime, takeUtil } from './utils/operations.js';

const action = debounceTime(500, 
    takeUtil(3, () => 
        service
            // fecth: api promisificada
            // fetch('http://localhost:3000/notas')
            // .then(handlerStatus)
            // .then(notas => notas.reduce((array, nota) => array.concat(nota.itens), []))
            .sumItems('2143')
            .then(console.log)
            .catch(console.log)
    )
)

document
    .querySelector('#myButton')
    .onclick = action;
      