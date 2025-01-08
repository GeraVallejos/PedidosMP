import { CssBaseline, ThemeProvider } from "@mui/material"
import { purpleTheme } from "./purpleTheme"


// eslint-disable-next-line react/prop-types
const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline>
                {children}
            </CssBaseline>
        </ThemeProvider>
    )
}

export default AppTheme