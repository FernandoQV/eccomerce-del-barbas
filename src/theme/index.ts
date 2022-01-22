import { extendTheme, theme } from "@chakra-ui/react";

export const themeCurrent=extendTheme({
    colors:{
        primary:theme.colors.cyan,
        secondary:theme.colors.orange
    },
    styles:{
        global:{
            body:{
                bg:'primary.50'
            }
        }
    }
})