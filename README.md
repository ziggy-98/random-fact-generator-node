# Random fact app - node version
Want to learn some random (sometimes) cool facts to tell to friends at parties? Then you've come to the right place!
This is a node application used for picking random facts on all sorts of different topics. If you're looking at this codebase,
then maybe that means you want to spin it up and add your own facts? Or maybe you're _really_ dedicated to fact finding,
and want to be informed about when new features are added to the app! Either way, any information you could need about
the app can be found right here.

**disclaimer** - facts may not actually be cool and may be detrimental to your social standing if told at parties

## Getting started
If you what to start developing on this app, here's how you can get started.

### Prerequisites
To get this app up and running, you will need:

- Node v20 and npm (Other versions might work, this is the only one that's been tested so far)
- Docker
- A .env file (example can be found at .env.example)

### Local development
To get this app running locally on your machine follow the steps below:

1. run `npm install`
2. get the postgres instance created by running `docker-compose up -d postgres`
3. run the database migrations using `npx prisma migrate dev`
4. run the database seeding tasks using `npx prisma db seed`
5. build the initial version of the app by running `npm run build`
6. start the server by running `npm start`, or `npm run dev` to run the server in development mode