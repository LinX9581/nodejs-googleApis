import * as googleApis from '../../api/googleApis/gaCustom'

// getGa4Data()
async function getGa4Data() {
    let ga4Data = await googleApis.ga4Custom(config.gaViewId.ga4AllIds, '2022-11-21', '2022-11-21', 'screenPageViews', 'pageTitle');
    console.log(ga4Data);

    let ga3Data = await googleApis.gaCustom(config.gaViewId.ga3AllIds, '2022-11-21', '2022-11-21', "ga:pageviews, ga:1dayUsers, ga:sessions, ga:pageviewsPerSession", "ga:date");
    console.log(ga3Data);

}

export { getGa4Data }