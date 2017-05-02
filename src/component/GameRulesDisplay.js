import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class GameRulesDisplay extends Component {
    render() {
        let environmentConfig = this.props.environmentConfig;
        return (
            <div>
                Game Rules:
                <ul>
                    <li>Get to the bottom row to finish the game</li>
                    <li>Gain {environmentConfig.verticalDeltaScore } points for every row lower you go</li>
                    <li>Loose {environmentConfig.verticalDeltaScore } points for every row higher you go</li>
                    <li>Loose {-environmentConfig.tileValueMap[1] } points when moving into a red square</li>
                    <li>Loose {-environmentConfig.deltaScorePerAction } point for every move</li>
                </ul>
            </div>
        );
    }
}

GameRulesDisplay.propTypes = {
    environmentConfig: PropTypes.object.isRequired
};

