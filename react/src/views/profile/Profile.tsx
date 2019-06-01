import React from "react";
import { connect } from "react-redux";
// tslint:disable-next-line:max-line-length
import { getCurrentProfile, getPictureUrl, IProfile, IUpdateBasicProfile, IUpdateProfileImage, IUpdateProfileImageId, updateBasicInfo, updateProfilePicture } from "../../api/profileApi";
import { getProvinces, IProvince } from "../../api/provincesApi";
import "../../styles.css";
import CommonComponent, { ICommonProps } from "../../tools/CommonComponent";
import ErrorLabel from "../../tools/ErrorLabel";
import ImageUpload from "../../tools/ImageUpload";

interface IProps extends ICommonProps {
    updateBasicInfo(payload: IUpdateBasicProfile): Promise<IProfile>;
    getCurrentProfile(): Promise<IProfile>;
    getProvinces(): Promise<IProvince[]>;
    getPictureUrl(id: string): string;
    updateProfilePicture(payload: IUpdateProfileImage): Promise<IUpdateProfileImageId>;
}

interface IState {
    name: string;
    province: string;
    email: string;
    address: string;
    phone: string;
    picture: string;
    provinces: IProvince[];
}

class StateProfile extends CommonComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            address: "",
            email: "",
            name: "",
            phone: "",
            picture: "",
            province: "",
            provinces: [],
        };

        this.getProvinces();
        this.loadProfile();
    }

    public async getProvinces() {
        try {
            const result = await this.props.getProvinces();
            this.setState({
                provinces: result,
            });
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public async loadProfile() {
        try {
            const result = await this.props.getCurrentProfile();
            this.setState(result);
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public uploadPicture = async (image: string) => {
        try {
            const result = await this.props.updateProfilePicture({
                image,
            });
            this.setState({
                picture: result.id,
            });
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public updateClick = async () => {
        this.cleanRestValidations();
        if (!this.state.name) {
            this.addError("name", "No puede estar vacío");
        }
        if (!this.state.email) {
            this.addError("email", "No puede estar vacío");
        }
        if (this.hasErrors()) {
            this.forceUpdate();
            return;
        }

        try {
            await this.props.updateBasicInfo(
                {
                    address: this.state.address,
                    email: this.state.email,
                    name: this.state.name,
                    phone: this.state.phone,
                    province: this.state.province,
                },
            );
            this.props.history.push("/");
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public render() {
        return (
            <div className="global_content">
                <h2 className="global_title">Actualizar Perfil</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input id="name" type="text"
                            value={this.state.name}
                            onChange={this.updateState}
                            className={this.getErrorClass("name", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("name")} />
                    </div>

                    <div className="form-group">
                        <label>Profile Picture</label>
                        <ImageUpload src={getPictureUrl(this.state.picture)}
                            onChange={this.uploadPicture} />
                        <ErrorLabel error={this.getErrorText("name")} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input id="email" type="text"
                            value={this.state.email}
                            onChange={this.updateState}
                            className={this.getErrorClass("email", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("email")} />
                    </div>

                    <div className="form-group">
                        <label>Provincia</label>
                        <select
                            value={this.state.province}
                            onChange={(e) => this.setState({ province: e.target.value })}
                            className={this.getErrorClass("email", "form-control")}>
                            {this.state.provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <ErrorLabel error={this.getErrorText("province")} />
                    </div>

                    <div className="form-group">
                        <label>Dirección</label>
                        <input id="address" type="text"
                            value={this.state.address}
                            onChange={this.updateState}
                            className={this.getErrorClass("address", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("address")} />
                    </div>

                    <div className="form-group">
                        <label>Tel&eacute;fono</label>
                        <input id="phone" type="text"
                            value={this.state.phone}
                            onChange={this.updateState}
                            className={this.getErrorClass("phone", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("phone")} />
                    </div>

                    <div hidden={!this.errorMessage}
                        className="alert alert-danger"
                        role="alert">{this.errorMessage}
                    </div>

                    <div className="btn-group ">
                        <button className="btn btn-primary" onClick={this.updateClick}>Actualizar</button>
                        <button className="btn btn-light" onClick={this.goHome} >Cancelar</button >
                    </div >
                </form >
            </div>
        );
    }
}

const Profile = connect(
    null,
    (dispatch) => {
        return {
            getCurrentProfile: () => getCurrentProfile(),
            getPictureUrl: (id: string) => getPictureUrl(id),
            getProvinces: () => getProvinces(),
            updateBasicInfo: (payload: IUpdateBasicProfile) => updateBasicInfo(payload),
            updateProfilePicture: (payload: IUpdateProfileImage) => updateProfilePicture(payload),
        };
    },
)(StateProfile);

export default Profile;
