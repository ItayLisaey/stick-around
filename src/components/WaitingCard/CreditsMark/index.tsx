import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faQuestion,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import theme from '../../../theme/theme';
import { Trust } from '../../../types/movies.interface';
import classes from './credits-mark.module.scss';

export interface CreditsMarkProps {
    count: number;
    trust: Trust;
}

export const CreditsMark: React.VFC<CreditsMarkProps> = ({ count, trust }) => {
    if (count > 0) {
        return (
            <div className={classes.markContainer}>
                <div className={classes.iconContainer}>
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        color={theme.palette.success.main}
                    />
                </div>
                <CountContainer count={count} trust={trust} />
            </div>
        );
    } else if (count === 0 || trust === 4) {
        return (
            <div className={classes.markContainer}>
                <div
                    className={classNames(classes.iconContainer, classes.maybe)}
                >
                    <FontAwesomeIcon
                        icon={faQuestion}
                        color={theme.palette.primary.light}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className={classes.markContainer}>
                <div className={classes.iconContainer}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        color={theme.palette.error.main}
                    />
                </div>
                <CountContainer count={count} trust={trust} />
            </div>
        );
    }
};

interface CountContainerProps {
    count: number;
    trust: Trust;
}

export const CountContainer: React.VFC<CountContainerProps> = ({
    count,
    trust,
}) => {
    if (trust === 2) {
        return (
            <div
                className={classNames(classes.voteContainer, {
                    [classes.long]: count.toString().length > 1,
                })}
            >
                <span>{count}</span>
            </div>
        );
    } else {
        return null;
    }
};
