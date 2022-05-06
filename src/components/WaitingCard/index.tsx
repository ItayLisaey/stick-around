import classNames from 'classnames';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { shouldWait, waitingText } from '../../utils/credits.utils';
import classes from './waiting-card.module.scss';
import { CreditsMark } from './CreditsMark';
import { VoteButton } from './VoteButton';
import { TrustMessage } from './TrustMessage';
import { BaseMovie } from '../../models/movie.model';
import { movieService } from '../../services/movies.service';
import { useQuery } from 'react-query';
import { StatusIndicator } from '../StatusIndicator';
import { emptyCreditsData } from '../../constants/credits.constants';

export interface WaitingCardProps {
    movie: BaseMovie;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const WaitingCard: React.VFC<WaitingCardProps> = ({
    movie,
    open,
    setOpen,
}) => {
    const { data: credits, status: creditsStatus } = useQuery(
        ['credits', movie.id],
        () => movieService.credits(movie.id)
    );

    const handleClose = () => setOpen(false);

    function handleOpen() {
        setOpen(true);
    }

    const should = useMemo(() => shouldWait(credits?.movie) ?? 0, [credits]);

    const creditTypes: Array<'after' | 'during'> = ['after', 'during'];

    const loading = useMemo(() => {
        if (creditsStatus === 'loading') return true;
        return false;
    }, [creditsStatus]);

    const error = useMemo(() => {
        if (creditsStatus === 'error') return "Couldn't load credits";
        return undefined;
    }, [creditsStatus]);

    return (
        <StatusIndicator loading={loading} error={error}>
            {credits && (
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
                    {creditTypes.map((type, index) => (
                        <div className={classes.creditsRow} key={index}>
                            <div
                                className={classNames(
                                    classes.creditsContainer,
                                    {
                                        [classes.admin]:
                                            credits.movie.trust === 1,
                                    }
                                )}
                            >
                                <span>
                                    <em>{type.toUpperCase()}</em> the credits?
                                </span>
                                <CreditsMark
                                    count={credits.movie[type]}
                                    trust={credits.movie.trust}
                                />
                                {credits.movie.trust !== 1 && (
                                    <VoteButton
                                        onClick={handleOpen}
                                        creditType={type}
                                        hasVoted={credits.vote.during}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <TrustMessage
                        trust={credits.movie.trust}
                        total={credits.movie.total}
                    />

                    {/* <VotingModal
                open={open}
                onClose={handleClose}
                creditType={modalType}
                setOpen={setOpen}
                movie={movie}
            /> */}
                </div>
            )}
        </StatusIndicator>
    );
};
