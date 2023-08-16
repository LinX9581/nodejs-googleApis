import { BetaAnalyticsDataClient } from '@google-analytics/data';

let { client_email, private_key } = config.google;

// GA4 API 還在 Beta 不是用 JWT
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: client_email,
        private_key: private_key,
    },
});

export async function ga4Custom(propertyId, startDate, endDate, metrics, dimensions, filter, order, results) {
    try {
      if (filter === '') filter = undefined
      if (dimensions === '') dimensions = undefined
      if (order === '') order = undefined
  
      let params = {
        property: `properties/${propertyId}`,
        dateRanges: [{
          startDate: startDate,
          endDate: endDate
        }],
        metrics: metrics,
        dimensions: dimensions,
        limit: results,
      }
  
      params['dimensionFilter'] = filter?.dimensionFilter
      params['metricFilter'] = filter?.metricFilter
      params['orderBys'] = order
      
      const [response] = await analyticsDataClient.runReport(params)
      
      let ga4DimenstionArray = []
      let ga4MetricsArray = []
      let ga4Data = []
  
      for (let i = 0; i < metrics.length; i++) {
        ga4MetricsArray = []
        response.rows.forEach((row) => {
          ga4MetricsArray.push(row.metricValues[i].value)
        })
        ga4Data[metrics[i].name] = ga4MetricsArray
      }
  
      for (let i = 0; i < dimensions.length; i++) {
        ga4DimenstionArray = []
        response.rows.forEach((row) => {
          ga4DimenstionArray.push(row.dimensionValues[i].value)
        })
        ga4Data[dimensions[i].name] = ga4DimenstionArray
      }
      return ga4Data
    } catch (error) {
      return 'error: ' + error
    }
}
