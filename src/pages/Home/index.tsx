import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Fade, Grow } from '@mui/material';
import { BottomNav } from '../../components/BottomNav';
import { HighlightTab } from '../Tabs/HighlightTab';
import { SearchTab } from '../Tabs/SearchTab';
import { MoviePage } from '../MoviePage';
import { checkFirstTime } from '../../utils/intro.utils';
import { Intro } from '../../components/Intro';
import { SupportTab } from '../Tabs/SupportTab';
import { Broadcast } from '../../components/Broadcast';
import classes from './home.module.scss';

export interface HomeProps {}

export const Home: React.VFC<HomeProps> = () => {
    const [firstTime, setFirstTime] = useState(false);

    useEffect(() => {
        async function check() {
            setFirstTime(await checkFirstTime());
        }
        check();
    }, []);

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
                                <SupportTab />
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
            {firstTime ? <Intro exit={setFirstTime} /> : <Broadcast />}
        </div>
    );
};
