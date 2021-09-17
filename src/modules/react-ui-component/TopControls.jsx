import React, { memo } from 'react';
const TopControls = ({
    agents, speed, handleAgentSelectorChange, handleClearBrainClick, handleSpeedSelectorChange,
    handleManualControlKeyDown, handleManualControlClick }
) => {
    return <>
        Agent:
        <select onChange={handleAgentSelectorChange}>
            {agents.map(((agent, index) =>
                <option key={index} value={index}>{agent.name}</option>
            ))
            }
        </select>
        &nbsp;
        <button onClick={handleClearBrainClick}>Clear Brain and Retrain</button>
        <br />
        Speed:
        <select onChange={handleSpeedSelectorChange} value={speed}>
            <option value="0">Ludicrous Speed (no rendering)</option>
            <option value="17">Very Fast</option>
            <option value="100">Fast</option>
            <option value="250">Medium</option>
            <option value="500">Slow</option>
            <option value="-1">Paused</option>
        </select>
        &nbsp;
        <button type="text"
            onKeyDown={handleManualControlKeyDown}
            onClick={handleManualControlClick}>Enable Manual Control (WASD)
        </button>
    </>
};

export default memo(TopControls);