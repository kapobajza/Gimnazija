<p align="center">
  <img alt="zdnevnik logo" height="150" src="./docs/logo.png">
</p>

This is the repo for the official Mješovita srednja škola "Gimnazija Bugojno" web app. It's made using [React Router v7 (formerly Remix)](https://reactrouter.com/) and [Strapi](https://strapi.io/).

## Pre-requisites

In order to run this app you will need the following:

- [Node v20](https://nodejs.org) - or you can use [nvm](https://github.com/nvm-sh/nvm) to install the correct Node version simply by running `nvm use`
- [pnpm v9.15.0](https://pnpm.io/)
- [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/install/) (optional)

### Dashboard

To run it you will need to create a `.env` file. You have a [`.env.sample`](dashboard/.env.sample) file inside of the __dasboard__ folder you can use as a reference. Or you can simply c/p the contents of the `.env.sample` file into the `.env` file:

```sh
cp dashboard/.env.sample dashboard/.env
```

### Web

Similarly, you also need a `.env` file for the web app. But you can also just c/p the contents of the [`.env.sample`](web/.env.sample) file into the `.env` file:

```sh
cp web/.env.sample web/.env.local
```

## Getting started

Now, to get started you should first run

```sh
pnpm install
```

If you want to run your app without docker, then use:

```sh
# Start the dashboard
pnpm run dashboard:dev

# Start the web
pnpm run web:dev
```

Or by using docker:

```sh
docker compose up -d
```

Or if you want to start docker in watch mode, so that you can watch file changes and apply them immediately:

```sh
docker compose watch
```

After that, you should first visit the dashboard at [http://localhost:1337](http://localhost:1337). This will prompt you to create an admin account. You can also add sample data if you want to.

The web app is available at [http://localhost:3001](http://localhost:3001).

### Commit messages

When committing changes you should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.