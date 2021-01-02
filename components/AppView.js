import {useState} from "react";
import SeedSelectionScreen from "./SeedSelectionScreen";
import TrackSelector from "./TrackSelector";

export default function AppView({token}) {
    const [seedSelectionMode, toggleSeedSelectionMode] = useState(true)
    const [genreSeeds, setGenreSeeds] = useState([])
    const [artistSeeds, setArtistSeeds] = useState([])
    const [trackSeeds, setTrackSeeds] = useState([])


    if (seedSelectionMode) {
        return <>
            <SeedSelectionScreen setArtistSeeds={setArtistSeeds} setGenreSeeds={setGenreSeeds} token={token}
                                 setTrackSeeds={setTrackSeeds} onContinue={() => toggleSeedSelectionMode(false)}/>
        </>
    } else {
        return <TrackSelector token={token} artistSeeds={artistSeeds} genreSeeds={genreSeeds} trackSeeds={trackSeeds}/>
    }
}