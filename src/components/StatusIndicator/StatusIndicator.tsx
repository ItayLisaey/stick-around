import { CircularProgress, Fade } from '@mui/material';
import classNames from 'classnames';
import { ErrorIndicator } from '../ErrorIndicator';
import classes from './status-indicator.module.scss';

export interface StatusIndicatorProps {
    loading: boolean;
    error?: string;
    inverse?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
    loading,
    error,
    inverse = false,
    children,
}) => {
    if (error) {
        return <ErrorIndicator msg={error} />;
    } else if (loading) {
        return (
            <Fade in={loading}>
                <div
                    className={classNames(classes.loading, {
                        [classes.inverse]: inverse,
                    })}
                >
                    <CircularProgress
                        color={inverse ? 'primary' : 'secondary'}
                    />
                </div>
            </Fade>
        );
    } else {
        return <>{children}</>;
    }
};
