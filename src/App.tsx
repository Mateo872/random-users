import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Result, SORT_BY, Welcome } from "./types/types.d";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState<Result[]>([]);
  const [showColors, setShowsColors] = useState(false);
  const [sorting, setSorting] = useState<SORT_BY>(SORT_BY.NONE);
  const originalUsers = useRef<Result[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100").then(async (res) => {
      const result: Welcome = await res.json();
      setUsers(result.results);
      originalUsers.current = result.results;
    });
  }, []);

  const toggleColors = () => {
    setShowsColors(!showColors);
  };

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .startsWith(filterCountry.toLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SORT_BY.NONE) return filteredUsers;
    if (sorting === SORT_BY.COUNTRY)
      return [...filteredUsers].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
    if (sorting === SORT_BY.NAME)
      return [...filteredUsers].sort((a, b) =>
        a.name.first.localeCompare(b.name.first)
      );
    if (sorting === SORT_BY.LAST)
      return [...filteredUsers].sort((a, b) =>
        a.name.last.localeCompare(b.name.last)
      );
  }, [filteredUsers, sorting]);

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SORT_BY.NONE ? SORT_BY.COUNTRY : SORT_BY.NONE;
    setSorting(newSortingValue);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleDeleteAll = () => {
    setUsers([]);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleChangeSort = (sort: SORT_BY) => {
    setSorting(sort);
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SORT_BY.COUNTRY
            ? "No ordenar por país"
            : "Ordenar por país"}
        </button>
        <button onClick={handleReset}>Resetear usuarios</button>
        {sortedUsers && sortedUsers.length > 0 && (
          <button onClick={handleDeleteAll}>Eliminar todos los usuarios</button>
        )}
        <input
          placeholder="Filtrá por país"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      {sortedUsers && sortedUsers?.length > 0 ? (
        <UserList
          users={sortedUsers}
          showColors={showColors}
          deleteUsers={handleDelete}
          changeSorting={handleChangeSort}
        />
      ) : (
        <p
          style={{
            marginTop: "2rem",
          }}
        >
          No hay usuarios disponibles
        </p>
      )}
    </>
  );
};

export default App;
