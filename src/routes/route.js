
const express = require('express');

const router = new express.Router();
const RoleController = require('../controllers/RoleController');
const CustomerController = require('../controllers/CustomerController');
const SupplierController = require('../controllers/SupplierController');
const UserController = require('../controllers/UserController');


// router.post('/employee', EmployeeController.InsertEmployee);
// router.get('/employees', EmployeeController.Index);

router.get('/roles', RoleController.show);
router.post('/role/store', RoleController.store);
router.get('/role/edit/:id', RoleController.edit);
router.put('/role/update', RoleController.update);
router.delete('/role/delete/:id', RoleController.delete)

router.get('/customers', CustomerController.show);
router.post('/customer/store', CustomerController.store);
router.get('/customer/edit/:id', CustomerController.edit);
router.put('/customer/update', CustomerController.update);
router.delete('/customer/delete/:id', CustomerController.delete)

router.get('/suppliers', SupplierController.show);
router.post('/supplier/store', SupplierController.store);
router.get('/supplier/edit/:id', SupplierController.edit);
router.put('/supplier/update', SupplierController.update);
router.delete('/supplier/delete/:id', SupplierController.delete)

router.get('/users', UserController.show);
router.post('/user/store', UserController.store);
router.get('/user/edit/:id', UserController.edit);
router.put('/user/update', UserController.update);
router.delete('/user/delete/:id', UserController.delete)


module.exports = router;

