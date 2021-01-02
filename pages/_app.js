import '../styles/globals.css'
import dynamic from "next/dynamic";
import {useEffect} from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";

const BlurryImageBackground = dynamic(() => import("../components/BlurryBackgroundImage"), {
    ssr: false,
});

function MyApp({Component, pageProps}) {
    function adaptViewport() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    useEffect(() => {
        adaptViewport()
        window.addEventListener('resize', adaptViewport);
    }, [])

    const theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#ffffff',
            },
            secondary: {
                main: '#19857b',
            }
        },
    });

    return <>
        <ThemeProvider theme={theme}>
            <BlurryImageBackground image={'https://miro.medium.com/max/3840/1*ZF-E6Z4iLzCGwtavfPRp6g.png'}>
                <Component {...pageProps} />
            </BlurryImageBackground>
        </ThemeProvider>
    </>
}

export default MyApp
