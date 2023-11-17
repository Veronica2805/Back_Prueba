const Empresa = require('../models/empresa');
const Departamento = require('../models/departamento');
const Lider = require('../models/lider');
const Empleado = require('../models/empleado');

const verificarIdEmpresa = async(id) => {
    const verificarEmpresa = await Empresa.findById(id);
    if (!verificarEmpresa) {
        throw new Error(`El id ${id} no existe`);
    }
}

const verificarIdDepartamento = async(id) => {
    const verificarDepartamento = await Departamento.findById(id);
    if (!verificarDepartamento) {
        throw new Error(`El id ${id} no existe`);
    }
}

const verificarIdLider = async(id) => {
    const verificarLider = await Lider.findById(id);
    if (!verificarLider) {
        throw new Error(`El id ${id} no existe`);
    }
}

const verificarIdEmpleado = async(id) => {
    const verificarEmpleado = await Empleado.findById(id);
    if (!verificarEmpleado) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    verificarIdEmpresa,
    verificarIdDepartamento,
    verificarIdLider,
    verificarIdEmpleado
}