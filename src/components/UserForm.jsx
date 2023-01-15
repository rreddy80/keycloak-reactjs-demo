import { useState } from "react";

// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router";
import { createUser } from "../modules/users";

const UserForm = () => {

  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  const [alerts, setAlerts] = useState([]);

  // const dispatch = useDispatch();
  // const history = useHistory();

  let handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !firstname || !lastname || !role) {
      return;
    }
    createUser({ email, firstname, lastname, role })
      .then((response) => {
        setAlerts([...alerts, {type: 'success', message: 'User created in Keycloak successfully.'}]);
        // history.push("/");
      })
      .catch((error) => {
        setAlerts([...alerts, {type: 'danger', message: `${error}`}]);
        console.log(alerts);
      })
  };

  return (
    <div className="row">
      <div className="col-sm-6">
        {alerts.length > 0 ? ( // Conditionally render our errors
          alerts.map((alert, index) => (
            <h3 key={index} className={alert.type}>{alert.message}</h3>
          ))
        ): null}
        <form onSubmit={handleSubmit}>
          <h1>Add a new user:</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" placeholder="Email address"
                   value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" className="form-control" placeholder="Firstname"
                   value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input type="text" className="form-control" placeholder="Lastname"
                   value={lastname} onChange={(e) => setLastname(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input type="text" className="form-control" placeholder="Role"
                   value={role} onChange={(e) => setRole(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">Add User</button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
