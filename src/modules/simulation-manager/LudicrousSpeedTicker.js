/**
 * The purpose of this class is to run as many ticks as possible while still pausing for a moment periodically
 * so that JS can run event handlers for worker post-message events.
 * 
 * Batch sizes are automatically adjusted based on how long batches are taking to complete. This allows the app
 * to run well on a wide variety of hardware.
 * 
 * @TODO put this deeper in folder structure?
 */
class LudicrousSpeedTicker {
    constructor(tickCallback, config) {
        this.config = config;
        this.tickCallback = tickCallback;
        this.ludicrousSpeedEnabled = false;
        this.ludicrousBatchSize = this.config.initialGameTicksPerRender;
        this.runGameTickBatch = this.runGameTickBatch.bind(this);
        this.startTickerLoop = this.startTickerLoop.bind(this);
        this.setLudicrousSpeedTickingEnabled = this.setLudicrousSpeedTickingEnabled.bind(this);
    }

    /**
     * Calling this when an agent changes prevents lag when switching from a very fast agent to a slower agent.
     */
    handleAgentChange() {
        this.ludicrousBatchSize = this.config.initialGameTicksPerRender;
    }

    /**
     * Run a batch of game ticks and adjust the batch size if necessary
     */
    runGameTickBatch() {
        const batchStartTimeMs = Date.now();
        for (let i = 0; i < this.ludicrousBatchSize; i++) {
            this.tickCallback();
        }
        const batchDurationMs = Date.now() - batchStartTimeMs;
        if (batchDurationMs > this.config.maxGameTickBatchDurationMs) {
            this.ludicrousBatchSize = this.ludicrousBatchSize / this.config.batchSizeAdjustmentMultiplier;
        } else if (batchDurationMs < this.config.maxGameTickBatchDurationMs / this.config.batchSizeAdjustmentMultiplier) {
            // const newValue = Math.min(1, this.ludicrousBatchSize * this.config.batchSizeAdjustmentMultiplier);
            // if (newValue > 1) {
            //      newValue;
            // }
            this.ludicrousBatchSize = Math.max(this.ludicrousBatchSize * this.config.batchSizeAdjustmentMultiplier, 1);
        }
    }

    /**
     * Start ticking. This calls its self to keep ticking. The setTimeout allows JS a chance to check for events such as worker messages
     */
    startTickerLoop() {
        if (this.ludicrousSpeedEnabled) {
            this.runGameTickBatch();
            setTimeout(this.startTickerLoop); //@TODO is there a better way to listen for messages than setTimeout?
        }
    }

    /**
     * Turns ludicrous speed on or off
     */
    setLudicrousSpeedTickingEnabled(tickingEnabled) {
        const ludicrousSpeedWasEnabled = this.ludicrousSpeedEnabled;
        this.ludicrousSpeedEnabled = tickingEnabled;
        if (this.ludicrousSpeedEnabled && !ludicrousSpeedWasEnabled) {
            this.startTickerLoop();
        }
    }
}

export default LudicrousSpeedTicker;