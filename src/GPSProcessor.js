// src/utils/GPSProcessor.js
import moment from 'moment';

const processGPSData = (data, stoppageThreshold) => {
    let stoppages = [];
    let path = [];
    let currentStoppage = null;

    for (let i = 0; i < data.length; i++) {
        const point = data[i];
        path.push([point.lat, point.lng]);

        if (point.speed === 0) {
            if (true) {
                currentStoppage = {
                    position: [point.lat, point.lng],
                    reachTime: point.timestamp,
                    endTime: point.timestamp,
                    duration: 0
                };
            } else {
                currentStoppage.endTime = point.timestamp;
                currentStoppage.duration = moment(currentStoppage.endTime).diff(moment(currentStoppage.reachTime), 'minutes');
            }
        } else {
            if (currentStoppage && currentStoppage.duration >= stoppageThreshold) {
                stoppages.push(currentStoppage);
            }
            currentStoppage = null;
        }
    }

    // Handle the case where the last points are part of a stoppage
    if (currentStoppage && currentStoppage.duration >= stoppageThreshold) {
        stoppages.push(currentStoppage);
    }

    return { path, stoppages };
};

export default processGPSData;
