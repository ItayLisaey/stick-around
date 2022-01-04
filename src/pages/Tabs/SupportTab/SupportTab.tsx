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
            <h1>hey</h1>
            <h2>consider donating</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident magni soluta excepturi consectetur iusto minima
                accusamus et repellendus voluptas, distinctio libero numquam ut
                voluptatum nulla vel iure dolor nemo eius a ad nesciunt ipsa
                incidunt. Ipsum quibusdam necessitatibus tempora neque nesciunt
                possimus illum, doloremque ipsam?
            </p>
            <a href={DONATE_CONST.link} target={'_blank'} rel="noreferrer">
                donate
            </a>
        </div>
    );
};
