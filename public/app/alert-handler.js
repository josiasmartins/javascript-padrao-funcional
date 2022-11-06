import { EventEmitter } from './utils/event-emitter.js';

EventEmitter.on('itensTotalizados', total => console.log(total) && alert(total))