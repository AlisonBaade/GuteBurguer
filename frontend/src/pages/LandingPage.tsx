import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LandingPageContextProvider from '../context/LandingPageContext';
import AppBarFixed from '../components/AppBar';
import GradeImagens from '../components/GradeImagens';
import Categorias from '../components/Categorias';
import CardPrato from '../components/CardPrato';
import Footer from '../components/Footer';
import { WHATSAPP_NUMBER, API_BASE } from '../config';

const LandingPage: React.FC = () => {
    React.useEffect(() => {
        fetch(`${API_BASE}/api/registrar-acesso/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ caminho: window.location.pathname })
        }).catch(() => console.error('Erro ao registrar acesso'));
    }, []);

    const handleWhatsAppClick = () => {
        const message = "Olá! Gostaria de ver o cardápio e fazer um pedido no Gute Burguer.";
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <LandingPageContextProvider>
            <Box sx={{ backgroundColor: '#0c0c0c', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <AppBarFixed />
                <GradeImagens />
                <Categorias />
                <CardPrato />
                <Footer />
                <Fab
                    color="success"
                    aria-label="whatsapp"
                    onClick={handleWhatsAppClick}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        backgroundColor: '#25D366',
                        color: 'white',
                        width: { xs: 56, md: 64 },
                        height: { xs: 56, md: 64 },
                        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#20ba5a',
                            transform: 'scale(1.1) rotate(5deg)',
                            boxShadow: '0 6px 20px rgba(37, 211, 102, 0.6)'
                        },
                        zIndex: 1000
                    }}
                >
                    <WhatsAppIcon sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }} />
                </Fab>
            </Box>
        </LandingPageContextProvider>
    );
};

export default LandingPage;
