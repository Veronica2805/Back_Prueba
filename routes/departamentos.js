
const { Router } = require('express');
const { check } = require('express-validator');

const { VerificarCampos } = require('../middlewares/validar-campos');
const { departamentos_Post, departamento_Put, departamentos_Get, departamento_Get, departamento_Delete } = require('../controllers/departamentos');
const { verificarIdDepartamento, verificarIdEmpresa } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre del departamento es obligatorio').not().isEmpty(),
    check('empresa', 'No es un ID válido').isMongoId(),
    check('empresa').custom(verificarIdEmpresa),
    VerificarCampos
] , departamentos_Post);

router.get('/', departamentos_Get);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdDepartamento),
    VerificarCampos
], departamento_Get);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdDepartamento),
    check('nombre', 'El nombre del departamento es obligatorio').not().isEmpty(),
    check('empresa', 'No es un ID válido').isMongoId(),
    check('empresa').custom(verificarIdEmpresa),
    VerificarCampos
], departamento_Put);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdDepartamento),
    VerificarCampos
], departamento_Delete);

module.exports = router;