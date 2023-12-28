import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Result, SORT_BY } from "./types/types.d";
import UserList from "./components/UserList";
import { usefetchUsers } from "./hooks/useFetch";

const App = () => {
  const [users, setUsers] = useState<Result[]>([]);
  const [showColors, setShowsColors] = useState(false);
  const [sorting, setSorting] = useState<SORT_BY>(SORT_BY.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const originalUsers = useRef<Result[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    usefetchUsers(currentPage)
      .then((users) => {
        setUsers((prevUsers) => {
          const newUsers = prevUsers.concat(users);
          originalUsers.current = newUsers;
          return newUsers;
        });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

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
      <main>
        {users.length > 0 && (
          <UserList
            users={sortedUsers}
            showColors={showColors}
            deleteUsers={handleDelete}
            changeSorting={handleChangeSort}
          />
        )}

        {loading && <p>Cargando...</p>}

        {error && <p>Ha ocurrido un error</p>}

        {!error &&
          !loading &&
          (sortedUsers?.length === 0 || users.length === 0) && (
            <p
              style={{
                marginTop: "2rem",
              }}
            >
              No hay usuarios disponibles
            </p>
          )}

        {!loading &&
          !error &&
          users.length > 0 &&
          sortedUsers &&
          sortedUsers?.length > 0 && (
            <button
              style={{
                marginTop: "2rem",
              }}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
              </svg>
            </button>
          )}
      </main>
    </>
  );
};

export default App;
