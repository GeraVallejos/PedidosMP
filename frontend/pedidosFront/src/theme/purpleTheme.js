import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { esES } from "@mui/material/locale";


export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#055ae6'
        },
        secondary: {
            main: '#05337d'
        },
        error: {
            main: red.A400
        }
    },


},
    esES
)