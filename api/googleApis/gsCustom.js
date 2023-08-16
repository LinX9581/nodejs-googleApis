import { google } from 'googleapis'

let { client_email, private_key } = config.google;

const scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
];

// jwt 用 service account 授權
const jwt = new google.auth.JWT(client_email, null, private_key, scopes)
jwt.authorize(function(err) {
    if (err) {
        console.log("Google Api Err" + err);
        return;
    }
})

// Google Sheet Auth
async function getGsAuth() {
    const gsapi = await google.sheets({ version: 'v4', auth: jwt });
    return gsapi
}

async function updateGsSheet(sheetId, range, values) {
    const gsapi = await getGsAuth()
    const updateOptions = {
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: { values: values }
    }
    await gsapi.spreadsheets.values.update(updateOptions)
}

async function deleteGsSheet(sheetId) {
    const gsapi = await getGsAuth()
    const createOpt = {
        "spreadsheetId": sheetId,
        "resource": {
            "requests": [{
                "deleteSheet": {
                    "sheetId": sheetId
                }
            }]
        }
    };
    gsapi.spreadsheets.batchUpdate(createOpt, (err) => {
        console.log("sheet was delete")
        if (err) {
            console.log(err)
        }
    });
}

async function createGsSheet(sheetId, workName) {
    const gsapi = await getGsAuth()
    const createOpt = {
        "spreadsheetId": sheetId,
        "resource": {
            "requests": [{
                "addSheet": {
                    "properties": {
                        "sheetId": Math.floor(Math.random() * 5), //int
                        "title": workName,
                    }
                }
            }]
        }
    };
    gsapi.spreadsheets.batchUpdate(createOpt, (err) => {
        if (err) {
            console.log(err)
        }
    });
}

export { createGsSheet, deleteGsSheet, updateGsSheet }