import {settings} from './index'

export default class SpeedIntervalSelectElement {
    constructor(setupInterval, setRenderingEnabled, renderer) {
        let intervalSelectElement = document.getElementById('interval');

        //Display the default setting in the UI select box
        if (!settings.renderingEnabled) {
            intervalSelectElement.value = 'no-render';
        } else {
            intervalSelectElement.value = settings.speed;
        }

        intervalSelectElement.addEventListener('change', (event) => {
            const value = event.target.value;
            let newEnableRenderingValue = true;
            settings.autoPlay = true;
            if (value === 'no-render') {
                newEnableRenderingValue = false;
                settings.speed = 0;
                renderer.clear();
            } else if (value === 'paused') {
                settings.autoPlay = false;
            } else {
                settings.speed = value;
            }
            if (newEnableRenderingValue != settings.renderingEnabled) {
                settings.renderingEnabled = newEnableRenderingValue;
                setRenderingEnabled(settings.renderingEnabled);
            }
            setupInterval();
        });
    }
}
