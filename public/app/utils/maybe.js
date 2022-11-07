/**
 * A mônada Maybe é um Functor.
 * 
 *  Porque quando temos um valor embrulhado por outro tipo não 
 * podemos aplicar uma função normalmente no valor. O Functor 
 * possui métodos especializados para interagir/modificar o valor.
 * 
 * Mônadas brilham em uma abordagem funcional.
 * 
 *  Se realizamos a composição de funções e não as 
 * reutilizamos em outros cenários nos quais podem ser 
 * interessantes utilizar o tipo monádico adicionará uma 
 * complexidade desnecessária ao código.
 */
export class Maybe {

    constructor(value) {
        this._value = value;
    }

    static of(value) {

        return new Maybe(value);
    }

    isNothing() {
        return this._value === null || this._value === undefined;
    }

    map(fn) {

        if (this.isNothing()) return Maybe.of(null);
        return Maybe.of(fn(this._value));
    }

    /**
     * Retorna o valor embrulhado pela mônada. Porém, 
     * se o método receber um valor, é este valor que será 
     * retornado caso a mônada embrulhe um valor null ou undefined.
     * @param {*} value 
     * @returns 
     */
    getOrElse(value) {
        if (this.isNothing()) return value;
        return this._value;
    }
}