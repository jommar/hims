var express = require('express')
var router = express.Router()

const fhirController = require(`${global.appRoot}/controllers/FhirController.js`)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ data: { message: 'Welcome to FHIR API' } })
})
router.put('/:resource/:id', function (req, res, next) {
  res.send({ data: { message: 'Welcome to FHIR API2' } })
})
router.get('/:resource', async function (req, res, next) {
  res.send(await fhirController.getResource(req))
})
router.get('/:resource/:id', async function (req, res, next) {
  res.send(await fhirController.getResourceId(req))
})

module.exports = router
