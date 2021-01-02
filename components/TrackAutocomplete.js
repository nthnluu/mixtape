import {useEffect, useState} from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

export default function TrackAutocomplete({token, onChange}) {
    const [results, setResults] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search/track/${encodeURIComponent(inputValue)}?token=${token}`)
            .then(res => setResults(res.data))
            .catch(error => console.log(error))
    }, [inputValue])

    return <Autocomplete
        multiple
        freeSolo
        onChange={(event, value) => onChange(value.map(elem => elem.id))}
        onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
        }}
        renderTags={(value, getTagProps) =>
            value.map((option, index) => (
                <Chip variant="outlined" label={option.name} {...getTagProps({index})} />
            ))
        }
        id="combo-box-demo"
        options={results}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Tracks"/>}
    />

}