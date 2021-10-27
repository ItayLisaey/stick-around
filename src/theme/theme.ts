import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#6E85B2',
            dark: '#261C2C',
            light: '#6E85B2'
		},
		secondary: {
            main: '#5C527F',
        },
        success: {
            main: '#4AA96C',
        },
        error: {
            main: '#FF5C58'
        },
        background: {
            default: '#261C2C',
        }
        
	},
});

export default theme;
