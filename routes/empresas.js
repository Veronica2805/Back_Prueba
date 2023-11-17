
const { Router } = require('express');
const { check } = require('express-validator');

const { VerificarCampos } = require('../middlewares/validar-campos');
const { empresas_Post, empresas_Put, empresas_Get, empresa_Get, empresas_Delete } = require('../controllers/empresas');
const { verificarIdEmpresa } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre de la empresa es obligatorio').not().isEmpty(),
    VerificarCampos
] , empresas_Post);

router.get('/', empresas_Get);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdEmpresa),
    VerificarCampos
], empresa_Get);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdEmpresa),
    check('nombre', 'El nombre de la empresa es obligatorio').not().isEmpty(),
    VerificarCampos
], empresas_Put);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdEmpresa),
    VerificarCampos
], empresas_Delete);

module.exports = router;