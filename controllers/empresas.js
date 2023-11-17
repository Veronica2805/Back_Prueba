const { response, request } = require('express');

const Empresa = require('../models/empresa');

const empresas_Post = async(req, res = response) => {
    const { nombre } = req.body;
    const empresa = new Empresa({ nombre });

    await empresa.save();

    res.json(empresa);
}

const empresas_Get = async(req = request, res = response) => {
    const empresas = await Empresa.find({});

    res.json(empresas);
}

const empresa_Get = async(req = request, res = response) => {
    const { id } = req.params;
    const empresa = await Empresa.findById(id);

    res.json(empresa);
}

const empresas_Put = async(req, res = response) => {
    const { id } = req.params;
    const { nombre } = req.body;

    const empresa = await Empresa.findByIdAndUpdate(id, { nombre });

    res.json(empresa);
}

const empresas_Delete = async(req, res = response) => {
    const { id } = req.params;
    const empresa = await Empresa.findByIdAndDelete(id);

    res.json(empresa);
}

module.exports = {
    empresas_Post,
    empresas_Get,
    empresa_Get,
    empresas_Put,
    empresas_Delete
}