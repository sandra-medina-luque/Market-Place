import React, { useState, useEffect } from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Log from './Log.jsx';

describe("<Log/>",()=>{

    test("Renderizar el componente", ()=>{
        render(<Log/>);

        const labelUsuario= screen.getByLabelText(/Usuario:/i);
        const inputUsuario= screen.getByRole('textbox', {name:/Usuario:/i});
        const labelContraseña= screen.getByLabelText(/Contraseña:/i);
        const inputContraseña= screen.getByRole('textbox', {name:/Contraseña:/i});
        const button= screen.getByRole('button', {name:/Conectar/i});

        expect(labelUsuario).toBeInTheDocument();
        expect(inputUsuario).toBeInTheDocument();
        expect(labelContraseña).toBeInTheDocument();
        expect(inputContraseña).toBeInTheDocument();
        expect(button).toBeInTheDocument();

    });

    test("Funcionalidad del boton enviar", ()=>{
        const alertMock = jest.fn();
        window.alert = alertMock;

        render(<Log/>);

        const inputUsuario= screen.getByRole('textbox', {name:/Usuario:/i});
        const inputContraseña= screen.getByRole('textbox', {name:/Contraseña:/i});
        const button= screen.getByRole('button', {name:/Conectar/i});

        fireEvent.change(inputUsuario,{ target:{value: 'Gaby'}});
        fireEvent.change(inputContraseña,{ target:{value: 'barrioconecta'}});

        fireEvent.click(button);
        expect(alertMock).toHaveBeenCalledWith('Submitted Usuario: Gaby, Contraseña: ');

    });
    
});