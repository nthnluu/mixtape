export default (req, res) => {
    return res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.SITE_URL + "/api/callback/")}&scope=user-top-read%20playlist-modify-public`)
}
