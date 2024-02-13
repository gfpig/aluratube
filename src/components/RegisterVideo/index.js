import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styled";

function getThumbnail (url) {
    debugger
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

function UseForm (propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values, 
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues ({
                ...values,
                [name]: value,
            });
        },

        clearForm () {
            setValues({});
        }
    };
}

const PROJECT_URL = "https://sgcvnmtilgypavhdoofv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnY3ZubXRpbGd5cGF2aGRvb2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDQxMTUsImV4cCI6MTk4Mzc4MDExNX0.Fi-Ns4kVG7-EiPiQwZyixk3oeNI4jycqRmLQ5LFPanA"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

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
                        debugger
                        supabase.from("videos").insert({
                            Title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "Luxiem",
                        })
                        .then ((oqueveio) => {
                            console.log(oqueveio);
                        })
                        setFormVisivel(false);
                        //formCadastro.clearForm();
                        

                    }}>
                        <div>
                            <button type = "button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input placeholder="Título do vídeo" name="titulo" value={ formCadastro.values.titulo } onChange={ formCadastro.handleChange } />
                                <input placeholder="URL" name="url" value={ formCadastro.values.url } onChange={ formCadastro.handleChange } />
                            <button type="submit"> Cadastrar </button>
                        </div>
                    </form>
                )
            : null}
            
        </StyledRegisterVideo>
    )
}