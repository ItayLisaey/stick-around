import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { shouldWait, waitingText } from '../../utils/credits.utils';
import classes from './waiting-card.module.scss';
import { CreditsMark } from './CreditsMark';
import { VoteButton } from './VoteButton';
import { TrustMessage } from './TrustMessage';
import { BaseMovie } from '../../models/movie.model';
import { movieService } from '../../services/movies.service';
import { useQuery } from 'react-query';
import { StatusIndicator } from '../StatusIndicator';
import { VotingModal } from './VotingModal';
import { useDialog } from '../../hooks/useDialog';

export interface WaitingCardProps {
    movie: BaseMovie;
}

export const WaitingCard: React.VFC<WaitingCardProps> = ({ movie }) => {
    const {
        data: credits,
        status: creditsStatus,
        isFetching,
    } = useQuery(['credits', movie.id], () => movieService.credits(movie.id), {
        cacheTime: 0,
    });

    const { instance, actions } = useDialog();
    const [modalType, setModalType] = useState<'during' | 'after'>('during');

    function handleOpen(type: 'during' | 'after') {
        return () => {
            setModalType(type);
            actions.open();
        };
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
                                        onClick={handleOpen(type)}
                                        creditType={type}
                                        hasVoted={credits.vote[type]}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <TrustMessage
                        trust={credits.movie.trust}
                        total={credits.movie.total}
                    />

                    <VotingModal
                        {...instance}
                        actions={actions}
                        type={modalType}
                        movie={movie}
                    />
                </div>
            )}
        </StatusIndicator>
    );
};
