const mix = require('laravel-mix')
const path = require('path')
require('laravel-mix-eslint')
const fs = require('fs')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/*
 * Create necessary css files before first run
 *
 * */
const cssDir = 'public/css'
if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir)
    fs.closeSync(fs.openSync('public/css/app.css', 'w'))
    fs.closeSync(fs.openSync('public/css/quasar.css', 'w'))
    fs.closeSync(fs.openSync('public/css/sass.css', 'w'))
    fs.closeSync(fs.openSync('public/css/stylus.css', 'w'))
}

mix.extend(
    'i18n',
    new (class {
        webpackRules() {
            return [
                {
                    resourceQuery: /blockType=i18n/,
                    type: 'javascript/auto',
                    loader: '@intlify/vue-i18n-loader',
                },
            ]
        }
    })(),
)

mix.i18n()
    .js('resources/js/app.js', 'public/js/')
    .vue({ version: 3, extractStyles: true, globalStyles: { scss: 'resources/sass/vars.scss', stylus: 'resources/styl/vars.styl' } })
    .sass('resources/sass/vars.scss', 'public/css/sass.css')
    .sass('node_modules/quasar/dist/quasar.sass', 'public/css/quasar.css')
    .stylus('resources/styl/import.styl', 'public/css/stylus.css')
    .styles(['public/css/sass.css', 'public/css/stylus.css'], 'public/css/app.css')
    .copyDirectory('resources/img', 'public/img')
    .alias({ '@js': path.join(__dirname, 'resources/js'), '@': path.join(__dirname, 'resources') })
    .sourceMaps()
    .extract()
    .version()
    .webpackConfig((webpack) => {
        return {
            plugins: [
                new webpack.DefinePlugin({
                    __VUE_I18N_FULL_INSTALL__: 'true',
                    __VUE_I18N_LEGACY_API__: 'true',
                    __INTLIFY_PROD_DEVTOOLS__: 'false',
                    __VUE_OPTIONS_API__: 'true',
                    __VUE_PROD_DEVTOOLS__: 'false',
                }),
            ],
        }
    })
    .eslint({
        fix: false,
        extensions: ['js', 'vue', 'ts'],
    })
    .browserSync({
        proxy: process.env.MIX_APP_DEV_URL ? process.env.MIX_APP_DEV_URL : '192.168.10.10',
        port: '3000',
        notify: false,
        open: false,
    })
    .disableNotifications()
