import {useEffect, useState} from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

export default function GenreAutocomplete({token, onChange}) {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/genres?token=${token}`)
            .then(res => setGenres(res.data))
            .catch(error => console.log(error))
    }, [])

    return <>
        <Autocomplete
            multiple
            onChange={(event, value) => onChange(value)}
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({index})} />
                ))
            }
            id="combo-box-demo"
            options={genres}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Genres"/>}
        />
    </>

}