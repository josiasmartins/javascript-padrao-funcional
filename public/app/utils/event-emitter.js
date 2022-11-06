const events = new Map();

export const EventEmitter = {

    on(event, listener) {
        // set: Adicionamos novas chaves/valores através do método set.
        if (!events.has(event)) events.set(event, []);
        // get: através do método get obtermos o dado associado à chave passada como parâmetro para o método.
        events.get(event).push(listener);
    },

    emit(event, data) {
        // get: através do método get obtermos o dado associado à chave passada como parâmetro para o método.
        const listeners = events.get(event);
        if (listeners) 
            listeners.forEach(listener => listener(data));
    }

}