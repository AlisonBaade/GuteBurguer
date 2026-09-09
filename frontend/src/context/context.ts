import { createContext } from 'react'
import { LandingPageContextType } from './types'

export const LandingPageContext = createContext<LandingPageContextType>({} as LandingPageContextType)
