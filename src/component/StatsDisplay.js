import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class StatsDisplay extends Component {
    render() {
        let stats = this.props.stats;
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

