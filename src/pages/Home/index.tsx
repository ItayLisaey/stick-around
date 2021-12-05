import { useEffect, useState } from 'react';
import {
    Switch,
    Route,
    useLocation,
    useHistory,
    Redirect,
} from 'react-router-dom';
import { Fade, Grow } from '@mui/material';
import { BottomNav } from '../../components/BottomNav';
import { HighlightTab } from '../Tabs/HighlightTab';
import { SearchTab } from '../Tabs/SearchTab';
import { MoviePage } from '../MoviePage';
import { checkFirstTime } from '../../utils/intro.utils';
import { Intro } from '../../components/Intro';
import classes from './home.module.scss';
import { DonateTab } from '../Tabs/DonateTab';

export interface HomeProps {}

export const Home: React.VFC<HomeProps> = () => {
    const history = useHistory();
    const location = useLocation();
    const [firstTime, setFirstTime] = useState(false);

    useEffect(() => {
        async function check() {
            setFirstTime(await checkFirstTime());
        }
        check();
    });

    return (
        <div className={classes.container}>
            <Switch>
                <Route path="/movies/:id">
                    {({ match }) => (
                        <Grow in={match !== null}>
                            <main>
                                <MoviePage id={match?.params.id ?? '0'} />
                            </main>
                        </Grow>
                    )}
                </Route>
                <Route path="/highlight" exact>
                    {({ match }) => (
                        <Fade in={match !== null}>
                            <main>
                                <HighlightTab />
                            </main>
                        </Fade>
                    )}
                </Route>
                <Route path="/search" exact>
                    {({ match }) => (
                        <Fade in={match !== null}>
                            <main>
                                <SearchTab />
                            </main>
                        </Fade>
                    )}
                </Route>
                <Route path="/donate" exact>
                    {({ match }) => (
                        <Fade in={match !== null}>
                            <main>
                                <DonateTab />
                            </main>
                        </Fade>
                    )}
                </Route>

                <Route path="/">
                    <Redirect to="/highlight" />
                </Route>

                <Route path="*">
                    <Redirect to="/highlight" />
                </Route>
            </Switch>
            <footer>
                <BottomNav />
            </footer>
            {firstTime && <Intro exit={setFirstTime} />}
        </div>
    );
};
