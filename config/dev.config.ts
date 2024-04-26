const env = 'DEV';
export const DevConfig = {
  env,
  port: 4050,
  fv_token_secret_key: 'internal_secret_key',
  fv_token_expires_in: 360000,
  mongoDb: {
    db_topcv_url:
      'mongodb://221.132.33.183:27017/topcv',
}}
