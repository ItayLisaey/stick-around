import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faQuestion,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import theme from '../../../theme/theme';
import { SubCredits } from '../../../types/movies.interface';
import classes from './credits-mark.module.scss';

export interface CreditsMarkProps {
  subCredits: SubCredits;
}

export const CreditsMark: React.VFC<CreditsMarkProps> = ({ subCredits }) => {

  if (subCredits.boolean) {
    return (
      <div className={classes.markContainer}>
        <div className={classes.iconContainer}>
          <FontAwesomeIcon
            icon={faCheckCircle}
            color={theme.palette.success.main}
          />
        </div>
        <div
          className={classNames(classes.voteContainer, {
            [classes.long]: subCredits.votes.toString().length > 1,
          })}
        >
          <span>{subCredits.votes}</span>
        </div>
      </div>
    );
  } else if (subCredits.votes === 0) {
    return (
      <div className={classes.markContainer}>
        <div className={classNames(classes.iconContainer, classes.maybe)}>
          <FontAwesomeIcon
            icon={faQuestion}
            color={theme.palette.primary.light}
          />
        </div>
        {/* <div className={classes.voteContainer}>
          <span>0</span>
        </div> */}
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
        <div className={classes.voteContainer}>
          <span>{subCredits.votes}</span>
        </div>
      </div>
    );
  }
};
