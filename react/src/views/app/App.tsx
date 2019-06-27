import React from "react";
import { HashRouter, Route } from "react-router-dom";
import LoggedInRoute from "../../tools/LoggedInRoute";
import EditarEvento from "../eventos/editEvento";
import Eventos from "../eventos/Eventos";
import NuevoEvento from "../eventos/nuevoEvento";
import VerEvento from "../eventos/verEvento";
import Info from "../info/Info";
import NewPet from "../pets/NewPet";
import Pets from "../pets/Pets";
import Profile from "../profile/Profile";
import Login from "../users/Login";
import Password from "../users/Password";
import Register from "../users/Register";
import Welcome from "../welcome/Welcome";
import "./App.css";
import Menu from "./Menu";
import Toolbar from "./Toolbar";

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <HashRouter>
        <table className="app_table">
          <thead>
            <tr className="app_toolbar">
              <td colSpan={2} >
                <Toolbar />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="app_menu">
                <Menu />
              </td>
              <td id="content" className="app_content">
                <Route exact path="/" component={Welcome} />
                <Route exact path="/login" component={Login} />
                <Route path="/newUser" component={Register} />
                <Route path="/verEventos" component={Eventos} />
                <LoggedInRoute path="/info" component={Info} />
                <LoggedInRoute path="/password" component={Password} />
                <LoggedInRoute path="/profile" component={Profile} />
                <LoggedInRoute path="/pets" component={Pets} />
                <LoggedInRoute path="/editPet" component={NewPet} />
                <LoggedInRoute path="/editPet/:id" component={NewPet} />
                <LoggedInRoute path="/nuevoEvento" component={NuevoEvento} />
                <LoggedInRoute path="/verEvento/:id" component={VerEvento} />
                <LoggedInRoute path="/editarEvento/:id" component={EditarEvento} />
              </td>
            </tr>
          </tbody>
        </table>
      </HashRouter >
    );
  }
}
