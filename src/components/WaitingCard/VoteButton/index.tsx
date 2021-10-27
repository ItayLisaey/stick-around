import { HowToVote } from '@mui/icons-material';
import { Button } from '@mui/material';
import classNames from 'classnames';
import { creditType } from '../../../types/movies.interface';
import classes from './vote-button.module.scss';

export interface VoteButtonProps {
  onClick: (type: 'during' | 'after') => void;
  hasVoted: boolean;
  creditType: creditType;
}

export const VoteButton: React.VFC<VoteButtonProps> = ({
  onClick,
  creditType,
  hasVoted,
}) => {

  if (!hasVoted) {
    return (
      <Button
        className={classNames(classes.voteContainer, { voted: hasVoted })}
        onClick={(e) => onClick(creditType)}
      >
        <HowToVote />
        <span>VOTE</span>
      </Button>
    );
  } else {
    return (
      <Button className={classes.votedContainer} disabled>
        <HowToVote />
        <span>VOTED</span>
      </Button>
    );
  }
};
