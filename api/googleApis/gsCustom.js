import { getGsAuth } from './googleApis'

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
    gsapi.spreadsheets.batchUpdate(createOpt, (err, response) => {
        console.log("sheet was delete")
        if (err) {
            console.log(err)
        } else {}
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
    gsapi.spreadsheets.batchUpdate(createOpt, (err, response) => {
        if (err) {
            console.log(err)
        } else {}
    });
}

export { createGsSheet, deleteGsSheet, updateGsSheet }