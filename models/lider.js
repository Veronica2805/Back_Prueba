const { Schema, model } = require('mongoose');

const Lider_Schema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del lider es obligatorio']
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    }
});

Lider_Schema.methods.toJSON = function() {
    const { __v, _id, ...lider  } = this.toObject();
    lider.id = _id;
    return lider;
}

module.exports = model('Lider', Lider_Schema);