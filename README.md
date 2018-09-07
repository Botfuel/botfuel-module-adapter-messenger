# Facebook Messenger Adapter for Botfuel

## Installation

In your botfuel project, run :

```shell
npm install --save botfuel-module-adapter-messenger
```

## How to use the adapter

Create a new config file in the root directory of your project (eg: messenger-config.js)

```javascript
module.exports = {
  adapter: {
    name: 'messenger',
  },
  modules: ['botfuel-module-adapter-messenger']
};
```

## Run your bot

```shell
BOTFUEL_APP_TOKEN=<YOUR_APP_TOKEN> BOTFUEL_APP_ID=<YOUR_APP_TOKEN> BOTFUEL_APP_KEY=<YOUR_APP_TOKEN> npm start messenger-config.js
```
