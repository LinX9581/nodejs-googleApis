export default {
  google: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
  googleOauth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_REDIRECT_URL,
  },
  ga4ViewId: {
    ga4AllIds: process.env.GA4_VIEW_ID,
  },
  mysql: {
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
  },
  sheetId: {
    test: process.env.SHEET_ID_TEST,
  },
  auth: {
    key: "auth",
  },
};
