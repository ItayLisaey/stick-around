import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import classes from './error-indicator.module.scss';

export interface ErrorIndicatorProps {
    msg: string;
}

export const ErrorIndicator: React.VFC<ErrorIndicatorProps> = ({ msg }) => (
    <div className={classes.container}>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <p>{msg}</p>
    </div>
);
