import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { App as CapacitorApp } from '@capacitor/app';

import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { Home } from './pages/Home';
import theme from './theme/theme';
// import { useEffect } from 'react';
// import { SplashScreen } from '@capacitor/splash-screen';


const firebaseKey = import.meta.env.VITE_FIRE_KEY as string;

const firebaseConfig = {
    apiKey: firebaseKey,

    authDomain: 'stick-around-01.firebaseapp.com',

    projectId: 'stick-around-01',

    storageBucket: 'stick-around-01.appspot.com',

    messagingSenderId: '363848154346',

    appId: '1:363848154346:web:9c86b385d000e76f8c6b93',

    measurementId: 'G-ZPY4HGZV7D',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

function App() {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
            CapacitorApp.exitApp();
        } else {
            window.history.back();
        }
    });

    // useEffect(() => {
    //     async function onStartup() {
    //         await SplashScreen.hide();
    //         await SplashScreen.show({
    //             showDuration: 2000,
    //             autoHide: true,
    //         });
    //     }

    //     onStartup();
    // }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Home />
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
