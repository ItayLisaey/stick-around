import { CircularProgress } from '@mui/material';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CreditsData, creditType, Movie } from '../../types/movies.interface';
import { shouldWait, waitingText } from '../../utils/credits.utils';
import classes from './waiting-card.module.scss';
import { CreditsMark } from './CreditsMark';
import { VoteButton } from './VoteButton';
import { VotingModal } from './VotingModal';
import { TrustMessage } from './TrustMessage';

export interface WaitingCardProps {
    movie: Movie;
    credits: CreditsData;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    reloadCredits: () => Promise<void>;
}

export const WaitingCard: React.VFC<WaitingCardProps> = ({
    movie,
    credits,
    open,
    setOpen,
    reloadCredits,
}) => {
    const [modalType, setModalType] = useState<creditType>('during');
    const [should, setShould] = useState<1 | 0 | -1>(0);

    const handleClose = () => setOpen(false);

    function handleOpen(type: creditType) {
        setModalType(type);
        setOpen(true);
    }

    // useEffect(() => {
    //     console.log('reloaded');

    //     reloadCredits();
    // }, [open, movie, reloadCredits]);

    useEffect(() => {
        setShould(shouldWait(credits.movie) ?? 0);
    }, [credits]);

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
                    <div
                        className={classNames(classes.creditsContainer, {
                            [classes.admin]: credits.movie.trust === 1,
                        })}
                    >
                        <span>
                            <em>During</em> the credits?
                        </span>
                        <CreditsMark
                            count={credits.movie.during}
                            trust={credits.movie.trust}
                        />
                        {credits.movie.trust !== 1 && (
                            <VoteButton
                                onClick={handleOpen}
                                creditType={'during'}
                                hasVoted={credits.vote.during}
                            />
                        )}
                    </div>
                </div>
                <div className={classes.creditsRow}>
                    <div
                        className={classNames(classes.creditsContainer, {
                            [classes.admin]: credits.movie.trust === 1,
                        })}
                    >
                        <span>
                            <em>After</em> the credits?
                        </span>
                        <CreditsMark
                            count={credits.movie.after}
                            trust={credits.movie.trust}
                        />
                        {credits.movie.trust !== 1 && (
                            <VoteButton
                                onClick={handleOpen}
                                creditType={'after'}
                                hasVoted={credits.vote.after}
                            />
                        )}
                    </div>
                </div>
                <TrustMessage
                    trust={credits.movie.trust}
                    total={credits.movie.total}
                />

                <VotingModal
                    open={open}
                    onClose={handleClose}
                    creditType={modalType}
                    setOpen={setOpen}
                    movie={movie}
                    reloadCredits={reloadCredits}
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
