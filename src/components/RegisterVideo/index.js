import React from "react";
import { StyledRegisterVideo } from "./styled";

function UseForm () {
    const [values, setValues] = React.useState({titulo: "", url: ""});

    return {
        values, 
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues ({
                ...value,
                [name]: value,
            });
        },

        clearForm () {
            setValues({});
        }
    };
}

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    const formCadastro = UseForm({
        initialValues: { titulo: "" , url: ""}
    });

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
                ? ( 
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type = "button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input
                                placeholder="Título do vídeo"
                                titulo = "titulo"
                                value = {formCadastro.values.titulo}
                                onChange={formCadastro.handleChange} 
                            />
                            <input
                                    placeholder="URL"
                                    name = "url"
                                    value = {formCadastro.values.url} 
                                    onChange={formCadastro.handleChange} 
                            />
                            <button type="submit"> Cadastrar </button>
                        </div>
                    </form>
                )
            : null}
            
        </StyledRegisterVideo>
    )
}