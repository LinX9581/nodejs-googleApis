import query from '../mysql-connect';
import moment from 'moment';
import express from 'express';
import { ga4Custom, ga3Custom } from '../component/ga/gaSample.js';
const router = express.Router();

// test()
async function test() {
    let ga4Data = await ga4Custom('308596645', '2022-10-30', '2022-10-30', 'screenPageViews', 'firstUserDefaultChannelGrouping');
    console.log(ga4Data);
}

router.get('/', async function(req, res, next) {
    res.send(JSON.stringify({
        "test": "zxc"
    }));
});
router.get('/ga4/:id/:startDate/:endDate/:dimensions/:metrics', async function(req, res, next) {
    console.log('ga4')
    console.log(req.params.id, req.params.startDate, req.params.endDate, req.params.dimensions, req.params.metrics);
    let ga4Data = await ga4Custom(req.params.id, req.params.startDate, req.params.endDate, req.params.dimensions, req.params.metrics);
    res.send(JSON.stringify({
        "ga4Data": ga4Data
    }));
});
router.get('/ga4/:id/:startDate/:endDate/:dimensions/:metrics', async function(req, res, next) {
    console.log('ga4')
    let ga4Data = await ga4Custom(req.params.id, req.params.startDate, req.params.endDate, req.params.dimensions, req.params.metrics);
    res.send(JSON.stringify({
        "ga4Data": ga4Data
    }));
});
router.get('/ga3/:id/:startDate/:endDate/:dimensions/:metrics', async function(req, res, next) {
    let ga3Data = await ga3Custom(req.params.id, req.params.startDate, req.params.endDate, req.params.dimensions, req.params.metrics);
    res.send(JSON.stringify({
        "ga3Data": ga3Data
    }));
});

export default router;