import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { esES } from "@mui/material/locale";


export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#4287f5'
        },
        secondary: {
            main: '#0eada8'
        },
        error: {
            main: red.A400
        }
    },


},
    esES
)