const $axios = require('axios')

const api = 'http://hapi.fhir.org/baseR4'
const toUrlParams = (obj) => {
  return new URLSearchParams(obj).toString()
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
      url: `${api}/${req.params.resource}/${req.params.id}?${toUrlParams(
        req.query,
      )}`,
    })
      .then((r) => ({ total: r?.data?.entry?.length || 0, ...r.data }))
      .catch((e) => e)
  },
}
