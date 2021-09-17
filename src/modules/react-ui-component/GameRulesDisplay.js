import React, { Component } from 'react';
import PropTypes from 'prop-types'

class GameRulesDisplay extends Component {
    render() {
        const environmentConfig = this.props.environmentConfig;
        return (
            <div>
                Game Rules:
                <ul>
                    <li>Move downward as efficiently as possible while avoiding going into the toxic red zones.</li>
                    {/* <li>Gain {environmentConfig.getToBottomDeltaScore.toFixed(3)} reward for getting to the bottom</li> */}
                    <li>Lose {(-environmentConfig.tileTypeToDeltaScore[1])} points when moving into a red square</li>
                    <li>Gain/lose these points per WASD action: {JSON.stringify(environmentConfig.actionCodeToDeltaScore)}</li>
                    <li>Get to the bottom row to start a new game.</li>
                    {/* {environmentConfig.deltaScorePerAction !== 0 &&
                        <li>Lose {(-environmentConfig.deltaScorePerAction).toFixed(3)} reward for every move</li>
                    }
                    {environmentConfig.verticalDeltaScore !== 0 &&
                        <li>Gain {environmentConfig.verticalDeltaScore.toFixed(3)} reward for every row lower you go</li>
                    } */}
                    {/* {environmentConfig.verticalDeltaScore !== 0 &&
                        <li>Lose {environmentConfig.verticalDeltaScore.toFixed(3)} reward for every row higher you go</li>
                    } */}
                </ul>
            </div>
        );
    }
}

GameRulesDisplay.propTypes = {
    environmentConfig: PropTypes.object.isRequired
};

export default React.memo(GameRulesDisplay);