# Changelog

All notable changes to this project will be documented in this file.

## [5.0.0] - 2026-03-13

### Breaking Changes

- **Removed `-p, --port` CLI option** — Port is now configured via `.env` (`PORT=3000`) in the generated app instead of at generation time.

### Changed

- **express-sweet v5** — Generated apps now target express-sweet v5.0.0 with its latest features and improvements.
- **SQLite by default** — Generated apps now use SQLite instead of MySQL/MariaDB. Run `npm run setup` to create the database.
- Updated CLI dependency `ejs` from v3 to v5.

## [4.0.0] - 2025-12-19

### Breaking Changes

- **Express 5 support** — Generated apps now run on Express 5.2.1. Requires Node.js 18+.
- **express-sweet v4** — Generated apps now target express-sweet v4.0.0. See the [express-sweet CHANGELOG](https://github.com/shumatsumonobu/express-sweet/blob/main/CHANGELOG.md) for details.

### Added

- **File uploads** — New `config/upload.js` template with Multer integration. Supports single file, multi-file, and multi-field uploads with memory or disk storage.

### Changed

- Route path patterns now use Express 5 RegExp syntax with named capture groups (e.g. `/^\/(?<userId>\d+)$/` instead of `/:userId(\\d+)`).

### Migration

New projects get Express 5 automatically. For existing projects:

1. Upgrade to Node.js 18+
2. Set `"express-sweet": "^4.0.0"` in `package.json`
3. Update route path patterns from Express 4 string syntax to RegExp ([Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html))

## [3.0.1] - 2025-09-02

### Changed

- Database config template now includes connection pool configuration examples.

## [3.0.0] - 2025-08-26

### Breaking Changes

- **express-sweet v3** — Generated apps now target express-sweet v3.0.0 with improved database connection management. See the [express-sweet CHANGELOG](https://github.com/shumatsumonobu/express-sweet/blob/main/CHANGELOG.md) for details.

### Added

- **HTTP logging config** — New `config/logging.js` template for Morgan logging with configurable format and skip rules.

### Migration

New projects get the new database architecture automatically. For existing projects, update to `express-sweet@^3.0.0` and follow the migration guide in the [express-sweet CHANGELOG](https://github.com/shumatsumonobu/express-sweet/blob/main/CHANGELOG.md).

## [2.0.23] - 2025-08-25

### Changed

- **Security** — Updated CLI dependencies: commander 2.15.1 → 14.0.0, ejs 2.6.1 → 3.1.10, fs-extra 9.1.0 → 11.3.1.
- **Port forwarding** — The `-p, --port` CLI option now injects the port into the generated `npm start` script (e.g. `express-sweet -p 4000 myapp` → `"start": "PORT=4000 nodemon ..."`).

## [2.0.22] - 2025-08-12

### Changed

- Updated template dependency `express-sweet` to v2.0.9.

## [2.0.21] - 2025-07-22

### Changed

- Updated template dependencies: `express` 4.19.2 → 4.21.2, `express-sweet` 2.0.5 → 2.0.7.

## [2.0.20] - 2025-02-18

### Changed

- Improved error logging in the frontend API client and Datatable error hooks.

## [2.0.19] - 2025-02-09

### Changed

- Reduced container padding and increased content width on tablet and smaller screens.
- Updated `metronic-extension` to ^3.0.16.
- Simplified the login page background to a clean blue image.

## [2.0.18] - 2025-02-04

### Changed

- Updated template dependency `express-sweet` to v2.0.5.

## [2.0.17] - 2025-02-02

### Changed

- Validation errors now return structured error messages with HTTP 400 status.

## [2.0.16] - 2025-01-31

### Changed

- Updated `metronic-extension` to v3.0.15.

## [2.0.15] - 2025-01-30

### Fixed

- Corrected JSDoc annotations in template frontend JavaScript.

## [2.0.14] - 2025-01-28

### Fixed

- Corrected inline comments in template frontend JavaScript.

## [2.0.13] - 2025-01-27

### Changed

- Reorganized template route endpoints and view structure for better clarity.

## [2.0.12] - 2025-01-19

### Changed

- Sidebar now remembers its minimized state via cookie (`sidebar_minimize_state`).

## [2.0.11] - 2025-01-17

### Changed

- Enabled top-level `await` in Webpack config (`experiments.topLevelAwait`).
- Added timestamp formatting (`YYYY-MM-DD HH:mm:ss`) to PM2 log output in `ecosystem.config.js`.

## [2.0.10] - 2024-12-31

### Changed

- Improved variable naming across generated templates.

## [2.0.9] - 2024-12-31

### Changed

- Improved generated model class structure.

## [2.0.8] - 2024-11-21

### Changed

- Consolidated request validation into a shared `checkValidationResult` middleware.
- Reorganized custom validators into a dedicated `validators/` directory.

## [2.0.7] - 2024-11-21

### Changed

- Renamed custom error classes directory to `errors/` for consistency.
- Introduced a general-purpose `NotFoundError` class for flexible resource-not-found handling.

## [2.0.6] - 2024-11-18

### Changed

- Fixed a bug in the user API client module.
- Consolidated datatable filtering logic into a shared reusable function.

## [2.0.5] - 2024-11-13

### Added

- **Error pages** — Custom 404 and 500 error pages with automatic sidebar hiding via the `isErrorPage` flag.
- Error handling hook for custom error page rendering logic.

## [2.0.4] - 2024-11-11

### Added

- **Frontend base classes** — Extended API client and Datatable classes for standardized error handling, including authentication redirect hooks and reusable Ajax error handling.

## [2.0.3] - 2024-09-04

### Changed

- Full ESM compliance for generated applications.

## [2.0.2] - 2024-09-02

### Changed

- Updated template dependencies (`express`, `rollup`, etc.) to latest versions.

## [2.0.1] - 2024-04-05

### Changed

- Removed `nodejs-shared` package dependency from generated templates.

## [2.0.0] - 2024-03-24

### Breaking Changes

- **express-sweet v2** — Templates target express-sweet v2.0.0. AWS SDK dependency has been removed.

## [1.0.20] - 2024-03-22

### Changed

- Changed the default value of `cookie_secure` in `config/config.js` from `true` to `false`.

## [1.0.19] - 2024-03-21

### Changed

- Rebuilt the frontend client bundle (`public/build`) to latest versions.

## [1.0.18] - 2024-03-06

### Changed

- Updated `metronic-extension` from v1.0.1 to v3.0.9.

## [1.0.17] - 2024-03-06

### Fixed

- Fixed a typo in the common JS module name referenced from template views.

## [1.0.16] - 2024-03-05

### Changed

- Renamed sample database from `sampledb` to `express_sweet_db`.

## [1.0.15] - 2024-02-29

### Added

- **Color themes** — Generated applications now support switchable color themes.

## [1.0.14] - 2023-12-30

### Added

- Session cookie `Secure` and `HttpOnly` attributes are now configurable in `config/authentication.js`.

## [1.0.13] - 2023-12-30

### Added

- Session cookie name is now configurable via the `cookie_name` field in `config/authentication.js`.

## [1.0.12] - 2023-07-17

### Changed

- The `beforeRender` option in view config now supports async functions.
- Added new Math-related Handlebars helpers.

## [1.0.11] - 2023-07-12

### Changed

- Moved the `is_ajax` option from `config/authentication.js` to `config/config.js`.
- Replaced `error_handler` option with `hook_handle_error` in `config/config.js`.

## [1.0.10] - 2023-07-11

### Changed

- The `failure_redirect` option in `config/authentication.js` now accepts a function for dynamic redirect URLs.

## [1.0.9] - 2023-06-29

### Changed

- Renamed Handlebars helper functions from snake_case to camelCase.
- Added `number2locale` view helper for locale-aware number formatting.

## [1.0.8] - 2023-06-12

### Changed

- The `beforeRender` function in `config/view.js` now receives the `express.Request` object as an argument (express-sweet v1.0.27).

## [1.0.7] - 2022-10-24

### Added

- Added `is_ajax` option to authentication config for Ajax request handling.

## [1.0.6] - 2022-10-20

### Added

- Request body parameter is now passed to the authentication callback function.

## [1.0.5] - 2022-07-27

### Added

- **View render hooks** — New `beforeRender` hook function in view config, called before each template render.

## [1.0.4] - 2022-05-18

### Added

- **Redis session store** — Added `session_store` and `redis_host` options to `config/authentication.js` (express-sweet v1.0.18).

## [1.0.3] - 2022-05-17

### Changed

- Improved UX of template views.

## [1.0.2] - 2022-02-14

### Changed

- `allow_unauthenticated` in `config/authentication.js` now accepts `RegExp` patterns in addition to strings.

## [1.0.1] - 2021-06-10

### Added

- **ESM templates** — Added ESM (ECMAScript Modules) template set alongside the existing CJS templates.

## [1.0.0] - 2021-05-31

### Added

- Initial release of Express Sweet Generator.
- CJS application template with authentication, Sequelize ORM, Handlebars views, and Webpack frontend.
- CLI with `-o`, `-p`, and `-f` options.

[1.0.0]: https://github.com/shumatsumonobu/express-sweet-generator/releases/tag/v1.0.0
[1.0.1]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.2...v1.0.3
[1.0.4]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.3...v1.0.4
[1.0.5]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.4...v1.0.5
[1.0.6]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.5...v1.0.6
[1.0.7]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.6...v1.0.7
[1.0.8]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.7...v1.0.8
[1.0.9]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.8...v1.0.9
[1.0.10]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.9...v1.0.10
[1.0.11]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.10...v1.0.11
[1.0.12]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.11...v1.0.12
[1.0.13]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.12...v1.0.13
[1.0.14]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.13...v1.0.14
[1.0.15]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.14...v1.0.15
[1.0.16]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.15...v1.0.16
[1.0.17]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.16...v1.0.17
[1.0.18]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.17...v1.0.18
[1.0.19]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.18...v1.0.19
[1.0.20]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.19...v1.0.20
[2.0.0]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v1.0.20...v2.0.0
[2.0.1]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.0...v2.0.1
[2.0.2]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.1...v2.0.2
[2.0.3]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.2...v2.0.3
[2.0.4]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.3...v2.0.4
[2.0.5]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.4...v2.0.5
[2.0.6]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.5...v2.0.6
[2.0.7]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.6...v2.0.7
[2.0.8]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.7...v2.0.8
[2.0.9]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.8...v2.0.9
[2.0.10]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.9...v2.0.10
[2.0.11]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.10...v2.0.11
[2.0.12]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.11...v2.0.12
[2.0.13]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.12...v2.0.13
[2.0.14]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.13...v2.0.14
[2.0.15]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.14...v2.0.15
[2.0.16]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.15...v2.0.16
[2.0.17]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.16...v2.0.17
[2.0.18]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.17...v2.0.18
[2.0.19]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.18...v2.0.19
[2.0.20]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.19...v2.0.20
[2.0.21]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.20...v2.0.21
[2.0.22]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.21...v2.0.22
[2.0.23]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.22...v2.0.23
[3.0.0]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v2.0.23...v3.0.0
[3.0.1]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v3.0.0...v3.0.1
[4.0.0]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v3.0.1...v4.0.0
[5.0.0]: https://github.com/shumatsumonobu/express-sweet-generator/compare/v4.0.0...v5.0.0
