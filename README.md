## Portfolio rozetka.com.ua website rework
Used frameworks and main libraries
- [Laravel framework](https://laravel.com).
- [VueJS 3](https://v3.vuejs.org/).
- [Quasar](https://quasar.dev/).
***
## Interesting
- All done on latest libs
- JWT auth
    - registration and login
- Multiple site language in reactive mode i18n
***
## Live version
- [darkdev](http://darkdev.in)
  - server is running on my local machine in dev mode so may be offline or in work
***
## _Build_
- make env file from env example
- install necessary packages composer and node
- generate laravel keys _(env file)_
- generate jwt auth keys _(env file)_
- configure .env file _(your local db pass and login)_
- migrate basic user db
- compile source code in dev prod or watch mode
- if you want to use livereload in watch mode set up MIX_APP_DEV_URL variable with your local webserver address _(env file)_

```sh
cp .env.example .env
composer install
yarn install # npm install
php artisan key:generate
php artisan jwt:secret
# configure .env db username and password
php artisan migrate
yarn run dev # npm run dev
```
***
### Contacts
- Telegram [@onlymixx](https://t.me/onlymixx).
