import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/sessionStore";
import "./Menu.css";

interface IProps {
  logout: () => Promise<void>;
}

class StateMainMenu extends React.Component<IProps, any> {
  public logout = async () => {
    await this.props.logout();
  }

  public render() {
    return (
      <div>
        <NavLink to="/info" className="menu_item btn btn-sm btn-link">Sesión</NavLink><br />
        <NavLink to="/password" className="menu_item btn btn-sm btn-link">Password</NavLink><br />
        <NavLink to="" onClick={this.logout} className="menu_item btn btn-sm btn-link">Logout</NavLink><br />

        <h6 className="menu_section">Perfil</h6>
        <NavLink to="/profile" className="menu_item btn btn-sm btn-link">Editar</NavLink><br />

        <h6 className="menu_section">Mascotas</h6>
        <NavLink to="/pets" className="menu_item btn btn-sm btn-link">Lista</NavLink><br />
      </div>
    );
  }
}

const MainMenu = connect(
  null,
  () => {
    return {
      logout: () => logout(),
    };
  })(StateMainMenu);

export default MainMenu;
