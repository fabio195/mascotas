import React from "react";
import { getPictureUrl, IEvento, loadEvento, updateEventoPicture } from "../../api/eventosApi";
import "../../styles.css";
import CommonComponent, { ICommonProps } from "../../tools/CommonComponent";
import ImageUpload from "../../tools/ImageUpload";
import "./Eventos.css";

interface IState {
    evento: IEvento;
}

export default class VerEvento extends CommonComponent<ICommonProps, IState> {
    constructor(props: ICommonProps) {
        super(props);

        this.state = {
            evento : {
                descripcion: "",
                fechaEvento: "",
                id: "",
                lugarEvento: "",
                picture: "",
                titulo: "",
            },
        };
    }

    public async componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            try {
                const result = await loadEvento(id);
                this.setState({evento : result});
            } catch (error) {
                this.processRestValidations(error);
            }
        }
    }

    public uploadPicture = async (image: string) => {
        try {
            const idEvento = this.state.evento.id;
            const result = await updateEventoPicture({
                image,
            }, idEvento);
            const newE = this.state.evento;
            newE.picture = result.id;
            this.setState({
                evento : newE,
            });
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public render() {
        return (
            <div className="container-fluid">
                <header>
                    <div className="jumbotron text-center">
                            <ImageUpload src={getPictureUrl(this.state.evento.picture)}
                                onChange={this.uploadPicture} />
                    </div>
                </header>
                <body>
                    <div className="container-fluid">
                        <div className="row">
                            {/* tslint:disable-next-line:max-line-length */}
                            <div className="col-8 breadcrumb bg-success padding">Titulo: {this.state.evento.titulo}</div>
                            {/* tslint:disable-next-line:max-line-length */}
                            <div className="col-3 breadcrumb bg-warning padding">Fecha: {this.state.evento.fechaEvento}</div>
                        </div>
                    </div>
                    <div className="jumbotron bg-info">
                    <div className="card text-white bg-primary cardPadding">
                        <div className="card-header">Descripcion</div>
                        <div className="card-body">
                            <h4 className="card-title"></h4>
                            <p className="card-text">{this.state.evento.descripcion}</p>
                        </div>
                        </div>
                    </div>
                    <div className="breadcrumb bg-secondary">Lugar del Evento: {this.state.evento.lugarEvento}</div>
                </body>
            </div>
        );
    }
}
