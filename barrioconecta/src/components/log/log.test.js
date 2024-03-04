
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Log from './Log.jsx';

// Mockeo de Link
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: ({ children, to }) => <a href={to}>{children}</a>,
}));


describe("<Log/>", () => {
    test("Renderizar el componente", () => {
        render(
            <BrowserRouter>
                <Log />
            </BrowserRouter>
        );

        const labelUsuario = screen.getByLabelText(/Usuario:/i);
        const inputUsuario = screen.getByRole('textbox', { name: /Usuario:/i });
        const labelContraseña = screen.getByText(/Contraseña:/i);
        const inputContraseña = screen.getByLabelText(/Contraseña:/i);

        const button = screen.getByText(/Conectar/i);

        expect(labelUsuario).toBeInTheDocument();
        expect(inputUsuario).toBeInTheDocument();
        expect(labelContraseña).toBeInTheDocument();
        expect(inputContraseña).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });


    test("Funcionalidad del botón enviar", () => {
        render(
            <BrowserRouter>
                <Log />
            </BrowserRouter>
        );

        // Simula la entrada del usuario 
        const inputUsuario = screen.getByRole('textbox', { name: /Usuario:/i });
        const inputContraseña = screen.getByLabelText(/Contraseña:/i);

        fireEvent.change(inputUsuario, { target: { value: 'Gaby' } });
        fireEvent.change(inputContraseña, { target: { value: 'barrioconecta' } });

        // Simula clic en el botón
        const button = screen.getByText(/Conectar/i);
        fireEvent.click(button);

    });

});





