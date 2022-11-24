import * as googleApis from '../api/googleApis/gaCustom'
import '../component/gs/sheetSample'
import '../component/youtube/youtubeSample'

// test()
export async function test() {
    try {
        let gaDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');

        // ga3
        let ga3Data = await googleApis.gaCustom(config.gaViewId.ga3AllIds, gaDate, gaDate, "ga:pageviews, ga:1dayUsers, ga:sessions, ga:pageviewsPerSession", "ga:date");
        console.log(ga3Data);

        // ga4
        let ga4Data = await googleApis.ga4Custom(config.gaViewId.ga4AllIds, gaDate, gaDate, 'screenPageViews', 'pageTitle');
        console.log(ga4Data);

        // sheet
        await googleApis.updateGsSheet(config.sheetId.test, 'test1' + '!A1', [
            ['1asdasd']
        ])

        await googleApis.createGsSheet(config.sheetId.test, '123')
        await sleep(1000)
    } catch (error) {
        console.log(error);
    }
}

// every day import data to database or create sheet
// schedule.scheduleJob('0 0 12 * * *', async function() {
//     try {
//         let gaDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
//         let allGaMetrics = await googleApis.gaCustom(config.gaViewId.ga3AllIds, gaDate, gaDate, "ga:pageviews, ga:1dayUsers, ga:sessions, ga:pageviewsPerSession", "ga:date");
//         let pagePerUser = allGaMetrics[0][4]
//         let sessionPerUser = allGaMetrics[0][3] / allGaMetrics[0][2]
//         let insertMetricsData = [allGaMetrics[0][0], allGaMetrics[0][1], allGaMetrics[0][2], allGaMetrics[0][3], Number(pagePerUser).toFixed(2), sessionPerUser.toFixed(2)]
//             // await query('INSERT INTO www.ga_metrics (date,pageviews,users,sessions,page_per_user,session_per_user) VALUES (?,?,?,?,?,?)', insertMetricsData)

//     } catch (error) {
//         console.log(error);
//     }
// })

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}