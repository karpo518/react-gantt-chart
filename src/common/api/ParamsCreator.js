export const endpoints = {
  CHART: 'chart.php'
}

export const methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const ParamsCreator = {
  getChart() {
    return {url: endpoints.CHART, method: methods.GET}
  }
}