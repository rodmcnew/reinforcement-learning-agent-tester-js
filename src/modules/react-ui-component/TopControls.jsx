import React, { memo } from 'react';
import './TopControls.css';

const speedOptions = [
    ['paused', 'Paused (manual control with WASD keys)'],
    ['500', 'Slow'],
    ['250', 'Medium'],
    ['100', 'Fast'],
    ['0', 'Very Fast'],
    ['-1', 'Ludicrous Speed (no rendering)']
]

const TopControls = ({
    agents, speed, handleAgentSelectorChange, handleClearBrainClick, handleSpeedChange }
) => {
    const handleSpeedSelectorChange = (event) => {
        handleSpeedChange(event.target.value === 'paused' ? null : parseInt(event.target.value));
    }
    const speedValue = speed === null ? 'paused' : speed.toString();
    return <div className="TopControls">
        <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="agentSelect">Agent:</label>
            <select className="form-select" id="agentSelect" onChange={handleAgentSelectorChange}>
                {agents.map(((agent, index) =>
                    <option key={index} value={index}>{agent.name}</option>
                ))
                }
            </select>
            <button className="btn btn-secondary" onClick={handleClearBrainClick}>Clear Brain and Retrain</button>
        </div>
        <div className="input-group mb-2">
            <label className="input-group-text">Speed:</label>
            {speedOptions.map(([value, label], index) =>
                <button key={index} type="button" value={value} onClick={handleSpeedSelectorChange}
                    className={`btn btn-${value === speedValue ? '' : 'outline-'}secondary`}>{label}</button>
            )}
        </div>
    </div>
};

export default memo(TopControls);