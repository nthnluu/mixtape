import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useEffect, useState} from "react";
import axios from "axios";

export default function PlaylistSelector({value, onChange, token}) {
    const [playlists, setPlaylists] = useState([])
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/playlists?token=${token}`

    useEffect(() => {
        axios.get(apiEndpoint)
            .then(res => setPlaylists(res.data))
            .catch(error => console.log(error))
    }, [])
    return <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Playlist</InputLabel>
        <Select
            fullWidth
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={onChange}
            label="Playlist"
        >
            {playlists.map(playlist => <MenuItem key={playlist.id} value={playlist.id}>{playlist.name}</MenuItem>)}
        </Select>
    </FormControl>
}