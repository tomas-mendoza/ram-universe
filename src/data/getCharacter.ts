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
  status: string;
  location: {
    name: string;
    url: string;
  }
  episode: string[];
}

export default async function getCharacter(id: number) {
  const response = await api<CharactersResponse>({
    method: 'GET',
    url: `/character/${id}`
  });

  return response as AxiosResponse<CharactersResponse>;
}