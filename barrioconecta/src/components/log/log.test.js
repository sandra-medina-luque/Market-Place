
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Log from './Log.jsx';


const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
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
 
        const inputUsuario = screen.getByRole('textbox', { name: /Usuario:/i });
        const inputContraseña = screen.getByLabelText(/Contraseña:/i);

        fireEvent.change(inputUsuario, { target: { value: 'Gaby' } });
        fireEvent.change(inputContraseña, { target: { value: 'barrioconecta' } });

        
        const button = screen.getByText(/Conectar/i);
        fireEvent.click(button);

    });

});





