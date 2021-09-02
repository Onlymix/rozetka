const mix = require('laravel-mix')
require('laravel-mix-eslint')
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

mix.js('resources/js/app.js', 'public/js/')
    .vue({ version: 3, extractStyles: true, globalStyles: './resources/sass/global.scss' })
    .sass('resources/sass/global.scss', 'public/css/sass.css')
    .sass('node_modules/quasar/dist/quasar.sass', 'public/css/quasar.css')
    .stylus('resources/styl/import.styl', 'public/css/stylus.css')
    .styles(['public/css/sass.css', 'public/css/stylus.css'], 'public/css/app.css')
    .copyDirectory('resources/img', 'public/img')
    .sourceMaps()
    .extract()
    .version()
    .webpackConfig((webpack) => {
        return {
            plugins: [
                new webpack.DefinePlugin({
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
