const { Schema, model } = require('mongoose');

const Empleado_Schema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del empleado es obligatorio']
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

Empleado_Schema.methods.toJSON = function() {
    const { __v, _id, ...empleado  } = this.toObject();
    empleado.id = _id;
    return empleado;
}

module.exports = model('Empleado', Empleado_Schema);