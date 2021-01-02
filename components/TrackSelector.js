import {useContext, useEffect, useState} from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {BackgroundContext} from "../pages/_app";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReactAudioPlayer from "react-audio-player";
import PlaylistSelector from "./PlaylistSelector";

export default function TrackSelector({token, artistSeeds, trackSeeds, genreSeeds}) {
    const {setBgImage} = useContext(BackgroundContext)
    const [tracks, setTracks] = useState([])
    const [trackIndex, setTrackIndex] = useState(0)
    const [playlistId, setPlaylistId] = useState()

    const currentTrack = tracks[trackIndex]

    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/recommend?artists=${artistSeeds.join()}&genres=${genreSeeds.join()}&tracks=${trackSeeds.join()}&token=${token}`
    useEffect(() => {
        axios.get(apiEndpoint)
            .then(res => setTracks(res.data))
            .catch(error => console.log(error))
    }, [artistSeeds, trackSeeds, genreSeeds])

    useEffect(() => {
        if (trackIndex > (tracks.length / 2)) {
            axios.get(apiEndpoint)
                .then(res => setTracks([...tracks, ...res.data]))
                .catch(error => console.log(error))
        }
    }, [trackIndex])

    useEffect(() => {
        setBgImage(currentTrack && currentTrack.image.url)
    }, [currentTrack])


    const navigateForward = () => {
        if (trackIndex < (tracks.length - 1)) {
            setTrackIndex(trackIndex + 1)
        }
    }

    const navigateBackwards = () => {
        if (trackIndex >= 1) {
            setTrackIndex(trackIndex - 1)
        }
    }

    const saveToPlaylist = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/add_playlist/${playlistId}/${currentTrack['uri']}?token=${token}`)
            .then(() => navigateForward())
            .catch(error => console.log(error))
    }

    return currentTrack ? <div className="max-w-lg ">
        <div className="mb-4">
            <PlaylistSelector token={token} onChange={(event) => setPlaylistId(event.target.value)} value={playlistId}/>
        </div>

        <ReactAudioPlayer
            src={currentTrack && currentTrack['preview_url']}
            autoPlay
        />
        <img src={currentTrack.image.url} className="rounded-lg w-full shadow-xl"/>
        <h1 className="text-2xl font-bold text-white mt-4">{currentTrack.name}</h1>
        <h1 className="text-lg opacity-75 text-white">{currentTrack.artists.join(', ')}</h1>
        <div className="flex justify-between items-center mt-4">
            <IconButton aria-label="delete" onClick={navigateBackwards}>
                <ArrowBackIosIcon/>
            </IconButton>
            <IconButton aria-label="delete" onClick={saveToPlaylist}>
                <FavoriteIcon/>
            </IconButton>
            <IconButton aria-label="delete" onClick={navigateForward}>
                <ArrowForwardIosIcon/>
            </IconButton>
        </div>
    </div> : null
}