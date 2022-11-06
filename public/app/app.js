import { delay, handlerStatus, log, timeoutPromise, retry } from './utils/promise-helpers.js';
import './utils/array-helpers.js'
import { notasService as service } from './nota/service.js';
import { debounceTime, partialize, pipe, takeUtil } from './utils/operations.js';
import { EventEmitter } from './utils/event-emitter.js';
import { Maybe } from './utils/maybe.js';

const value = Maybe.of(10)
    .map(value => value + 10)
    .map(value => value + 30)
    .getOrElse(0);
alert(value);

const textToArray = textM => textM.map(Array.from(textM));
const arrayToText = arrayM => arrayM.map(array => array.join(''));

const transform = pipe(textToArray, arrayToText);

const result = transform(Maybe.of(null));
alert(result.getOrElse(''));


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
    retry(3, 3000, () => timeoutPromise(200, service.sumItems('2143')))
        .then(total => EventEmitter.emit('itensTotalizados', total))
        .catch(console.log)
);

document
    .querySelector('#myButton')
    .onclick = action;
      