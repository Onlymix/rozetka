// const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/js/app.js', 'public/js')
//     .postCss('resources/css/app.css', 'public/css', [
//         //
//     ]);
const mix = require('laravel-mix')
require('mix-env-file')
require('laravel-mix-eslint')
mix.env(process.env.ENV_FILE)
// let path = require('path');
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

// .webpackConfig({
//     output: {
//         chunkFilename: 'js/chunks/[chunkhash].app.js',
//     }
// })
mix.version()
    .webpackConfig((webpack) => {
        // noinspection JSValidateTypes
        return {
            output: { chunkFilename: 'js/[id].app.js' },
            plugins: [
                new webpack.DefinePlugin({
                    __VUE_OPTIONS_API__: 'true',
                    __VUE_PROD_DEVTOOLS__: 'false',
                }),
            ],
        }
    })
    .eslint({
        fix: true,
        extensions: ['js', 'vue', 'ts'],
    })
    .js('resources/js/app.js', 'public/js/')
    .sass('resources/sass/import.scss', 'public/css/sass.css')
    .stylus('resources/styl/import.styl', 'public/css/stylus.css')
    .styles(['public/css/sass.css', 'public/css/stylus.css'], 'public/css/app.css')
    .copyDirectory('resources/img', 'public/img')
    .disableNotifications()
    .vue({ version: 3 })
    .browserSync({
        proxy: process.env.APP_DEV_URL ? process.env.APP_DEV_URL : '192.168.10.10',
        port: '3000',
        notify: false,
    })
// mix.alias({
//     vue$: path.join(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
// });
