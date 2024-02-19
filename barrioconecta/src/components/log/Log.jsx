import React from "react";
import "./log.css"


function Log() {


    return (

        <>
            <body className="logcont">
                <section className="logform">
                    <div class="mb-3">
                        <label for="formGroupInput" className="form-label">Usuario:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div class="mb-4">
                        <label for="formGroupInput" className="form-label">Contraseña:</label>
                        <input type="password" class="form-control"/>
                    </div>

                    </section>
                    <button> Conectar</button>
            </body>

        </>


    )
}

export default Log;


