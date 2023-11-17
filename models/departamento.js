const { Schema, model } = require('mongoose');

const Departamento_Schema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del departamento es obligatorio']
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    }
});

Departamento_Schema.methods.toJSON = function() {
    const { __v, _id, ...departamento  } = this.toObject();
    departamento.id = _id;
    return departamento;
}

module.exports = model('Departamento', Departamento_Schema);