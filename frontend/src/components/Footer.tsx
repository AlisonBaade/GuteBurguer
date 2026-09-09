import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { WHATSAPP_DISPLAY } from '../config';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#0a0a0a',
                borderTop: '1px solid rgba(255, 111, 0, 0.3)',
                pt: 6,
                pb: 4,
                mt: 'auto',
                color: 'white'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <LunchDiningIcon sx={{ color: '#ff6f00', fontSize: '2rem' }} />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 900,
                                    letterSpacing: '.1rem',
                                    color: 'white',
                                    fontFamily: "'Outfit', 'Inter', sans-serif"
                                }}
                            >
                                GUTE <span style={{ color: '#ff6f00' }}>BURGUER</span>
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#999', lineHeight: 1.6, maxWidth: '300px' }}>
                            O verdadeiro sabor do hambúrguer artesanal. Pedidos fáceis e rápidos direto no nosso WhatsApp!
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="subtitle1" sx={{ color: '#ff6f00', fontWeight: 800, mb: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Redes Sociais
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Link
                                href="https://instagram.com/gute_burguer"
                                target="_blank"
                                rel="noopener"
                                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#ccc', textDecoration: 'none', '&:hover': { color: '#ff6f00' }, transition: 'color 0.2s' }}
                            >
                                <InstagramIcon sx={{ color: '#ff6f00' }} />
                                <Typography variant="body2" fontWeight={600}>@gute_burguer</Typography>
                            </Link>
                            <Link
                                href="https://facebook.com/gute_burguer"
                                target="_blank"
                                rel="noopener"
                                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#ccc', textDecoration: 'none', '&:hover': { color: '#ff6f00' }, transition: 'color 0.2s' }}
                            >
                                <FacebookIcon sx={{ color: '#ff6f00' }} />
                                <Typography variant="body2" fontWeight={600}>/gute_burguer</Typography>
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="subtitle1" sx={{ color: '#ff6f00', fontWeight: 800, mb: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Atendimento
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#ccc' }}>
                            <WhatsAppIcon sx={{ color: '#25D366' }} />
                            <Box>
                                <Typography variant="caption" sx={{ color: '#888', display: 'block' }}>WhatsApp demonstrativo</Typography>
                                <Typography variant="body2" fontWeight={700} sx={{ color: 'white' }}>{WHATSAPP_DISPLAY}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ borderTop: '1px solid #1f1f1f', mt: 5, pt: 3, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                        © {new Date().getFullYear()} Gute Burguer. Todos os direitos reservados.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
