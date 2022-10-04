const $axios = require('axios')
require('dotenv').config

const api = 'http://hapi.fhir.org/baseR4'
const toUrlParams = (obj) => {
  obj = addSort(obj)
  obj.identifier = process.env.IDENTIFIER
  return new URLSearchParams(obj).toString()
}
const addSort = (obj) => {
  console.log(obj)
  if (!obj._sort) {
    return { ...obj, _sort: '-_lastUpdated' }
  }
  return obj
}

module.exports = {
  async getResource(req) {
    return await $axios({
      method: 'get',
      url: `${api}/${req.params.resource}?${toUrlParams(req.query)}`,
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
