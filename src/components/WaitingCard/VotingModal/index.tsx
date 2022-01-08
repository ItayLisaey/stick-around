import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from '@mui/material';
import { logEvent } from 'firebase/analytics';
import { Dispatch, SetStateAction, useContext } from 'react';
import { fireVote } from '../../../api/backend/movies';
import { analytics } from '../../../App';
import { DeviceContext } from '../../../context/device.context';
import theme from '../../../theme/theme';
import { Movie } from '../../../types/movies.interface';
import classes from './voting-modal.module.scss';

export interface VotingModalProps {
    open: boolean;
    onClose: () => void;
    creditType: 'during' | 'after';
    setOpen: Dispatch<SetStateAction<boolean>>;
    movie: Movie;
    votingStatus: {
        after: boolean;
        during: boolean;
    };
}

export const VotingModal: React.VFC<VotingModalProps> = ({
    open,
    onClose,
    creditType,
    setOpen,
    movie,
    votingStatus,
}) => {
    const question = () => {
        if (creditType === 'after') {
            return 'Is there an after credits scene?';
        } else {
            return 'Is there a scene during the credits?';
        }
    };

    const { deviceID } = useContext(DeviceContext);

    async function handleVote(boolean: boolean) {
        if (deviceID) {
            logEvent(analytics, 'vote', { movie: movie.title, vote: boolean });
            const voteTry = await fireVote(
                movie.id,
                creditType,
                boolean,
                deviceID.uuid
            );
            if (!voteTry) {
                console.error('Voting error');
                logEvent(analytics, 'vote-success', { success: false });
            } else {
                logEvent(analytics, 'vote-success', { success: true });
                setOpen(false);
            }
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className={classes.modalBox}>
                <span>{question()}</span>
                <div className={classes.votingContainer}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={(e) => handleVote(true)}
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
                        onClick={(e) => handleVote(false)}
                        disableElevation
                    >
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            color={theme.palette.primary.dark}
                        />
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
