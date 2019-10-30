import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class GameRulesDisplay extends Component {
    render() {
        const environmentConfig = this.props.environmentConfig;
        return (
            <div>
                Game Rules:
                <ul>
                    <li>Get to the bottom row to finish the game</li>
                    <li>Gain {environmentConfig.getToBottomDeltaScore.toFixed(3)} reward for getting to the bottom</li>
                    <li>Lose {(-environmentConfig.tileTypeToDeltaScore[1]).toFixed(3)} reward when moving into a red square</li>
                    {environmentConfig.deltaScorePerAction !== 0 &&
                        <li>Lose {(-environmentConfig.deltaScorePerAction).toFixed(3)} reward for every move</li>
                    }
                    {environmentConfig.verticalDeltaScore !== 0 &&
                        <li>Gain {environmentConfig.verticalDeltaScore.toFixed(3)} reward for every row lower you go</li>
                    }
                    {environmentConfig.verticalDeltaScore !== 0 &&
                        <li>Lose {environmentConfig.verticalDeltaScore.toFixed(3)} reward for every row higher you go</li>
                    }
                </ul>
            </div>
        );
    }
}

GameRulesDisplay.propTypes = {
    environmentConfig: PropTypes.object.isRequired
};

