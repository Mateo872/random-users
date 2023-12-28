import { Welcome } from "../types/types";

export const usefetchUsers = async (page: number) => {
  return await fetch(
    `https://randomuser.me/api?results=10&seed=mateo&page=${page}`
  ).then(async (res) => {
    if (!res.ok) throw new Error("Error en la petición");
    const result: Welcome = await res.json();
    return result.results;
  });
};
