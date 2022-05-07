import { AnalyticsCallOptions, logEvent } from 'firebase/analytics';
import { useEffect } from 'react';
import { analytics } from '../App';

export const useAnalytics = (
    eventName: string,
    eventParams?: {
        page_title?: string;
        page_location?: string;
        page_path?: string;
        [key: string]: any;
    },
    options?: AnalyticsCallOptions
) => {
    useEffect(() => {
        logEvent(analytics, eventName, eventParams, options);
    }, [eventName, eventParams, options]);
};
