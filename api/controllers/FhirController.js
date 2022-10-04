const $axios = require('axios')
require('dotenv').config

const api = 'http://hapi.fhir.org/baseR4'
const toUrlParams = (obj) => {
  return new URLSearchParams(obj).toString()
}

module.exports = {
  async getResource(req) {
    return await $axios({
      method: 'get',
      url: `${api}/${req.params.resource}?${toUrlParams(
        req.query,
      )}&identifier=${process.env.IDENTIFIER}`,
    })
      .then((r) => ({ total: r?.data?.entry?.length || 0, ...r.data }))
      .catch((e) => e)
  },
  async getResourceId(req) {
    return await $axios({
      method: 'get',
      url: `${api}/${req.params.resource}/${req.params.id}`,
    })
      .then((r) => ({ total: r?.data?.entry?.length || 0, ...r.data }))
      .catch((e) => e)
  },
  async postResource(req) {
    return await $axios({
      method: 'post',
      data: req.body,
      url: `${api}/${req.params.resource}`,
    })
      .then((r) => r.data)
      .catch((e) => e)
  },
}
