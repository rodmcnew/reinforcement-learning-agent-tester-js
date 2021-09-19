import React from 'react';

const statsObjectToDisplayedStatLines = (stats) => {
    return { //@TODO object prop order is not guaranteed
        'Current Score': stats.currentScore.toFixed(3),
        'Actions per second': stats.actionsPerSecond.toLocaleString(),
        'Last Game Final Score': stats.lastGameScore.toFixed(3),
        'Average Final Score (trailing)': stats.averageFinalScore.toFixed(3),
        'Average Final Score (all time)': ((stats.scoreSum / stats.gameCount) || 0).toFixed(3),
        'Game Count': stats.gameCount.toLocaleString()
    };
}

const StatsDisplay = ({ stats }) => {
    const statLines = statsObjectToDisplayedStatLines(stats);
    return (
        <table>
            <tbody>
                {Object.keys(statLines).map((key) =>
                    <tr key={key}>
                        <td>{key}: {statLines[key]}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default StatsDisplay;