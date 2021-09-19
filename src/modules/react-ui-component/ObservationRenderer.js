import React, { memo } from 'react';
import AgentObservation from './AgentObservation';
import EnvironmentView from './EnvironmentView';

const ObservationRenderer = ({ gameNumber, agentObservation, globalObservation }) => {
    return <div className="InfectionGameHtmlTableRender">
        <div>
            <div>Agent View</div>
            <AgentObservation agentObservation={agentObservation} />
        </div>
        <div>
            <div>Environment View</div>
            <EnvironmentView globalObservation={globalObservation} gameNumber={gameNumber} />
        </div>
    </div>;
}

export default memo(ObservationRenderer);