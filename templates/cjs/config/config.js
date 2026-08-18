const path = require('node:path');

module.exports = {
  env_path: '.env',
  cors_enabled: false,
  max_body_size: '10mb',
  router_dir: path.join(process.cwd(), 'routes'),
  default_router: '/home',
  is_ajax: req => !!req.xhr,
  // Runs after .env is loaded and before the database models are initialized,
  // so anything written to process.env here reaches config/database.js.
  // Uncomment to keep the database password out of .env in plain text:
  //
  // hook_after_env_load: () => {
  //   if (process.env.DB_PASSWORD_B64)
  //     process.env.DB_PASSWORD = Buffer.from(process.env.DB_PASSWORD_B64, 'base64').toString();
  // },
  hook_handle_error: (error, req, res, next) => {
    console.error(error);
    if (error.status === 404)
      res.status(404).render('errors/404');
    else
      res.status(500).render('errors/500');
  },
};
