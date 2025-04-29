import HomePage from './components/HomePage/HomePage'
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material'

let theme = createTheme(
    {
        palette: {
            primary: {
                main: '#2c91f4',
            },
            secondary: {
                main: '#f50000',
            },
            error: {
                main: '#f49536',
            },
            background: {
                default: 'white',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 700,
            },
            h3: {
                fontWeight: 600,
            },
            h4: {
                fontWeight: 600,
            },
            h5: {
                fontWeight: 500,
            },
            h6: {
                fontWeight: 500,
            },
        },
    }
)

theme = responsiveFontSizes(theme);

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <HomePage/>
        </ThemeProvider>
    );
}

export default App;