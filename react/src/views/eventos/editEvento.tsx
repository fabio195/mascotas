import React from "react";
import { deleteEvento, loadEvento, updateEvento } from "../../api/eventosApi";
import "../../styles.css";
import CommonComponent, { ICommonProps } from "../../tools/CommonComponent";
import ErrorLabel from "../../tools/ErrorLabel";

interface IState {
    titulo: string;
    descripcion: string;
    fechaEvento: string;
    lugarEvento: string;
    id: string;
}

export default class EditarEvento extends CommonComponent<ICommonProps, IState> {
    constructor(props: ICommonProps) {
        super(props);

        this.state = {
            descripcion: "",
            fechaEvento: "",
            id: "",
            lugarEvento: "",
            titulo: "",
        };
    }

    public async componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            try {
                const result = await loadEvento(id);
                this.setState(result);
            } catch (error) {
                this.processRestValidations(error);
            }
        }
    }

    public deleteClick = async () => {
        if (this.state.id) {
            try {
                await deleteEvento(this.state.id);
                this.props.history.push("/verEventos");
            } catch (error) {
                this.processRestValidations(error);
            }
        }
    }

    public saveClick = async () => {
        this.cleanRestValidations();
        if (!this.state.titulo) {
            this.addError("titulo", "No puede estar vacío");
        }

        if (this.hasErrors()) {
            this.forceUpdate();
            return;
        }

        try {
            if (this.state.id) {
                await updateEvento(this.state);
            }
            this.props.history.push("/verEventos");
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public render() {
        return (
            <div className="global_content">
                <h2 className="global_title">Editar Evento</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Titulo</label>
                        <input id="titulo" type="text"
                            value={this.state.titulo}
                            onChange={this.updateState}
                            className={this.getErrorClass("titulo", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("titulo")} />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <input id="descripcion" type="text"
                            value={this.state.descripcion}
                            onChange={this.updateState}
                            className={this.getErrorClass("descripcion", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("descripcion")} />
                    </div>

                    <div className="form-group">
                        <label>Fecha del Evento</label>
                        <input id="fechaEvento" type="text"
                            value={this.state.fechaEvento}
                            onChange={this.updateState}
                            className={this.getErrorClass("fechaEvento", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("fechaEvento")} />
                    </div>

                    <div className="form-group">
                        <label>Lugar del Evento</label>
                        <input id="lugarEvento" type="text"
                            value={this.state.lugarEvento}
                            onChange={this.updateState}
                            className={this.getErrorClass("lugarEvento", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("lugarEvento")} />
                    </div>

                    <div hidden={!this.errorMessage}
                        className="alert alert-danger"
                        role="alert">
                        {this.errorMessage}
                    </div>

                    <div className="btn-group ">
                        <button className="btn btn-primary" onClick={this.saveClick}>Guardar</button>

                        <button hidden={!this.state.id}
                            className="btn btn-warning"
                            onClick={this.deleteClick}>Eliminar</button>

                        <button className="btn btn-light" onClick={this.goBack} >Cancelar</button >
                    </div >
                </form >
            </div>
        );
    }
}
