import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter()
    const [user, setUser] = useState({status: 'LOADING', token: undefined})
    const {access, refresh, expire, error} = router.query

    function signInSpotify() {
        window.location.href = `/api/spotify_login`
    }

    useEffect(() => {
        const ls = window.localStorage
        if (access && refresh && expire) {
            let expirationDate = new Date()
            expirationDate.setSeconds(expirationDate.getSeconds() + (expire / 2))
            ls.setItem('spotifyAccessToken', access)
            ls.setItem('spotifyRefreshToken', refresh)
            ls.setItem('spotifyExpires', expirationDate)
            setUser({status: 'IN', token: {access, refresh, expire: expirationDate}})
        }

        const accessToken = ls.getItem('spotifyAccessToken');
        const refreshToken = ls.getItem('spotifyRefreshToken');
        const expiresAt = ls.getItem('spotifyExpires');

        if (accessToken && refreshToken && expiresAt) {
            let expirationDate = new Date(expiresAt)
            setUser({status: 'IN', token: {access: accessToken, refresh: refreshToken, expire: expirationDate}})
        } else {
            setUser({status: 'OUT', token: undefined})
        }
    }, [access, refresh, expire])

    const getToken = () => {
        const now = new Date()
        if (now >= user.token.expire) {
            // Refresh token
            return ''
        } else {
            // Return current access token
            return user.token.access
        }

    }

    return <div className="flex items-center h-full justify-center">
        <div className="text-center max-w-md space-y-4">
            <h1 className="text-4xl font-bold">Welcome to Mixtape</h1>
            <h1>{user.status === 'IN' && getToken()}</h1>
            <button onClick={signInSpotify}
                    className="text-lg border-2 border-white px-4 py-2 hover:opacity-50 focus:opacity-75">
                <i className="fab fa-spotify mr-2 text-xl"/>Continue with Spotify
            </button>
        </div>


    </div>
}
