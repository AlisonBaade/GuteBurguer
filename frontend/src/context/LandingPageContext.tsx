import React, { ReactNode } from 'react'
import axios from 'axios';
import { Pratos, CategoriaType } from './types'
import { API_BASE } from '../config'
import { LandingPageContext } from './context'

const LandingPageContextProvider = ({ children }: { children: ReactNode }) => {
    const [pratos, setPratos] = React.useState<Pratos[]>([])
    const [categorias, setCategorias] = React.useState<CategoriaType[]>([])
    const [categoria, setCategoria] = React.useState("Todos")

    React.useEffect(() => {
        axios.get(`${API_BASE}/pratos/`)
            .then((response) => {
                const data = Array.isArray(response.data)
                    ? response.data
                    : (response.data && Array.isArray(response.data.results) ? response.data.results : []);
                setPratos(data);
            })
            .catch((err) => {
                console.error("Erro ao buscar pratos:", err);
                setPratos([]);
            })

        axios.get(`${API_BASE}/categorias/`)
            .then((response) => {
                const data = Array.isArray(response.data)
                    ? response.data
                    : (response.data && Array.isArray(response.data.results) ? response.data.results : []);
                setCategorias(data);
            })
            .catch((err) => {
                console.error("Erro ao buscar categorias:", err);
                setCategorias([]);
            })
    }, [])

    const value = {
        pratos,
        setPratos,
        categoria,
        setCategoria,
        categorias,
        setCategorias
    }

    return (
        <LandingPageContext.Provider value={value}>
            {children}
        </LandingPageContext.Provider>
    )
}

export default LandingPageContextProvider
