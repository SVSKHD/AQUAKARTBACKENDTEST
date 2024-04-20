module.exports = {
    apps : [{
      name: "myapp",
      script: "./index.js",  // Updated to reflect your entry file
      instances: "max",
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }]
  };
  