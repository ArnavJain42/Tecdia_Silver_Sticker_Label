const express = require('express');
const router = express.Router();

const label1 = require('../controllers/label1');
const label2 = require('../controllers/label2');
const label3 = require('../controllers/label3');
const label4 = require('../controllers/label4');
const { renderConfirmationPage } = require('../views/confirmPage');

// Handle GET confirmation pages
router.get('/1', (req, res) => renderConfirmationPage(req, res, '1'));
router.get('/2', (req, res) => renderConfirmationPage(req, res, '2'));
router.get('/3', (req, res) => renderConfirmationPage(req, res, '3'));
router.get('/4', (req, res) => renderConfirmationPage(req, res, '4'));

// Handle POST print actions
router.post('/1', label1);
router.post('/2', label2);
router.post('/3', label3);
router.post('/4', label4);

module.exports = router;
