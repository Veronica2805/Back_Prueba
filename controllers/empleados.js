const { response, request } = require('express');

const Empleado = require('../models/empleado');
const Lider = require('../models/lider');

const empleados_Post = async(req, res = response) => {
    const { nombre, rol, departamento } = req.body;
    const empleado = new Empleado({ nombre, rol, departamento });

    await empleado.save();

    res.json(empleado);
}

const empleados_Get = async(req = request, res = response) => {
    const empleados = await Empleado.find({});

    res.json(empleados);
}

const empleado_Get = async(req = request, res = response) => {
    const { id } = req.params;
    const empleado = await Empleado.findById(id, 'nombre rol -_id')
        .populate({
            path: 'departamento',
            select: 'nombre',
            populate: {
                path: 'empresa',
                select: 'nombre -_id'
            }
        });

    const lider = await Lider.findOne({ departamento: empleado.departamento._id }, 'nombre -_id');

    res.json({
        nombre: empleado.nombre,
        rol: empleado.rol,
        lider: lider?.nombre || null,
        departamento: empleado.departamento.nombre,
        empresa: empleado.departamento.empresa.nombre

    });
}

const empleado_Put = async(req, res = response) => {
    const { id } = req.params;
    const { departamento } = req.body;

    const empleado = await Empleado.findByIdAndUpdate(id, { departamento });

    res.json(empleado);
}

const empleado_Delete = async(req, res = response) => {
    const { id } = req.params;
    const empleado = await Empleado.findByIdAndDelete(id);

    res.json(empleado);
}

module.exports = {
    empleados_Post,
    empleados_Get,
    empleado_Get,
    empleado_Put,
    empleado_Delete
}