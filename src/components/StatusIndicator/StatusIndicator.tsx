import { CircularProgress, Fade } from '@mui/material';
import { ErrorIndicator } from '../ErrorIndicator';
import classes from './status-indicator.module.scss';

export interface StatusIndicatorProps {
    loading: boolean;
    error?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
    loading,
    error,
    children,
}) => {
    if (error) {
        return <ErrorIndicator msg={error} />;
    } else if (loading) {
        return (
            <Fade in={loading}>
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
            </Fade>
        );
    } else {
        return <>{children}</>;
    }
};
