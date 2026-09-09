import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { LandingPageContext } from '../context/context';
import { WHATSAPP_NUMBER } from '../config';
import { resolveImageUrl } from '../utils/images';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80';

const CardPrato = () => {
    const { pratos, categoria, categorias } = React.useContext(LandingPageContext);

    const activeCategoryObj = categorias.find(c => c.nome === categoria);

    const pratosFiltrados = categoria === "Todos"
        ? pratos
        : pratos.filter(p => p.categoria === activeCategoryObj?.id);

    const getImageUrl = (path: string) => resolveImageUrl(path, FALLBACK_IMAGE);

    const handleWhatsAppRedirect = (nome: string, preco: string, precoPromo: string | null) => {
        const precoFinal = precoPromo ? precoPromo : preco;
        const message = `Olá! Gostaria de pedir o prato: ${nome} (R$ ${precoFinal})!`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: { xs: '95%', sm: '90%', md: '80%' },
            mx: 'auto',
            mt: { xs: 3, md: 4 },
            mb: { xs: 6, md: 10 },
            gap: 3
        }}>
            {pratosFiltrados.length === 0 ? (
                <Box sx={{ textAlign: 'center', width: '100%', py: 8 }}>
                    <Typography variant="h6" sx={{ color: '#888' }}>
                        Nenhum prato cadastrado nessa categoria ainda.
                    </Typography>
                </Box>
            ) : (
                pratosFiltrados.map((prato, index) => {
                    const hasPromo = prato.promocao && prato.preco_promocional;
                    return (
                        <Box key={index} sx={{
                            width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
                            boxSizing: 'border-box'
                        }}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: '#1e1e1e',
                                border: '1px solid #2d2d2d',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    boxShadow: '0 12px 30px rgba(255, 111, 0, 0.2)',
                                    borderColor: '#ff6f00'
                                }
                            }}>
                                <Box sx={{ position: 'relative', pt: '65%', overflow: 'hidden' }}>
                                    {hasPromo && (
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            backgroundColor: '#ff6f00',
                                            color: 'white',
                                            fontWeight: 900,
                                            fontSize: '0.75rem',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: '20px',
                                            zIndex: 2,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                                        }}>
                                            OFERTA
                                        </Box>
                                    )}
                                    <CardMedia
                                        component="img"
                                        image={getImageUrl(prato.imagem)}
                                        alt={prato.nome}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease',
                                            '&:hover': {
                                                transform: 'scale(1.08)'
                                            }
                                        }}
                                    />
                                </Box>
                                <CardContent sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: 3
                                }}>
                                    {(() => {
                                        const pratoCat = categorias.find(c => c.id === prato.categoria);
                                        return pratoCat ? (
                                            <Typography variant="caption" sx={{ color: '#ff6f00', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', mb: 0.5, display: 'block' }}>
                                                {pratoCat.nome}
                                            </Typography>
                                        ) : null;
                                    })()}
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            color: 'white',
                                            fontWeight: 800,
                                            fontSize: '1.25rem',
                                            mb: 1,
                                            fontFamily: "'Outfit', 'Inter', sans-serif"
                                        }}
                                    >
                                        {prato.nome}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#b0b0b0',
                                            mb: 3,
                                            minHeight: '60px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            lineHeight: 1.4
                                        }}
                                    >
                                        {prato.descricao}
                                    </Typography>

                                    <Box sx={{
                                        mt: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            {hasPromo ? (
                                                <>
                                                    <Typography variant="body2" sx={{ color: '#777', textDecoration: 'line-through', fontWeight: 600 }}>
                                                        R$ {prato.preco}
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ color: '#ff6f00', fontWeight: 900 }}>
                                                        R$ {prato.preco_promocional}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography variant="h5" sx={{ color: '#ff6f00', fontWeight: 900 }}>
                                                    R$ {prato.preco}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<WhatsAppIcon />}
                                            onClick={() => handleWhatsAppRedirect(prato.nome, prato.preco, prato.preco_promocional)}
                                            sx={{
                                                backgroundColor: '#ff6f00',
                                                color: 'white',
                                                fontWeight: 800,
                                                borderRadius: '24px',
                                                textTransform: 'none',
                                                py: 1,
                                                boxShadow: 'none',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    backgroundColor: '#e65100',
                                                    boxShadow: '0 4px 12px rgba(255, 111, 0, 0.4)',
                                                    transform: 'translateY(-1px)'
                                                }
                                            }}
                                        >
                                            Pedir no WhatsApp
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    );
                })
            )}
        </Box>
    );
}

export default CardPrato;
