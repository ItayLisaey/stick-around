import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HowToVote } from '@mui/icons-material';
import { Button } from '@mui/material';
import { registerFirstTime, sampleMovie } from '../../utils/intro.utils';
import { MovieCard } from '../MovieCard';
import classes from './intro.module.scss';

export interface IntroProps {
    exit: React.Dispatch<React.SetStateAction<boolean>>
}

export const Intro: React.VFC<IntroProps> = ({ exit }) => {
    function handleContinue() {
        registerFirstTime();
        exit(false);
    }

    return (
        <div className={classes.root}>
            <div className={classes.introContainer}>
                <div className={classes.welcomeMessage}>
                    <p>
                        Hey, thanks for downloading &#8221;Stick Around&#8221;
                    </p>
                    <p>
                        This is the main page, where you can see the movies now
                        playing at theaters.
                    </p>
                </div>
                <div className={classes.instruction}>
                    <div className={classes.moviePress}>
                        <MovieCard movie={sampleMovie} dummy />
                        <FontAwesomeIcon icon={faHandPointer} />
                    </div>
                    <p>
                        After pressing on a title, you will be forwarded to the
                        title’s movie page, where you can see whether or not the
                        movie has a post credits scene.
                    </p>
                    <div className={classes.vote}>
                        <HowToVote />
                        <span>VOTED</span>
                    </div>
                    <p>
                        {
                            'Please consider voting on the movie page to help increase the app’s accuracy :)'
                        }
                    </p>
                </div>
            </div>

            <div className={classes.btnContainer}>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};
