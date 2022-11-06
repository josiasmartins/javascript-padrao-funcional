import { handlerStatus } from '../utils/promise-helpers.js';
import { partialize, compose, pipe } from '../utils/operations.js';
import { Maybe } from '../utils/maybe.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo == code));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.valor, 0));

const sumItems = code => notas => notas
    .$flatMap(nota => nota.itens)
    .filter(item => item.codigo == code)
    .reduce((total, item) => total + item.valor, 0);

export const notasService = {

    listAll() {
        
        return fetch(API)
            .then(handlerStatus)
            .then(notas => Maybe.of(null))
            .catch(err => {
                console.log(err);
                return Promise.reject('Não foi possível obter as notas fiscais')
            })
    },

    sumItems(code) {
        // const filterItems = filterItemsByCode.bind(null, code);
        const filterItems = partialize(filterItemsByCode, code);
        const sumItems = pipe(
            getItemsFromNotas, 
            filterItems, 
            sumItemsValue
        );

        return this.listAll()
            // .then(notas => sumItemsValue(
            //     filterItems(
            //         getItemsFromNotas(notas)
            //     )
            // ));
            // outra forma de fazer a composição
            .then(sumItems)
            .then(result => result.getOrElse(0));
    }
}