// método para receber somente um parametro
export const partialize = (fn, ...args) => fn.bind(null, ...args);

export const compose = (...fns) => value => 
    // reduceRigh: segundo parametro, valor incial
    fns.reduceRight((previousValue, fn) => 
        fn(previousValue), value);

export const pipe = (...fns) => value => 
    // reduceRigh: segundo parametro, valor incial
    fns.reduce((previousValue, fn) => 
        fn(previousValue), value);

export const takeUtil = (times, fn) => 
    () => times-- > 0 && fn();