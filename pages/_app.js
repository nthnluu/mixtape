import '../styles/globals.css'
import dynamic from "next/dynamic";
import {createContext, useContext, useEffect, useState} from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";

export const BackgroundContext = createContext(null)

const BlurryImageBackground = dynamic(() => import("../components/BlurryBackgroundImage"), {
    ssr: false,
});

function MyApp({Component, pageProps}) {
    const [bgImage, setBgImage] = useState('https://miro.medium.com/max/3840/1*ZF-E6Z4iLzCGwtavfPRp6g.png')
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
        <BackgroundContext.Provider value={{setBgImage}}>
            <ThemeProvider theme={theme}>
                <BlurryImageBackground image={bgImage}>
                    <Component {...pageProps} />
                </BlurryImageBackground>
            </ThemeProvider>
        </BackgroundContext.Provider>
    </>
}

export default MyApp
