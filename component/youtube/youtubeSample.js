import { google } from 'googleapis'
import fs from 'fs'

// oauth 建立完會有一組 client id 跟 client secret
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.googleOauth.clientId, config.googleOauth.clientSecret, config.googleOauth.redirectUrl);

// 執行過oauth的動作後 會存一份json file 取得後再把以下註解取消
// const token = fs.readFileSync('/root/.oauth/oauth.json', 'utf8')
// oauth2Client.credentials = JSON.parse(token);

// google.options({ auth: oauth2Client });
// const youtube = google.youtube({
//     version: 'v3',
//     auth: oauth2Client
// });

export async function getVideo(videoId) {
    let response = await youtube.videos.list({
        part: 'id,snippet,contentDetails,liveStreamingDetails,status',
        auth: oauth2Client,
        id: videoId,
        maxResults: 50,
    });
    return response.data
}

export async function getAllVideoDetail(videoId) {
    let response = await youtube.videos.list({
        part: 'id,snippet,contentDetails,fileDetails,liveStreamingDetails,localizations,player,processingDetails,recordingDetails,statistics,topicDetails,status',
        auth: oauth2Client,
        id: videoId,
        maxResults: 50,
    });
    return response.data
}

export async function getPlaylistItem(playlistId) {
    let response = await youtube.playlistItems.list({
        part: 'id,snippet,contentDetails,status',
        auth: oauth2Client,
        playlistId: playlistId,
        maxResults: 50,
    });

    let nextPageToken = response.data.nextPageToken
    let nextPage = ''

    while (nextPageToken != undefined) {
        nextPage = ''
        nextPage = await youtube.playlistItems.list({
            part: 'id,snippet,contentDetails,status',
            auth: oauth2Client,
            playlistId: playlistId,
            maxResults: 50,
            pageToken: nextPageToken
        });
        response.data.items = response.data.items.concat(nextPage.data.items)
        nextPageToken = nextPage.data.nextPageToken
        console.log(nextPageToken);
        await sleep(2000)
    }
    return response.data;
}

export async function deleteVideoFromPlaylist(playlistId, itemId) {
    let response = await youtube.playlistItems.delete({
        auth: oauth2Client,
        playlistId: playlistId,
        id: itemId,
    });
    return response.status;
}

export async function updateVideoStatus(videoId, videoStatus) {
    const response = await youtube.videos.update({
        part: 'id,snippet,status',
        auth: oauth2Client,
        requestBody: {
            id: videoId,
            status: {
                embeddable: true,
                privacyStatus: videoStatus,
            },
        },
    });
    return response.data
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}