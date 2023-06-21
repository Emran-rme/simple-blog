const { createClient } = require("redis");

module.exports = (RedisStore) => {
    // Initialize client.
    let redisClient = createClient();
    redisClient.connect().catch(console.error);

    // Initialize store.
    let redisStore = new RedisStore({
        client: redisClient,
        prefix: "myapp:",
    });

    return redisStore;
};
