import api from "../services/api";
import { AxiosResponse } from "axios";

export type EpisodeResponse = {
  id: number;
  name: string;
  episode: string;
}

export default async function getEpisode(episodeNumbers: string[], page: number) {
  const episodes = [] as EpisodeResponse[];

  for(const episode of episodeNumbers.splice(page === 1 ? 0 : page*10, page*10+5)) {
    try {
      const response = await api<EpisodeResponse>({
        url: '/episode/' + episode,
        method: 'GET'
      });

      episodes.push((response as AxiosResponse<EpisodeResponse>).data);
    } catch(err: unknown) {
      console.error(err);
    }
  }

  return episodes;
}