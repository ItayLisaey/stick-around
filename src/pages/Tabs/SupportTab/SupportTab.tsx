import classes from './support-tab.module.scss';

export interface DonateTabProps {}

export const SupportTab: React.VFC<DonateTabProps> = () => {
    return (
        <div className={classes.root}>
            <h1>hey</h1>
            <h2>consider donating</h2>
            <button>donate</button>
        </div>
    );
};
