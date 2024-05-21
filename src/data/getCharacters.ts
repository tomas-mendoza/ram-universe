import { AxiosResponse } from "axios";
import api from "../services/api";

export type CharactersResponse = {
  id: number;
  name: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  image: string;
}

type Response = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  }
  results: CharactersResponse[];
}

export default async function getCharacters() {
  const response = await api<Response>({
    method: 'GET',
    url: '/character'
  });

  return response as AxiosResponse<Response>;
}