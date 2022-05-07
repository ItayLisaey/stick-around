import { faExclamationCircle, faPlug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { healthService } from '../../services/health.service';
import { StatusIndicator } from '../StatusIndicator';
import classes from './health-check.module.scss';

export interface HealthCheckProps {}

export const HealthCheck: React.FC<HealthCheckProps> = ({ children }) => {
    const { status: backendStatus } = useQuery(['health', 'backend'], () =>
        healthService.backend()
    );
    const { status: tmdbStatus } = useQuery(['health', 'tmdb'], () =>
        healthService.tmdb()
    );

    const health = useMemo(() => {
        if (!navigator.onLine) return 'offline';
        if (backendStatus === 'error') return 'backend';
        if (tmdbStatus === 'error') return 'tmdb';
        return undefined;
    }, [backendStatus, tmdbStatus]);

    const loading = useMemo(() => {
        if (backendStatus === 'loading') return true;
        if (tmdbStatus === 'loading') return true;
        return false;
    }, [backendStatus, tmdbStatus]);

    const content = useMemo(() => {
        switch (health) {
            case 'backend':
                return (
                    <div className={classes.backend}>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <h1>Server currently unavailable</h1>
                        <p>{"Please be patient. I'm working on it :)"}</p>
                        <p>
                            {
                                'If you have any questions, you can reach me at itay@lisaey.com'
                            }
                        </p>
                    </div>
                );
            case 'tmdb':
                return (
                    <div className={classes.backend}>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <h1>{'"TMDB" Unreachable'}</h1>
                        <p>
                            {
                                'This is probably a bug, please contant me at itay@lisaey.com'
                            }
                        </p>
                    </div>
                );
            case 'offline':
                return (
                    <div className={classes.backend}>
                        <FontAwesomeIcon icon={faPlug} />
                        <h1>{'Network Error'}</h1>
                        <p>
                            {
                                'It seems like you are not connected to the internet'
                            }
                        </p>
                    </div>
                );
            default:
                return <>{children}</>;
        }
    }, [children, health]);

    return (
        <StatusIndicator loading={loading} inverse>
            {content}
        </StatusIndicator>
    );
};
