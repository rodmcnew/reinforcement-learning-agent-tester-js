import React from 'react';

const GameRulesDisplay = ({ environmentConfig }) => {
    return (
        <div>
            Game Rules:
            <ul>
                <li>Move downward as efficiently as possible while avoiding going into the toxic red zones.</li>
                {/* <li>Gain {environmentConfig.getToBottomDeltaScore.toFixed(3)} reward for getting to the bottom</li> */}
                <li>Lose {(-environmentConfig.tileTypeToDeltaScore[1])} points when moving into a red square</li>
                <li>Gain/lose these points per WASD action: {JSON.stringify(environmentConfig.actionCodeToDeltaScore)}</li>
                <li>Get to the bottom row to start a new game.</li>
            </ul>
        </div>
    );
}

export default React.memo(GameRulesDisplay);