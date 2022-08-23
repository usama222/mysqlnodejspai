
const express = require('express');

const router = new express.Router();
const RoleController = require('../controllers/RoleController');
const CustomerController = require('../controllers/CustomerController');
const SupplierController = require('../controllers/SupplierController');
const UserController = require('../controllers/UserController');


// router.post('/employee', EmployeeController.InsertEmployee);
// router.get('/employees', EmployeeController.Index);

router.get('/roles', RoleController.show);
router.post('/roles/store', RoleController.store);
router.get('/roles/edit/:id', RoleController.edit);
router.put('/roles/update', RoleController.update);
router.delete('/roles/delete/:id', RoleController.delete)

router.get('/customers', CustomerController.show);
router.post('/customers/store', CustomerController.store);
router.get('/customers/edit/:id', CustomerController.edit);
router.put('/customers/update', CustomerController.update);
router.delete('/customers/delete/:id', CustomerController.delete)

router.get('/suppliers', SupplierController.show);
router.post('/suppliers/store', SupplierController.store);
router.get('/suppliers/edit/:id', SupplierController.edit);
router.put('/suppliers/update', SupplierController.update);
router.delete('/suppliers/delete/:id', SupplierController.delete)

router.get('/users', UserController.show);
router.post('/users/store', UserController.store);
router.get('/users/edit/:id', UserController.edit);
router.put('/ususerser/update', UserController.update);
router.delete('/users/delete/:id', UserController.delete)


module.exports = router;

