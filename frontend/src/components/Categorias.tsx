import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LandingPageContext } from '../context/context';

const Categorias = () => {
    const { pratos, categorias, categoria: categoriaSelecionada, setCategoria } = React.useContext(LandingPageContext);
    const hasPromos = pratos.some(prato => prato.promocao);
    const listaCategorias = ["Todos", ...categorias.map(c => c.nome)];

    return (
        <Box sx={{
            position: 'sticky',
            top: '72px',
            zIndex: 1050,
            backgroundColor: 'rgba(15, 15, 15, 0.98)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255, 111, 0, 0.3)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.7)',
            width: '100%',
            mt: hasPromos ? 0 : '72px',
            py: 1.5,
            justifyContent: 'center',
            display: 'flex'
        }}>
            <Box sx={{
                display: 'flex',
                gap: { xs: 1.5, md: 2 },
                width: '100%',
                maxWidth: '1200px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                px: { xs: 2, md: 4 },
                py: 0.5,
                justifyContent: 'flex-start',
                alignItems: 'center',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' }
            }}>
                {listaCategorias.map((cat, index) => {
                    const isSelected = categoriaSelecionada === cat;
                    return (
                        <Button
                            key={index}
                            variant={isSelected ? "contained" : "text"}
                            sx={{
                                flexShrink: 0,
                                borderRadius: '30px',
                                textTransform: 'none',
                                fontWeight: 800,
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                color: isSelected ? 'white' : '#ccc',
                                backgroundColor: isSelected ? '#ff6f00' : 'rgba(255, 255, 255, 0.05)',
                                border: isSelected ? '1px solid #ff6f00' : '1px solid rgba(255, 255, 255, 0.12)',
                                boxShadow: isSelected ? '0 4px 16px rgba(255, 111, 0, 0.5)' : 'none',
                                px: { xs: 2.5, md: 3.5 },
                                py: { xs: 0.8, md: 1 },
                                transition: 'all 0.25s ease',
                                '&:hover': {
                                    backgroundColor: isSelected ? '#e65100' : 'rgba(255, 111, 0, 0.25)',
                                    borderColor: '#ff6f00',
                                    color: 'white',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                            onClick={() => setCategoria(cat)}
                        >
                            {cat}
                        </Button>
                    );
                })}
            </Box>
        </Box>
    );
}

export default Categorias;
