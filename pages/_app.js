import '../styles/globals.css'
import dynamic from "next/dynamic";
import {useEffect} from "react";

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

    return <>
        <BlurryImageBackground image={'https://miro.medium.com/max/3840/1*ZF-E6Z4iLzCGwtavfPRp6g.png'}>
            <Component {...pageProps} />
        </BlurryImageBackground>
    </>
}

export default MyApp
