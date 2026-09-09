import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { WHATSAPP_NUMBER } from '../config';

const AppBarFixed: React.FC = () => {
    const handleContactClick = () => {
        const message = "Olá! Gostaria de fazer um pedido no Gute Burguer.";
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                height: '72px',
                justifyContent: 'center',
                backgroundColor: 'rgba(15, 15, 15, 0.95)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 111, 0, 0.25)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                zIndex: 1100
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '72px !important' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LunchDiningIcon sx={{ color: '#ff6f00', fontSize: '2.2rem' }} />
                        <Typography
                            variant="h6"
                            component="a"
                            href="/"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                                letterSpacing: '.1rem',
                                color: 'white',
                                textDecoration: 'none',
                                fontFamily: "'Outfit', 'Inter', sans-serif"
                            }}
                        >
                            GUTE <span style={{ color: '#ff6f00' }}>BURGUER</span>
                        </Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        startIcon={<WhatsAppIcon />}
                        onClick={handleContactClick}
                        sx={{
                            color: '#ff6f00',
                            borderColor: '#ff6f00',
                            fontWeight: 800,
                            textTransform: 'none',
                            borderRadius: '20px',
                            px: 3,
                            '&:hover': {
                                backgroundColor: '#ff6f00',
                                color: 'white',
                                borderColor: '#ff6f00',
                                boxShadow: '0 0 15px rgba(255, 111, 0, 0.4)'
                            }
                        }}
                    >
                        Pedir no WhatsApp
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppBarFixed;
