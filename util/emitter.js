/*
Emitter
*/"use strict"

var prime = require("../prime"),
    array = require("../es5/array")

module.exports = prime({

    on: function(event, fn){
        var listeners = this._listeners || (this._listeners = {}),
            events = listeners[event] || (listeners[event] = [])
        if (!events.length || array.indexOf(events, fn) === -1) events.push(fn)
        return this
    },

    off: function(event, fn){
        var listeners = this._listeners, events
        if (listeners && (events = listeners[event]) && events.length){
            var index = array.indexOf(events, fn)
            if (index > -1) delete events[index]
        }
        return this
    },

    emit: function(event){
        var listeners = this._listeners, events
        if (listeners && (events = listeners[event]) && events.length){
            var args = (arguments.length > 1) ? array.slice(arguments, 1) : []
            for (var i = 0; i < events.length; i++){
                var evt = events[i]
                if (evt) evt.apply(this, args)
                else events.splice(i--, 1)
            }
        }
        return this
    }

})
