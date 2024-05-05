# Install using NPM

1. Clone the Repo git clone `https://github.com/sami3ullah/news-aggregator.git`
2. Cd into the folder as `cd news-aggregator` or open the news-aggregator folder
3. Install all the packages `npm i`
4. Copy the contents of .env.template file and create a new file at root level by `touch .env`
5. Paste everything inside of env.template to .env and change the APIs with your keys

## Run the project

`npm run dev`

## Run the tests

`npm test`

# Install using Docker

1. Make sure you have docker installed
2. Create a new file at root level of project with `touch .env` and copy all the contents of .env.template inside of .env and change it with real API keys
3. Now run `docker-compose up --build news-aggregator`
