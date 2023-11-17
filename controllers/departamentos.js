const { response, request } = require('express');

const Departamento = require('../models/departamento');
const Lider = require('../models/lider');
const Empleado = require('../models/empleado');

const departamentos_Post = async(req, res = response) => {
    const { nombre, empresa } = req.body;
    const departamento = new Departamento({ nombre, empresa });

    await departamento.save();

    res.json(departamento);
}

const departamentos_Get = async(req = request, res = response) => {
    const departamentos = await Departamento.find({});

    res.json(departamentos);
}

const departamento_Get = async(req = request, res = response) => {
    const { id } = req.params;
    const departamento = await Departamento.findById(id, 'nombre _id')
        .populate({
            path: 'empresa',
            select: 'nombre -_id'
        });

    const lider = await Lider.findOne({ departamento: departamento.id }, 'nombre -_id');
    const empleados = await Empleado.find({ departamento: departamento.id }, 'nombre -_id');

    res.json({
        nombre: departamento.nombre,
        empresa: departamento.empresa.nombre,
        lider: lider?.nombre || null,
        empleados: empleados.map((empleado) => empleado.nombre)
    });
}

const departamento_Put = async(req, res = response) => {
    const { id } = req.params;
    const { nombre, empresa } = req.body;

    const departamento = await Departamento.findByIdAndUpdate(id, { nombre, empresa });

    res.json(departamento);
}

const departamento_Delete = async(req, res = response) => {
    const { id } = req.params;
    const departamento = await Departamento.findByIdAndDelete(id);

    res.json(departamento);
}

module.exports = {
    departamentos_Post,
    departamentos_Get,
    departamento_Get,
    departamento_Put,
    departamento_Delete
}