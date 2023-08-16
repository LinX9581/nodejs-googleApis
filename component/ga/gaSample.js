import * as googleApis from "../../api/googleApis/gaCustom";
import moment from "moment";

let allIds = config.ga4ViewId.ga4AllIds

// getTop10();
export async function getTop10() {
  let gaDate = moment(new Date()).add(-1, "days").format("YYYY-MM-DD");
  let metrics, dimension;

  metrics = [{ name: "screenPageViews" }];
  dimension = [{ name: "pageTitle" }];
  let ga4Data = await googleApis.ga4Custom(allIds, gaDate, gaDate, metrics, dimension, "", "", "10");
  console.log(ga4Data);
}

