import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Avatar, Box, Dialog, Paper } from '@mui/material';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';
import { useTheme } from '@mui/material/styles';

export default function SignIn({isOpen}:{isOpen:boolean}) {
  const supabase = useSupabaseClient()
  const theme = useTheme()
  return (
    <Dialog open={isOpen} >
      <Box
        component={Paper}
        sx={{
          py: 6,
          px: 9,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{ height: "4rem", width: "4rem", mb: 2 }}
          src="https://pbs.twimg.com/profile_images/1240932977422598144/VZ-Bp63M_400x400.jpg"
        />
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: { background: '#38BCF7', color: 'black' },
              anchor: { color: '#38BCF7' },
            },
          }}
          magicLink
          providers={['google']}
          redirectTo="/signin"
          theme={theme.palette.mode}
        />
      </Box>
    </Dialog>
  );
}