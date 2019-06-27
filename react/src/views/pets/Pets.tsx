import React from "react";
import { IPet, loadPets } from "../../api/petsApi";
import "../../styles.css";
import CommonComponent, { ICommonProps } from "../../tools/CommonComponent";

interface IState {
    pets: IPet[];
}

export default class Pets extends CommonComponent<ICommonProps, IState> {
    constructor(props: ICommonProps) {
        super(props);

        this.state = {
            pets: [],
        };

        this.loadPets();
    }

    public loadPets = async () => {
        try {
            const result = await loadPets();
            this.setState({
                pets: result,
            });
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public editPetClick = (petId: string) => {
        this.props.history.push("/editPet/" + petId);
    }

    public newPetClick = () => {
        this.props.history.push("/editPet");
    }

    public render() {
        return (
            <div className="global_content">
                <h2 className="global_title">Mascotas</h2>
                <table id="mascotas" className="table">
                    <head>
                        <tr>
                            <th> Nombre </th>
                            <th> Descripción </th>
                            <th> </th>
                        </tr>
                    </head>
                    <tbody>
                        {this.state.pets.map((pet, i) => {
                            return (
                                <tr key={i}>
                                    <td>{pet.name}</td>
                                    <td>{pet.description}</td>
                                    <td className="text">
                                        <img
                                            src="/assets/edit.png"
                                            alt=""
                                            onClick={() => this.editPetClick(pet.id)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="btn-group ">
                    <button className="btn btn-success" onClick={this.newPetClick} >Nueva Mascota</button >
                    <button className="btn btn-light" onClick={this.goHome} >Cancelar</button >
                </div >
            </div>
        );
    }
}
