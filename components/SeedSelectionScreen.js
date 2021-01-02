import GenreAutocomplete from "./GenreAutocomplete";
import {Button} from "@material-ui/core";
import ArtistAutocomplete from "./ArtistAutocomplete";
import TrackAutocomplete from "./TrackAutocomplete";

export default function SeedSelectionScreen({token, setGenreSeeds, setArtistSeeds, setTrackSeeds, onContinue}) {
    return <div className='space-y-4 max-w-md'>
        <div className='pb-4'>
            <h1 className="text-4xl font-bold mb-2">Configure your search</h1>
            <p className='opacity-75'>We'll find tracks similar to the artists and songs you specify</p>
        </div>
        <GenreAutocomplete token={token} onChange={val => setGenreSeeds(val)}/>
        <ArtistAutocomplete token={token} onChange={val => setArtistSeeds(val)}/>
        <TrackAutocomplete token={token} onChange={val => setTrackSeeds(val)}/>
        <Button variant='contained' fullWidth onClick={onContinue}>Continue</Button>
    </div>
}