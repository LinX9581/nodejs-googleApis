import { getGaRtData, getGaData } from './googleApis'
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// GA4
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: config.google.clientEmail,
        private_key: config.google.privateKey,
    },
});

async function ga4Custom(propertyId, startDate, endDate, metrics, dimensions) {
    // Enabled Google Analytics Data API
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{
            startDate: startDate,
            endDate: endDate,
        }, ],
        metrics: [{
            name: metrics
        }],
        dimensions: [{
            name: dimensions,
        }, ],
    });

    let ga4DimenstionArray = []
    let ga4MetricsArray = []

    response.rows.forEach((row, index) => {
        if (index < 15) {
            ga4DimenstionArray.push(row.dimensionValues[0].value)
            ga4MetricsArray.push(row.metricValues[0].value)
        }
    });
    return [ga4DimenstionArray, ga4MetricsArray]
}

// Ga4 Muitiple Metrics
async function ga4Body() {
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{
            startDate: startDate,
            endDate: endDate,
        }, ],
        metrics: [{
                name: 'sessions',
            },
            {
                name: 'screenPageViews'
            }
        ],
        dimensions: [{
                name: 'country',
            },
            {
                name: 'region',
            },
            {
                name: 'city',
            },
        ],
        orderBys: [{
            metric: {
                metricName: "sessions"
            },
            desc: true
        }],
        metricFilter: {
            filter: {
                fieldName: 'sessions',
                numericFilter: {
                    operation: 'GREATER_THAN',
                    value: {
                        int64Value: 1000,
                    },
                },
            },
        },
        // muiltiple filter
        dimensionFilter: {
            andGroup: {
                expressions: [{
                        filter: {
                            fieldName: 'browser',
                            stringFilter: {
                                value: 'Chrome',
                            },
                        },
                    },
                    {
                        filter: {
                            fieldName: 'countryId',
                            stringFilter: {
                                value: 'US',
                            },
                        },
                    },
                ],
            },
        },
        dimensionFilter: {
            filter: {
                fieldName: 'eventName',
                stringFilter: {
                    value: 'first_open',
                },
            },
        },
        dimensionFilter: {
            notExpression: {
                filter: {
                    fieldName: 'pageTitle',
                    stringFilter: {
                        value: 'My Homepage',
                    },
                },
            },
        },
        // list filter
        dimensionFilter: {
            filter: {
                fieldName: 'eventName',
                inListFilter: {
                    values: [
                        'purchase',
                        'in_app_purchase',
                        'app_store_subscription_renew',
                    ],
                },
            },
        },
    });
}

// GA3 Realtime , allParams, mainParam

async function gaRtCustom(ids, metrics, dimensions) {

    let params = {
        'ids': 'ga:' + ids,
        'metrics': 'rt:' + metrics,
        'dimensions': 'rt:' + dimensions,
        'sort': '-rt:' + metrics,
        'max-results': 15,
    };

    return await getGaRtData(params);
}

async function gaAllCustom(ids, startDate, endDate, metrics, dimensions, sort, filters, startIndex) {

    if (filters == '') filters = undefined

    let params = {
        'ids': 'ga:' + ids,
        'start-date': startDate,
        'end-date': endDate,
        'metrics': metrics,
        'dimensions': dimensions,
        'sort': sort,
        'filters': filters,
        'start-index': startIndex,
        'max-results': 10000,
    };

    return await getGaData(params);
}

async function gaCustom(ids, startDate, endDate, dimension, date) {

    let params = {
        'ids': 'ga:' + ids,
        'start-date': startDate,
        'end-date': endDate,
        'metrics': dimension,
        'dimensions': date
    };

    return await getGaData(params);
}

export { gaRtCustom, gaAllCustom, gaCustom, ga4Custom }