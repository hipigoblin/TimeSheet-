import React from "react";
import TextField from '@material-ui/core/TextField'


const Txt = ({todo , textchange}) =>{
    return(
        <TextField
        id="Todo"
        label="Todo"
        margin="normal"
        onChange={textchange}
        />
    )
}
export default Txt;