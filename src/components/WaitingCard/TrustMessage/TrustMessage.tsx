import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    faCertificate,
    faDatabase,
    faExclamationTriangle,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TRUST_MESSAGES } from '../../../constants/credits.constants';
import { Trust } from '../../../types/movies.interface';
import classes from './trust-message.module.scss';

export interface TrustMessageProps {
    trust: Trust;
    total: number;
}

export const TrustMessage: React.VFC<TrustMessageProps> = ({
    trust,
    total,
}) => {
    switch (trust) {
        case 1:
            return <TrustItemCertified icon={faCertificate} total={total} />;
        case 2:
            return <TrustItem icon={faUsers} message={TRUST_MESSAGES.Users} />;
        case 3:
            return (
                <TrustItem icon={faDatabase} message={TRUST_MESSAGES.TMDB} />
            );
        case 4:
            return (
                <TrustItem
                    icon={faExclamationTriangle}
                    message={TRUST_MESSAGES[404]}
                />
            );
        default:
            return (
                <TrustItem
                    icon={faExclamationTriangle}
                    message={TRUST_MESSAGES[404]}
                />
            );
    }
};

interface TrustItemProps {
    icon: IconProp;
    message: string;
}

export const TrustItem: React.VFC<TrustItemProps> = ({ icon, message }) => (
    <div className={classes.root}>
        <div className={classes.iconContainer}>
            <FontAwesomeIcon icon={icon} />
        </div>
        <p>{message}</p>
    </div>
);

interface TrustItemCertifiedProps {
    icon: IconProp;
    total: number;
}

export const TrustItemCertified: React.VFC<TrustItemCertifiedProps> = ({
    icon,
    total,
}) => {
    const totalVotes = (t: number) => {
        if (t < 50 || t > 5000) {
            return '';
        } else {
            return `, and over ${total} user votes`;
        }
    };
    return (
        <div className={classes.root}>
            <div className={classes.iconContainer}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className={classes.textContainer}>
                <h5>Certified</h5>
                <p>
                    {'These results have been confirmed by our moderators' +
                        totalVotes(total)}
                </p>
            </div>
        </div>
    );
};
