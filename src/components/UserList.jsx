import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import UserService from "../services/UserService";

const UserList = () => {
  const [users, updateUsers] = useState([]);

//   const fetchData = async () => {
//     const _users = await getUsers();
//     updateUsers(_users);
//   };

  const fetchData = () => axios.get('http://localhost:8888/admin/realms/mapps/users',
                            {
                                headers: {
                                    'Authorization': `Bearer ${UserService.getToken()}`
                                }
                            })
                            .then((response) => {
                                updateUsers(response.data);
                            })
                            .catch((error) => {
                                console.log(error);
                            });

  useEffect(() => {
    fetchData();
  }, []);

  const output = users?.length > 0 ? (
    <>
    <div className="row">
      <div className="col-sm-12">
        <h1>Users on Keycloak</h1>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
          </thead>
          <tbody>
          {users ? users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          )): null}
          </tbody>
        </table>
      </div>
    </div>
    </>
  ) : (
    <div className="row">
      <div className="col-sm-12">No users are currently set-up in Keycloak.
      </div>
    </div>
  );
   
  return <div>{output}</div>;
}

export default UserList
