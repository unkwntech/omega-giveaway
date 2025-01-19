module.exports = {
    apps: [
        {
            name: "Omega-Giveaway-Backend",
            script: "dist/main.js",
            time: true,
            instances: 1,
            autorestart: true,
            max_restarts: 50,
            watch: false,
            max_memory_restart: "1G",
            appendEnvToName: true,
        },
    ],
    deploy: {
        production: {
            user: "github",
            host: "ibns.tech",
            key: "deploy.key",
            ref: "origin/main",
            repo: "https://github.com/unkwntech/omega-giveaway.git",
            path: "/var/projects/omega-giveaway-backend-prod/",
            "post-deploy":
                "npm i && tsc -b && pm2 reload ecosystem.config.js --env production && pm2 save",
            env: {
                NODE_ENV: "production",
            },
        },
    },
};
