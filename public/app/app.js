import { handlerStatus, log, timeoutPromise } from './utils/promise-helpers.js';
import './utils/array-helpers.js'
import { notasService as service } from './nota/service.js';
import { debounceTime, partialize, pipe, takeUtil } from './utils/operations.js';

const operations = pipe(
    partialize(takeUtil, 3),
    partialize(debounceTime, 500)
)

const action = operations(() => 
    // service
    //     // fecth: api promisificada
    //     // fetch('http://localhost:3000/notas')
    //     // .then(handlerStatus)
    //     // .then(notas => notas.reduce((array, nota) => array.concat(nota.itens), []))
    //     .sumItems('2143')
    //     .then(console.log)
    //     .catch(console.log)
    timeoutPromise(200, service.sumItems('2143'))
        .then(console.log)
        .catch(console.log)
);

document
    .querySelector('#myButton')
    .onclick = action;
      