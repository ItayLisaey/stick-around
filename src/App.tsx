import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { App as CapacitorApp } from '@capacitor/app';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { Home } from './pages/Home';
import theme from './theme/theme';
import { DeviceProvider } from './context/device.context';
import { QueryClient, QueryClientProvider } from 'react-query';

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
export const analytics = getAnalytics(app);

function App() {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
            CapacitorApp.exitApp();
        } else {
            window.history.back();
        }
    });

    const queryClient = new QueryClient();

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <DeviceProvider>
                    <ThemeProvider theme={theme}>
                        <Router>
                            <Home />
                        </Router>
                    </ThemeProvider>
                </DeviceProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
