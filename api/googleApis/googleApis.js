import { google } from 'googleapis'

let { client_email, private_key } = config.google;

// GA3
const scopes = [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
];

const jwt = new google.auth.JWT(client_email, null, private_key, scopes)
jwt.authorize(function(err) {
    if (err) {
        console.log("Google Api Err" + err);
        return;
    }
})

export async function getGaData(params) {
    params['auth'] = jwt
    const gaApi = await google.analytics('v3').data.ga.get(params)
    return gaApi.data.rows;
}

export async function getGaRtData(params) {
    params['auth'] = jwt
    const gaRtApi = await google.analytics('v3').data.realtime.get(params)
    return gaRtApi.data.rows;
}

// Google Sheet
export async function getGsAuth() {
    const gsapi = await google.sheets({ version: 'v4', auth: jwt });
    return gsapi
}