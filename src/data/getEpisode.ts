import api from "../services/api";
import { AxiosResponse } from "axios";

export type EpisodeResponse = {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
}

export default async function getEpisode(episodeNumbers: string[], page: number) {
    try {
      console.log(page);
      const response = await api<EpisodeResponse>({
        url: '/episode/' + episodeNumbers.splice((page-1)*10, 10).join(','),
        method: 'GET'
      });

      return response as AxiosResponse<EpisodeResponse[]>;
    } catch(err: unknown) {
      console.error(err);
    }
}

export async function getSingleEpisode(id: string) {
  try {
    const response = await api<EpisodeResponse>({
      url: '/episode/' + id,
      method: 'GET'
    });

    return response as AxiosResponse<EpisodeResponse>;
  } catch(err: unknown) {
    console.error(err);
  }
}
