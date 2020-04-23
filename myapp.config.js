module.exports = {
  apps : [{
    name        : "myapp-api",
    script      : "./server/bin/www",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
     "NODE_ENV": "production"
    }
  },
  {
    name       : "myapp-client",
    script     : "./client/src/server.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  }]
}
