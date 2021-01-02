import axios from "axios";

export default async (req, res) => {
    const {refresh_token} = req.query
    axios({
        method: 'post',
        url: `https://accounts.spotify.com/api/token`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Basic ${(process.env.SPOTIFY_CLIENT_ID + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}`
        },
        data: `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
    })
        .then((result) => {
            return res.send(result.data)
        })
        .catch(function (error) {
            return res.status(500).send({ error })
        });
}