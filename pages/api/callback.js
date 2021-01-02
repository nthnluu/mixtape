import axios from "axios";

export default async (req, res) => {
    const {code, error} = req.query

    let status;
    if (error) {
        // User declined auth request/an error occurred
        status = 'ERROR'
    } else {
        // User successfully authenticated
        status = 'SUCCESS'
        axios({
            method: 'post',
            url: `https://accounts.spotify.com/api/token`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(process.env.SITE_URL + "/api/callback/")}&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
        })
            .then((result) => {
                return res.redirect(`${process.env.SITE_URL}?access=${result.data['access_token']}&refresh=${result.data['refresh_token']}&expire=${result.data['expires_in']}`)
            })
            .catch(function (error) {
                return res.redirect(`${process.env.SITE_URL}?error=true`)
            });
    }
}