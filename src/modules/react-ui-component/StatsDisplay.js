import React, { Component } from 'react';
import PropTypes from 'prop-types'

const statsObjectToDisplayedStatLines = (stats) => {
    return {
        // 'Agent' :currentAgentName ,
        'Current Score': stats.currentScore.toFixed(3),
        'Actions per second': stats.actionsPerSecond.toLocaleString(),
        'Last Game Final Score': stats.lastGameScore.toFixed(3),
        'Average Final Score (trailing)': stats.averageFinalScore.toFixed(3),
        'Average Final Score (all time)': ((stats.scoreSum / stats.gameCount) || 0).toFixed(3),
        // 'Average Reward' : (stats.totalReward / stats.actionCount).toFixed(2) ,
        'Game Count': stats.gameCount.toLocaleString()
    };
}

export default class StatsDisplay extends Component {
    render() {
        const stats = statsObjectToDisplayedStatLines(this.props.stats);
        return (
            <table>
                <tbody>
                    {Object.keys(stats).map((key) =>
                        <tr key={key}>
                            <td>{key}: {stats[key]}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

StatsDisplay.propTypes = {
    stats: PropTypes.object.isRequired
};

