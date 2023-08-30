import { createTheme, ThemeProvider, Box, useMediaQuery, Container, PaletteMode } from "@mui/material";
import { useState, useMemo } from "react";
import { useSelector, } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import Navbar from './navbar';
import BottomNav from "./bottomNavbar";
import { getDesignTokens } from "../styles/theme";

interface Props {
  children: React.ReactNode;
}

interface RootState {
  theme: {
    darkMode: boolean
  };
}


export default function Layout({ children }: Props) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const currentRoute: string = router.pathname;
  const path = currentRoute.replace(/\//g, "")
  const page = path.charAt(0).toUpperCase() + path.slice(1);
  const loginLayout = currentRoute !== "/login"
  const colorMode: Boolean = useSelector((state: RootState) => state.theme.darkMode);

  useMemo(() => {
    setMode((prevMode: PaletteMode) =>
      prevMode === "light" ? "dark" : "light"
    );
  }, [colorMode]);


  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title> {page} | AlphabloQ  </title>
      </Head>
      {loginLayout && <Navbar />}
      <Box component="main" sx={{ bgcolor: 'background.default' }} >
        <Container disableGutters maxWidth="xl" component="main"  >
          {children}
        </Container>
      </Box>
      {isSmallScreen && loginLayout && <BottomNav />}
    </ThemeProvider>
  );
}