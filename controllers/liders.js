const { response, request } = require('express');

const Lider = require('../models/lider');
const Empleado = require('../models/empleado');

const liders_Post = async(req, res = response) => {
    const { nombre, rol, departamento } = req.body;
    const lider = new Lider({ nombre, rol, departamento });

    await lider.save();

    res.json(lider);
}

const liders_Get = async(req = request, res = response) => {
    const liders = await Lider.find({});

    res.json(liders);
}

const lider_Get = async(req = request, res = response) => {
    const { id } = req.params;
    const lider = await Lider.findById(id, 'nombre rol -_id')
        .populate({
            path: 'departamento',
            select: 'nombre',
            populate: {
                path: 'empresa',
                select: 'nombre -_id'
            }
        });

    const empleados = await Empleado.find({ departamento: lider.departamento._id }, 'nombre -_id');

    res.json({
        nombre: lider.nombre,
        rol: lider.rol,
        departamento: lider.departamento.nombre,
        empresa: lider.departamento.empresa.nombre,
        empleados: empleados.map((empleado) => empleado.nombre)

    });
}

const liders_Put = async(req, res = response) => {
    const { id } = req.params;
    const { departamento } = req.body;

    const lider = await Lider.findByIdAndUpdate(id, { departamento });

    res.json(lider);
}

const liders_Delete = async(req, res = response) => {
    const { id } = req.params;
    const lider = await Lider.findByIdAndDelete(id);

    res.json(lider);
}

module.exports = {
    liders_Post,
    liders_Get,
    lider_Get,
    liders_Put,
    liders_Delete
}