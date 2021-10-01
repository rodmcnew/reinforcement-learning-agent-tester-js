const config = {
    app: {
        renderingEnabled: true,
        initialSpeed: 100,
    },
    ludicrousSpeed: {
        initialGameTicksPerRender: 1,
        maxGameTickBatchDurationMs: 50, // UX best practices say nothing should take over 50ms to can respond to user action within 100ms
        batchSizeAdjustmentMultiplier: 2
    },
    lookAhead9x3: {
        // wasteTimeMs: 6
        wasteTimeMs: null
    }
}
export default config;