
const { Router } = require('express');
const { check } = require('express-validator');

const { VerificarCampos } = require('../middlewares/validar-campos');
const { empleados_Post, empleado_Put, empleados_Get, empleado_Get, empleado_Delete } = require('../controllers/empleados');
const { verificarIdEmpleado, verificarIdDepartamento } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre del empleado es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('departamento', 'No es un ID válido').isMongoId(),
    check('departamento').custom(verificarIdDepartamento),
    VerificarCampos
] , empleados_Post);

router.get('/', empleados_Get);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdEmpleado),
    VerificarCampos
], empleado_Get);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdEmpleado),
    check('departamento', 'No es un ID válido').isMongoId(),
    check('departamento').custom(verificarIdDepartamento),
    VerificarCampos
], empleado_Put);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarIdEmpleado),
    VerificarCampos
], empleado_Delete);

module.exports = router;