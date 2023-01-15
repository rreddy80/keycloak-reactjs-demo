import { Switch } from "react-router-dom";
import UserList from "./UserList";
// import Menu from "./Menu";
// import NoMatch from "./NoMatch";
import UserForm from "./UserForm";
import RolesRoute from "./RolesRoute";

const UserContainer = () => (
  <>
    <Switch>
      <RolesRoute exact path="/users" roles={['admin']}>
        <UserList/>
      </RolesRoute>
      <RolesRoute exact path="/users/create" roles={['admin']}>
        <UserForm/>
      </RolesRoute>
    </Switch>
  </>
)

export default UserContainer
