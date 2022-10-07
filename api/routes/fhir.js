var express = require('express')
var router = express.Router()

const fhirController = require(`${global.appRoot}/controllers/FhirController.js`)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ data: { message: 'Welcome to FHIR API' } })
})
router.put('/:resource/:id', async function (req, res, next) {
  res.send(await fhirController.putResource(req))
})
router.post('/:resource', async function (req, res, next) {
  res.send(await fhirController.postResource(req))
})
router.get('/:resource', async function (req, res, next) {
  res.send(await fhirController.getResource(req))
})
router.get('/:resource/:id', async function (req, res, next) {
  res.send(await fhirController.getResourceId(req))
})

module.exports = router
