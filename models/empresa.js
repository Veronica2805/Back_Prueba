const { Schema, model } = require('mongoose');

const Empresa_Schema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio']
    }
});

Empresa_Schema.methods.toJSON = function() {
    const { __v, _id, ...empresa  } = this.toObject();
    empresa.id = _id;
    return empresa;
}

module.exports = model('Empresa', Empresa_Schema);