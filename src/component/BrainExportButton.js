import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class BrainExportButton extends Component {
    constructor() {
        super();
        this.onExportButtonClick = this.onExportButtonClick.bind(this);
        this.state = {exportData: null};
    }

    onExportButtonClick() {
        const gameRunner = this.props.gameRunner;
        if (!gameRunner.getCurrentAgentInstance().exportBrain) {
            alert('Current agent has no exportBrain() function.');
            return;
        }

        this.setState({
            exportData: 'export const data = JSON.parse(\'' +
            JSON.stringify(gameRunner.getCurrentAgentInstance().exportBrain()) +
            '\');'
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.onExportButtonClick}>Export Agent Brain</button>
                {this.state.exportData &&
                <div>
                    <br/>
                    <div>Exported Agent Brain Data:</div>
                    <textarea
                        autoFocus
                        readOnly
                        style={{width: '100%', height: '10em'}}
                        value={this.state.exportData}/>
                </div>
                }
            </div>
        );
    }
}

BrainExportButton.propTypes = {
    gameRunner: PropTypes.object.isRequired
};

