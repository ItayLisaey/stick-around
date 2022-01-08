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
    const handleClick = () => {
        if (!hasVoted) {
            onClick(creditType);
        }
    };

    const text = !hasVoted ? 'voted' : 'vote';

    return (
        <Button
            disabled={!hasVoted}
            className={classNames(classes.voteContainer, {
                [classes.voted]: !hasVoted,
            })}
            onClick={(e) => onClick(creditType)}
        >
            <HowToVote />
            <span>{text.toUpperCase()}</span>
        </Button>
    );
};
