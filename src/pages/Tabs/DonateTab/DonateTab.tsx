import classes from './donate-tab.module.scss';

export interface DonateTabProps {}

export const DonateTab: React.VFC<DonateTabProps> = () => {
    return (
        <div className={classes.root}>
            <h1>hey</h1>
            <h2>consider donating</h2>
            <button>donate</button>
        </div>
    );
};
