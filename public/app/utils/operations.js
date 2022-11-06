/**
 * método que transforma funções que tem mais de um parametro em apenas um
 * @param {*} fn função
 * @param  {...any} args parametros
 * @returns retorna a função com somente um parametro
 */
export const partialize = (fn, ...args) => fn.bind(null, ...args);

export const compose = (...fns) => value => 
    // reduceRigh: segundo parametro, valor incial
    fns.reduceRight((previousValue, fn) => 
        fn(previousValue), value);

/**
 * realiza a composição das funcoes passada como parâmetro
 * @param  {...any} fns 
 * @returns retorna uma unica função
 */
export const pipe = (...fns) => value => 
    // reduceRigh: segundo parametro, valor incial
    fns.reduce((previousValue, fn) => 
        fn(previousValue), value);

/**
 * método para setar a quantidades de vezes que a função será executada
 * @param {*} times quantidades de vezes chamado
 * @param {*} fn função
 * @returns retorna a função
 */
export const takeUtil = (times, fn) => 
    () => times-- > 0 && fn();

/**
 *  método para setar um tempo antes de ser chamado novamente
 * 
 * @param {*} milliseconds tempo de espera
 * @param {*} fn função
 * @returns retorna a função passada (fn)
 */
export const debounceTime = (milliseconds, fn) => {
    let time = 0;
    return () => {
        clearTimeout(time);
        time = setTimeout(fn, milliseconds);
    }
}