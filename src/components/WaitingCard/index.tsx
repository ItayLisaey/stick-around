import { CircularProgress } from '@mui/material';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Credits, creditType, Movie } from '../../types/movies.interface';
import { shouldWait, waitingText } from '../../utils/credits.utils';
import { hasVoted } from '../../utils/votes.utils';
import classes from './waiting-card.module.scss';
import { CreditsMark } from './CreditsMark';
import { VoteButton } from './VoteButton';
import { VotingModal } from './VotingModal';

export interface WaitingCardProps {
    movie: Movie
    credits: Credits
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const WaitingCard: React.VFC<WaitingCardProps> = ({
    movie,
    credits,
    open,
    setOpen,
}) => {
    const [modalType, setModalType] = useState<creditType>('during');
    const [should, setShould] = useState<1 | 0 | -1>(0);
    const [votingStatus, setVotingStatus] = useState({
        after: true,
        during: true,
    });
    const handleClose = () => setOpen(false);

    function handleOpen(type: creditType) {
        setModalType(type);
        setOpen(true);
    }

    useEffect(() => {
        async function getVoteStatus() {
            const voteStatus = await hasVoted(movie);
            if (voteStatus) {
                setVotingStatus(voteStatus);
            } else {
                setVotingStatus({ after: false, during: false });
            }
        }
        getVoteStatus();
    }, [open, movie]);

    useEffect(() => {
        setShould(shouldWait(credits) ?? 0);
    }, [credits, votingStatus]);

    if (credits) {
        return (
            <div
                className={classNames(
                    classes.waitingContainer,
                    { [classes.worth]: should === 1 },
                    { [classes.notWorth]: should === -1 },
                    { [classes.maybeWorth]: should === 0 }
                )}
            >
                <h1>Should you wait?</h1>
                <h2>{waitingText(should)}</h2>
                <div className={classes.creditsRow}>
                    <div className={classes.creditsContainer}>
                        <span>During the credits?</span>
                        <CreditsMark subCredits={credits.during} />
                    </div>
                    <VoteButton
                        onClick={handleOpen}
                        creditType={'during'}
                        hasVoted={votingStatus.during}
                    />
                </div>
                <div className={classes.creditsRow}>
                    <div className={classes.creditsContainer}>
                        <span>After the credits?</span>
                        <CreditsMark subCredits={credits.after} />
                    </div>
                    <VoteButton
                        onClick={handleOpen}
                        creditType={'after'}
                        hasVoted={votingStatus.after}
                    />
                </div>
                {(credits.after.votes === 0 || credits.during.votes === 0) && (
                    <div className={classes.moreInfo}>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <div>
                            <h3>Results may be inaccurate</h3>
                            <p>
                                One or more of the fields has not been voted on
                                yet
                            </p>
                        </div>
                    </div>
                )}

                <VotingModal
                    open={open}
                    onClose={handleClose}
                    creditType={modalType}
                    setOpen={setOpen}
                    movie={movie}
                    votingStatus={votingStatus}
                />
            </div>
        );
    } else {
        return (
            <div className={classes.waitingProgressContainer}>
                <CircularProgress size={60} />
            </div>
        );
    }
};
