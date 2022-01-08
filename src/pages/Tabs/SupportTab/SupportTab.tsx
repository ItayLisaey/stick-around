import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logEvent } from 'firebase/analytics';
import { useEffect } from 'react';
import { analytics } from '../../../App';
import { DONATE_CONST } from '../../../constants/donate.constant';
import classes from './support-tab.module.scss';

export interface DonateTabProps {}

export const SupportTab: React.VFC<DonateTabProps> = () => {
    useEffect(() => {
        logEvent(analytics, 'page_view', { page_title: 'support' });
    }, []);

    return (
        <div className={classes.root}>
            <FontAwesomeIcon icon={faHeart} className={classes.icon} />
            <h1>{DONATE_CONST.title}</h1>
            <p>{DONATE_CONST.para}</p>
            <a href={DONATE_CONST.link} target={'_blank'} rel="noreferrer">
                <FontAwesomeIcon icon={faPaypal} />
                <span>Donate</span>
            </a>
        </div>
    );
};
