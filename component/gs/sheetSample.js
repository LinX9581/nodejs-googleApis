import * as googleApis from '../../api/googleApis/gsCustom'

// sheetSample()
export async function sheetSample() {
    await googleApis.updateGsSheet(config.sheetId.test, 'test1' + '!A1', [
        ['1asdasd']
    ])

    // sheetId,workTitle , workId must int (random num)
    await googleApis.createGsSheet(config.sheetId.test, '123')
    console.log('更新完成');
}