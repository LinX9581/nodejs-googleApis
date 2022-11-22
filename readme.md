# Nodejs Google Api Template

## Note
Google Analytics 3 4
Google Sheet
Google Youtube

## Quick Start
git clone 
yarn install

* need config.js & mysql-connect.js
config.js format
```
export default {
    google: {
      {service account json}
    },
    gaViewId: {
      ga4AllIds: '',
      ga3AllIds: '',
    },
    mysql: {
        host: '127.0.0.1',
        user: '',
        password: ''
    },
    sheetId: {
        test: 'sheetId',
    }
};
yarn start

```

* tree
api         ./api
allSchedule ./routes/allSchedule.js
sample      ./component


# GA4 Note

* Metrics & Dimensions
https://developers.google.com/analytics/devguides/reporting/core/v4/advanced

* Dimensions
pageTitle
fullPageUrl
defaultChannelGrouping // source但撈出來空的
deviceCategory
firstUserDefaultChannelGrouping   //大項目
firstUserSourceMedium             //細項

* Metrics
screenPageViews
activeUsers
newUsers
userEngagementDuration

* Realtime data metrics
https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-api-schema

* Nodejs
https://7nohe-tech-blog.vercel.app/post/node-js-google-analytics-4-ga4-contentful-google-analytics-data-api
https://googleapis.dev/nodejs/analytics-data/latest/
https://stackoverflow.com/users/14466144/brett

* rest api -> ./routes/index-router.js
https://dns.sample.com/ga3/106152872/2022-05-20/2022-05-27/date/pageViews
https://dns.sample.com/ga4/308596645/2022-10-25/2022-10-30/date/screenPageViews

* Request Body
[Official Document]
(https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunReports)

* result
{
  "metricHeaders": [
    {
      "name": "sessions",
      "type": "TYPE_INTEGER"
    }
  ],
  "rows": [
    {
      "dimensionValues": [
        {
          "value": "20210104"
        }
      ],
      "metricValues": [
        {
          "value": "12900"
        }
      ]
    },
    {
      "dimensionValues": [
        {
          "value": "20210105"
        }
      ],
      "metricValues": [
        {
          "value": "10700"
        }
      ]
    },
    {
      "dimensionValues": [
        {
          "value": "20210106"
        }
      ],
      "metricValues": [
        {
          "value": "11300"
        }
      ]
    }
  ],
  "metadata": {},
  "dimensionHeaders": [
    {
      "name": "date"
    }
  ],
  "rowCount": 3
}

```
{
  "property": string,
  "dimensions": [
    {
      object (Dimension)
    }
  ],
  "metrics": [
    {
      object (Metric)
    }
  ],
  "dateRanges": [
    {
      object (DateRange)
    }
  ],
  "dimensionFilter": {
    object (FilterExpression)
  },
  "metricFilter": {
    object (FilterExpression)
  },
  "offset": string,
  "limit": string,
  "metricAggregations": [
    enum (MetricAggregation)
  ],
  "orderBys": [
    {
      object (OrderBy)
    }
  ],
  "currencyCode": string,
  "cohortSpec": {
    object (CohortSpec)
  },
  "keepEmptyRows": boolean,
  "returnPropertyQuota": boolean
}
```

## GA3 Note
* Online Query
https://ga-dev-tools.appspot.com/query-explorer/
https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/

* Metrics
https://developers.google.com/analytics/devguides/reporting/core/v3/common-queries#top-content

* Realtime Dimention
https://developers.google.com/analytics/devguides/reporting/realtime/dimsmets/trafficsources

* Other
https://www.youtube.com/watch?v=MiPpQzW_ya0
https://blog.mintsu-dev.com/posts/2019-07-16-nuxtjs-google-analytics-api/