import { Result, SORT_BY } from "../types/types.d";

interface Prop {
  users: Result[] | undefined;
  showColors: boolean;
  deleteUsers: (index: string) => void;
  changeSorting: (sort: SORT_BY) => void;
}

const UserList = ({ users, showColors, deleteUsers, changeSorting }: Prop) => {
  return (
    <table width={"100%"}>
      <thead>
        <tr>
          <th>Foto</th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => changeSorting(SORT_BY.NAME)}
          >
            Nombre
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => changeSorting(SORT_BY.LAST)}
          >
            Apellido
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => changeSorting(SORT_BY.COUNTRY)}
          >
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555";
          const color = showColors ? backgroundColor : "transparent";

          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt={`Image ${user.name}`} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUsers(user.email)}>Borrar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;
