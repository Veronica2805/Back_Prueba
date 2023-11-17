
const { Router } = require('express');
const { check } = require('express-validator');

const { VerificarCampos } = require('../middlewares/validar-campos');
const { liders_Post, liders_Put, liders_Get, lider_Get, liders_Delete } = require('../controllers/liders');
const { verificarIdLider, verificarIdDepartamento } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre del lider es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('departamento', 'No es un ID válido').isMongoId(),
    check('departamento').custom(verificarIdDepartamento),
    VerificarCampos
] , liders_Post);

router.get('/', liders_Get);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdLider),
    VerificarCampos
], lider_Get);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( verificarIdLider ),
    check('departamento', 'No es un ID válido').isMongoId(),
    check('departamento').custom(verificarIdDepartamento),
    VerificarCampos
], liders_Put);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdLider),
    VerificarCampos
], liders_Delete);

module.exports = router;