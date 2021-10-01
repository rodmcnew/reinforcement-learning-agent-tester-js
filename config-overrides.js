module.exports = function override(config, env) {
    config.optimization.minimize = false; // Useful for profiling
    return config;
}