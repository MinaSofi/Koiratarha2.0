# Web2-project Koiratarha 2.0 / GraphQL API server

Koiratarha 2.0 is a school project for Metropolia UAS Web-development 2 course.

Koiratarha 2.0 is a web application that uses the MyHelsinki Open API to show various public dog parks and other dog related areas on a map. A user can register to the site to save their favourite locations and set reminders for visits to those locations. It is a convenient place for all dog owners to find nearby and fun places to visit. More features for the site are being planned constantly.

The app uses a client (Vite), GraphQL API server, REST API AUTH server and a NoSQL database.



# Get started:

- Clone this repo
- Clone the AUTH server: https://github.com/MinaSofi/Koiratarha2.0_Auth
- Clone the client: https://github.com/Sebaswo/Koiratarha2.0Client
- Set up .env file for all based on .env.sample
    - Remember to use different ports
    - Recommended to use MongoDB
- For tests to pass, you need to add an admin manually to your database:
    >username: 'Admin Tester'
    >
    >password: '12345'
    >
    >role: 'admin'
- run `npm i` on all repos
- run `npm run dev` on all repos

