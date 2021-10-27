import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { fireVote } from '../../../firebase/vote.firebase';
import theme from '../../../theme/theme';
import { Movie } from '../../../types/movies.interface';
import {
  convertVote,
  registerVote,
} from '../../../utils/votes.utils';
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
  const [voted, setVoted] = useState(false);

  const question = () => {
    if (creditType === 'after') {
      return 'Is there an after credits scene?';
    } else {
      return 'Is there a scene during the credits?';
    }
  };

  async function handleVote(boolean: boolean) {
    if (!votingStatus[creditType]) {
      setVoted(true);
      const vote = convertVote(creditType, boolean);

      await fireVote(movie.id, vote);
      await registerVote(movie, creditType);
      setOpen(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.modalBox}>
        <span>{question()}</span>
        <div className={classes.votingContainer}>
          <Button
            variant='contained'
            color='success'
            onClick={(e) => handleVote(true)}
            disableElevation
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              color={theme.palette.primary.dark}
            />
          </Button>
          <Button
            variant='contained'
            color='error'
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
