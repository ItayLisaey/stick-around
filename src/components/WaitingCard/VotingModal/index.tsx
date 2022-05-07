import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogProps } from '@mui/material';
import { logEvent } from 'firebase/analytics';
import { useMutation, useQueryClient } from 'react-query';
import { analytics } from '../../../App';
import { useDialogInstance } from '../../../hooks/useDialog';
import { movieService } from '../../../services/movies.service';
import theme from '../../../theme/theme';
import { Movie } from '../../../types/movies.interface';
import classes from './voting-modal.module.scss';
import { VotingModalQuestion } from './voting-modal.utils';

export interface VotingModalProps extends DialogProps {
    type: 'during' | 'after';
    actions: useDialogInstance['actions'];
    movie: Movie;
}

export const VotingModal: React.VFC<VotingModalProps> = ({
    open,
    onClose,
    type,
    actions,
    movie,
}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ['credits', movie.id],
        (content: boolean) => movieService.vote(movie.id, type, content),
        {
            onSuccess: () => {
                queryClient.refetchQueries(['credits', movie.id]);
                actions.close();
            },
        }
    );

    function handleVote(boolean: boolean) {
        return () => {
            logEvent(analytics, 'vote', { movie: movie.title, vote: boolean });
            mutation.mutate(boolean);
        };
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            className={classes.dialog}
        >
            <div className={classes.container}>
                <span>{VotingModalQuestion[type]}</span>
                <div className={classes.votingContainer}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleVote(true)}
                        disableElevation
                    >
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            color={theme.palette.primary.dark}
                        />
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleVote(false)}
                        disableElevation
                    >
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            color={theme.palette.primary.dark}
                        />
                    </Button>
                </div>
                {mutation.isLoading && <span>Processing your vote...</span>}
                {mutation.isError && (
                    <span>Vote failed, please try again.</span>
                )}
            </div>
        </Dialog>
    );
};
