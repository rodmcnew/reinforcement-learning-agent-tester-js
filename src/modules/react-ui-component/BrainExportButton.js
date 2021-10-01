import React, { useCallback, memo, useMemo } from 'react';

const BrainExportButton = ({ onExportRequest, exportedData }) => {
    const onExportButtonClick = useCallback(() => {
        onExportRequest();
    }, [onExportRequest])

    const wrappedExportData = useMemo(() => ('export const data = JSON.parse(\'' +
        JSON.stringify(exportedData) +
        '\');')
        , [exportedData]);

    return <div>
        <button className="btn btn-secondary" onClick={onExportButtonClick}>Export Agent Brain</button>
        {exportedData &&
            <div>
                <br />
                <div>Exported Agent Brain Data:</div>
                <textarea
                    autoFocus
                    readOnly
                    style={{ width: '100%', height: '10em' }}
                    value={wrappedExportData} />
            </div>
        }
    </div>
}

export default memo(BrainExportButton);