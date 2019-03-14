const express = require('express');
const cars = require('./cars.route');
const accounts = require('./accounts.route');


export default function (router, context) {

    router.use('/cars', (req, res, next) => {
        context.logger.info('Saw request, method=' + 'Trial /cars' + req.method);
        next();
    }, cars);

    router.use('/accounts', (req, res, next) => {
        context.logger.info('Saw request, method=' + 'Trial /accounts' + req.method);
        next();
    }, accounts);
}