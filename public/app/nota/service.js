import { handlerStatus } from '../utils/promise-helpers.js';
import { partialize, compose } from '../utils/operations.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItemsByCode = (code, items) => items.filter(item => item.codigo == code);
const sumItemsValue = items => items.reduce((total, item) => total + item.valor, 0);

const sumItems = code => notas => notas
    .$flatMap(nota => nota.itens)
    .filter(item => item.codigo == code)
    .reduce((total, item) => total + item.valor, 0);

export const notasService = {

    listAll() {
        
        return fetch(API)
            .then(handlerStatus)
            .catch(err => {
                console.log(err);
                return Promise.reject('Não foi possível obter as notas fiscais')
            })
    },

    sumItems(code) {
        // const filterItems = filterItemsByCode.bind(null, code);
        const filterItems = partialize(filterItemsByCode, code);
        const sumItems = compose(sumItemsValue, filterItems, getItemsFromNotas);

        return this.listAll()
            // .then(notas => sumItemsValue(
            //     filterItems(
            //         getItemsFromNotas(notas)
            //     )
            // ));
            // outra forma de fazer a composição
            .then(sumItems)
    }
}