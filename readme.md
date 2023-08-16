# Nodejs Google Api Template

## Note
* Google Analytics 4
* Google Sheet
* Google Youtube
* BigQuery

## Quick Start
git clone 
yarn install

* need env
env format
```
# service account
GOOGLE_CLIENT_EMAIL=""
GOOGLE_PRIVATE_KEY=""

# oauth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REFRESH_TOKEN=""

# ga4 id 
GA4_VIEW_ID="274947839"

# sheet id
SHEET_ID_TEST=""

# db
db_host=
db_user=
db_password=
```
yarn start

add GOOGLE_CLIENT_EMAIL to ga,sheet viewer permissions

* tree
./api                     // ga3 ga4 sheet youtube search-console
./routes/allSchedule.js   // daily update data to db or sheet
./component               // api sample
./route                   // ga oauth youtube

# GA4 Note
* Metrics & Dimensions
https://developers.google.com/analytics/devguides/reporting/core/v4/advanced
https://support.google.com/analytics/answer/11242841?hl=en#zippy=%2Cin-this-article

* Online Query
https://ga-dev-tools.appspot.com/query-explorer/
https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/

* Dimensions
pageTitle
fullPageUrl
deviceCategory
firstUserDefaultChannelGrouping   //大項目
firstUserSourceMedium             
firstUserMedium
firstUserSource
firstUserCampaignName
unifiedScreenName     // realtime pageTitle

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
https://dns.sample.com/ga4/308596645/2022-10-25/2022-10-30/date/screenPageViews

* Request Body
[Official Document]
(https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunReports)

```
property: `properties/${propertyId}`,
dimensions: [
  {
    name: 'date',
  },
],
metrics: [
  {
    name: 'activeUsers',
  },
  {
    name: 'newUsers',
  },
],
dateRanges: [
  {
    startDate: '7daysAgo',
    endDate: 'today',
  },
],
dimensionFilter: {
  filter: {
    fieldName: "firstUserSource",
    stringFilter: { matchType: "CONTAINS", value: 'google', caseSensitive: false }
  }
},
orderBys: [
  {
    metric: {
      metricName: 'totalRevenue',
    },
    desc: true,
  },
],
```

## Oauth Note
1. Get Credentials
- GCP -> APIs & Services -> Credentails -> CREATE CREDENCIALS -> Create OAuth client ID -> Web application
- Input name , root doamin , root domain/oauth

2. Get clientId clientSecret redirectUrl
- ./route/oauthRoute

3. Scopes choose what you want
sample is youtube & search console

4. Store oauth token & get credentails
```
const token = fs.readFileSync('/root/.oauth/oauth.json', 'utf8')
oauth2Client.credentials = JSON.parse(token);
google.options({ auth: oauth2Client });
const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client
});
```
## Youtube Note

* Quota
- read list 1 unit
- Create Update Delete 50 unit
- search 100
- Insert 1600 unit
- total unit = 10000

* ref
- [youtube api document](https://developers.google.com/youtube/v3/docs)
- [other](https://www.pexels.com/zh-tw/search/videos/%E8%BE%A6%E5%85%AC%E5%AE%A4/)
- [nodejs oauth api ref](https://hackmd.io/@c36ICNyhQE6-iTXKxoIocg/S1eYdtA1P)


## BiqQuery Note
* Samples
https://github.com/googleapis/nodejs-bigquery/tree/main/samples