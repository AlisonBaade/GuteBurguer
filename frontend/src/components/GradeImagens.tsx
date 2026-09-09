import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { LandingPageContext } from '../context/context';
import { WHATSAPP_NUMBER } from '../config';
import { resolveImageUrl } from '../utils/images';

const PromoCarousel: React.FC = () => {
    const { pratos } = useContext(LandingPageContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const promos = pratos.filter(p => p.promocao);

    useEffect(() => {
        if (promos.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % promos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [promos.length]);

    useEffect(() => {
        if (currentIndex >= promos.length) {
            setCurrentIndex(0);
        }
    }, [currentIndex, promos.length]);

    if (promos.length === 0) {
        return null;
    }

    const activeIndex = currentIndex % promos.length;
    const currentPromo = promos[activeIndex];

    const getImageUrl = (path: string) =>
        resolveImageUrl(path, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80');

    const handleWhatsAppRedirect = (nome: string, preco: string, precoPromo: string | null) => {
        const precoFinal = precoPromo ? precoPromo : preco;
        const message = `Olá! Gostaria de pedir a promoção do cardápio: ${nome} por R$ ${precoFinal}!`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev - 1 + promos.length) % promos.length);
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev + 1) % promos.length);
    };

    return (
        <Box sx={{
            position: 'relative',
            minHeight: { xs: '680px', sm: '760px', md: '610px', lg: '660px' },
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#0f0f0f',
            backgroundImage: [
                'radial-gradient(circle at 82% 28%, rgba(255, 111, 0, 0.22) 0%, transparent 38%)',
                'linear-gradient(115deg, #0b0b0b 0%, #111 55%, #17100b 100%)'
            ].join(', '),
            borderBottom: '4px solid #ff6f00',
            display: 'flex',
            alignItems: 'center',
            pt: { xs: '6.5em', md: '6em' },
            pb: { xs: 7, md: 5 },
            '&::before': {
                content: '""',
                position: 'absolute',
                width: { xs: 280, md: 520 },
                height: { xs: 280, md: 520 },
                right: { xs: -140, md: -110 },
                top: { xs: 90, md: 40 },
                border: '1px solid rgba(255, 111, 0, 0.16)',
                borderRadius: '50%'
            }
        }}>
            <Box sx={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                width: 'min(94vw, 1500px)',
                mx: 'auto',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: { xs: 2, sm: 4, md: 6, lg: 8 },
                gap: { xs: 4, md: 7, lg: 10 }
            }}>
                <Box sx={{
                    flex: 0.9,
                    maxWidth: { md: 620 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: { xs: 'center', md: 'left' },
                    alignItems: { xs: 'center', md: 'flex-start' }
                }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: '#ff6f00',
                            fontWeight: 900,
                            fontSize: { xs: '0.78rem', sm: '0.9rem' },
                            letterSpacing: '3px',
                            backgroundColor: 'rgba(255, 111, 0, 0.1)',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            mb: 1
                        }}
                    >
                        PROMOÇÃO IMPERDÍVEL 🔥
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'white',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            mb: 2,
                            fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem', lg: '4.35rem' },
                            fontFamily: "'Outfit', 'Inter', sans-serif"
                        }}
                    >
                        {currentPromo.nome}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#b0b0b0',
                            mb: 3,
                            maxWidth: '550px',
                            fontSize: { xs: '1rem', md: '1.15rem' },
                            lineHeight: 1.6
                        }}
                    >
                        {currentPromo.descricao}
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'baseline',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        gap: { xs: 1.25, sm: 2 },
                        mb: 3
                    }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#777',
                                textDecoration: 'line-through',
                                fontWeight: 700,
                                fontSize: { xs: '1rem', sm: '1.2rem' }
                            }}
                        >
                            De: R$ {currentPromo.preco}
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                color: '#ff6f00',
                                fontWeight: 900,
                                fontSize: { xs: '2rem', sm: '2.45rem', md: '3.1rem' }
                            }}
                        >
                            Por: R$ {currentPromo.preco_promocional}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<WhatsAppIcon />}
                        onClick={() => handleWhatsAppRedirect(currentPromo.nome, currentPromo.preco, currentPromo.preco_promocional)}
                        sx={{
                            backgroundColor: '#ff6f00',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1rem',
                            textTransform: 'none',
                            px: 4,
                            py: 1.5,
                            borderRadius: '30px',
                            boxShadow: '0 8px 20px rgba(255, 111, 0, 0.4)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#e65100',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 24px rgba(255, 111, 0, 0.6)',
                            }
                        }}
                    >
                        Pedir pelo WhatsApp
                    </Button>
                </Box>

                <Box sx={{
                    flex: 1.1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: { md: 720 },
                    height: { xs: 245, sm: 330, md: 470, lg: 520 },
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: { xs: '22px', md: '32px' },
                    background: 'linear-gradient(145deg, rgba(255, 111, 0, 0.22), rgba(255, 111, 0, 0.04))',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    boxShadow: '0 28px 70px rgba(0, 0, 0, 0.45)',
                    boxSizing: 'border-box'
                }}>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: { xs: '16px', md: '22px' },
                        overflow: 'hidden',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.45)',
                        '&:hover img': { transform: 'scale(1.08)' }
                    }}>
                        <Box
                            component="img"
                            src={getImageUrl(currentPromo.imagem)}
                            alt={currentPromo.nome}
                            sx={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease'
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {promos.length > 1 && (
                <>
                    <IconButton
                        onClick={handlePrev}
                        aria-label="Promoção anterior"
                        sx={{
                            position: 'absolute',
                            left: { xs: 8, md: 24 },
                            color: 'white',
                            backgroundColor: 'rgba(0,0,0,0.55)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            '&:hover': { backgroundColor: 'rgba(255, 111, 0, 0.8)' }
                        }}
                    >
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleNext}
                        aria-label="Próxima promoção"
                        sx={{
                            position: 'absolute',
                            right: { xs: 8, md: 24 },
                            color: 'white',
                            backgroundColor: 'rgba(0,0,0,0.55)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            '&:hover': { backgroundColor: 'rgba(255, 111, 0, 0.8)' }
                        }}
                    >
                        <NavigateNextIcon />
                    </IconButton>

                    <Box sx={{
                        position: 'absolute',
                        bottom: 15,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        {promos.map((_, idx) => (
                            <Box
                                key={promos[idx].id}
                                onClick={() => setCurrentIndex(idx)}
                                role="button"
                                aria-label={`Ir para a promoção ${idx + 1}`}
                                aria-current={idx === activeIndex ? 'true' : undefined}
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        setCurrentIndex(idx);
                                    }
                                }}
                                sx={{
                                    width: idx === activeIndex ? 24 : 8,
                                    height: 8,
                                    borderRadius: '4px',
                                    backgroundColor: idx === activeIndex ? '#ff6f00' : 'rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default PromoCarousel;
