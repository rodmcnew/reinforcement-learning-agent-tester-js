import React, { useState, memo } from 'react';

const BrainExportButton = ({ gameRunner }) => {
    const [exportData, setExportData] = useState(null);

    const onExportButtonClick = () => {
        if (!gameRunner.getCurrentAgentInstance().exportBrain) {
            alert('Current agent has no exportBrain() function.');
            return;
        }

        setExportData(
            'export const data = JSON.parse(\'' +
            JSON.stringify(gameRunner.getCurrentAgentInstance().exportBrain()) +
            '\');'
        );
    }

    return <div>
        <button className="btn btn-secondary" onClick={onExportButtonClick}>Export Agent Brain</button>
        {exportData &&
            <div>
                <br />
                <div>Exported Agent Brain Data:</div>
                <textarea
                    autoFocus
                    readOnly
                    style={{ width: '100%', height: '10em' }}
                    value={exportData} />
            </div>
        }
    </div>
}

export default memo(BrainExportButton);