import "bootstrap";
import React from "react";
import { IEvento, loadEventos } from "../../api/eventosApi";
import "../../styles.css";
import CommonComponent, { ICommonProps } from "../../tools/CommonComponent";

interface IState {
    eventos: IEvento[];
}

export default class Eventos extends CommonComponent<ICommonProps, IState> {
    constructor(props: ICommonProps) {
        super(props);

        this.state = {
            eventos: [],
        };

        this.loadEventos();
    }

    public loadEventos = async () => {
        try {
            const result = await loadEventos();
            this.setState({
                eventos: result,
            });
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public editEventoClick = (id: string) => {
        this.props.history.push("/editarEvento/" + id);
    }

    public newEventoClick = () => {
        this.props.history.push("/nuevoEvento");
    }

    public verEventoClick = (id: string) => {
        this.props.history.push("/verEvento/" + id);
    }

    public render() {
        return (
            <div className="container">
                <h2 className="jumbotron text-center">Sus eventos</h2>
                <table id="eventos" className="table table-hover">
                    <thead>
                        <tr>
                            <th> Titulo </th>
                            <th> Descripción </th>
                            <th> Fecha del evento </th>
                            <th> Lugar del evento </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.eventos.map((evento, i) => {
                            return (
                                <tr key={i}>
                                    <td onClick={() => this.verEventoClick(evento.id)}>{evento.titulo}</td>
                                    <td onClick={() => this.verEventoClick(evento.id)}>{evento.descripcion}</td>
                                    <td onClick={() => this.verEventoClick(evento.id)}>{evento.fechaEvento}</td>
                                    <td onClick={() => this.verEventoClick(evento.id)}>{evento.lugarEvento}</td>
                                    <td className="text">
                                        <img
                                            src="/assets/edit.png"
                                            alt=""
                                            onClick={() => this.editEventoClick(evento.id)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="btn-group ">
                    <button className="btn btn-success" onClick={this.newEventoClick} >Nuevo Evento</button >
                    <button className="btn btn-light" onClick={this.goHome} >Cancelar</button >
                </div >
            </div>
        );
    }

}
