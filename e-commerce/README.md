E-commerce Laravel + Next.js
This repository contains an E-commerce platform built with Laravel for the backend and Next.js for the frontend. It utilizes JWT authentication for secure user access and management.

Prerequisites
Before you begin, ensure that you have the following installed:

PHP (>= 7.4)
Composer
Node.js (>= 14)
npm or yarn
MySQL or your preferred database
Installation Steps
1. Clone the Git Repository
First, clone the repository to your local machine.

bash

    git clone https://github.com/veleswaran/E-commerce-laravel-nextjs.git
    
3. Change to the Project Directory
Navigate into the project directory.

bash

    cd e-commerce
3. Install PHP Dependencies
Use Composer to install PHP dependencies for the Laravel backend.

bash

    composer install
4. Set Up the Environment File
Rename the .env.example file to .env.

bash

    mv .env.example .env
5. Clear Cache
Clear the Laravel application cache.

bash

    php artisan cache:clear
6. Dump Autoload
Ensure the Composer autoload files are correctly generated.

bash

    composer dump-autoload
7. Generate Application Key
Generate the application key for your Laravel app. This key is used for encrypting user sessions and other sensitive data.

bash

    php artisan key:generate
8. Set Up JWT Authentication Secret
If you're using JWT authentication, you need to generate the JWT secret key for signing tokens.

bash

    php artisan jwt:secret
This will generate a JWT secret key and add it to your .env file as JWT_SECRET.

9. Set Up Database
Make sure you have your MySQL database set up and update your .env file with the correct database credentials:

plaintext
    
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
10. Run Migrations (Optional)
If there are database migrations to run, you can apply them using the following command:

bash

    php artisan migrate

12. Running the Application
Backend: You can run the Laravel backend using the following command:

    php artisan serve
This will start the Laravel application on http://localhost:8000.


