# Laravel social media m2online
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)
* [Details](#details)

## General info
<details>
  <summary>Social media app</summary>
This project involves a Laravel SPA built with Inertia and React. The goal was to create simple social media using different technologies.
</details>

## Technologies
### Most important technologies used in project:
* Laravel
* Laravel Sail (Docker)
* React
* Inertia
* PostgreSQL

## Setup
To setup project, follow these steps:
1. run `composer install` to install all packages
2. run `npm install` to install all **React** packages
3. create _**.env**_ and **.env.test**_ file along the lines of **.env.example**. PostgreSQL should be used to avoid more configuration.
4. Generate app key: `php artisan key:generate`
5. Configure the homepage photo in **storage/app/public/photos/** as **photo.jpg**
6. To run backend use: `./vendor/bin/sail up` [more info here](https://laravel.com/docs/11.x/sail#configuring-a-shell-alias) but to run frontend use: `npm run dev` ***(in case if you use dev version)***
7. To run migrations: `./vendor/bin/sail artisan migrate`.
- If you decided to configure shell alias for vendor use `sail artisan migrate`.
8. To check if everything is setup check tests: `./vendor/bin/sail test` or with alias `sail test`.

## Usage
- To run app use same command as in Setup `./vendor/bin/sail up` or with alias `sail up` and React frontend `npm run dev` ***(same as before in dev version only)***
  - [To configure alias](https://laravel.com/docs/11.x/sail#configuring-a-shell-alias).

## Details
* The purpose of the application is to store and show users photos in a database as a blob. The reason for this is to simplify backup and keep everything in check.
* Application contains aswell simple searchbar for photos.