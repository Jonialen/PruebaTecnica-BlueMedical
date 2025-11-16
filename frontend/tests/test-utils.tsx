// tests/test-utils.tsx
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

/**
 * Wrapper personalizado que incluye los providers necesarios
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}

/**
 * Función de render personalizada que incluye los providers
 */
const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-exportar todo de testing-library
export * from '@testing-library/react'

// Sobrescribir el render con el customizado
export { customRender as render }