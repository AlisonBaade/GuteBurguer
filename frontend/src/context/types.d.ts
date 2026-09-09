import type React from 'react';

export type Pratos = {
    id: number,
    nome: string,
    descricao: string,
    preco: string,
    preco_promocional: string | null,
    imagem: string,
    categoria: number,
    promocao: boolean
}

export type CategoriaType = {
    id: number,
    nome: string
}

export type LandingPageContextType = {
    pratos: Pratos[],
    setPratos: React.Dispatch<React.SetStateAction<Pratos[]>>,
    categoria: string,
    setCategoria: React.Dispatch<React.SetStateAction<string>>,
    categorias: CategoriaType[],
    setCategorias: React.Dispatch<React.SetStateAction<CategoriaType[]>>
}
