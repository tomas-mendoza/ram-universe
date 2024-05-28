import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import getCharacter, { CharactersResponse } from "../../data/getCharacter";
import getEpisode, { EpisodeResponse } from "../../data/getEpisode";
import Pagination from "../../components/Pagination";

export default function CharacterInfo() {
  const params = useParams();
  const [character, setCharacter] = useState<CharactersResponse>();
  const [totalPages, setTotalPages] = useState(0);
  const [episodes, setEpisodes] = useState<EpisodeResponse[]>([]);
  const [episodeNumbers, setEpisodeNumbers] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const updatePage = (quantity: number, operator: string) => {
    if(operator === '+') {
      totalPages > page && setPage(page + quantity);
    }
    
    if(operator === '-') {
      page > 1 && setPage(page - quantity)
    }
  }

  const fetchEpisodes = async () => {
    try {
      setEpisodes([]);
      const episodesResponse = await getEpisode(episodeNumbers, page);

      if(episodesResponse) {
        setEpisodes(episodesResponse.data);
      }
    } catch(err: unknown) {
      console.error(err);
    }
  }


  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        if(params.id) {
          const response = await getCharacter(parseInt(params.id));

          setCharacter(response.data);

          const episodes: string[] = [];

          for(const episode of response.data.episode) {
            episodes.push(episode.split('/')[episode.split('/').length - 1]);
          }

          setEpisodeNumbers(episodes);

          setTotalPages(Math.floor(episodes.length/15-1));
        }
      } catch(err: unknown) {
        console.error(err);
      }
    }

    fetchCharacter();
  }, [params.id]);

  useEffect(() => {
    fetchEpisodes();
  }, [page, episodeNumbers])

  return (
    <>
      <Header />
      <main className="w-screen h-auto bg-orange-200 flex justify-center">
        <div className="w-2/3 p-3 bg-white rounded flex flex-col">
         <div className="bg-white rounded flex">
         {
            character && (
              <div key={character.id}>
                <div className="w-[250px] p-2">
                  <img src={character.image} alt="Character image" className="rounded" />
                </div>
                <div className="w-full">
                  <h1 className="text-2xl font-bold">{character.name} <span className="text-lg text-gray-800 font-normal">{character.origin.name}</span></h1>
                  <p className="text-gray-800">{character.location.name}</p>
                  <p>{character.gender}</p>
                </div>
              </div>
            )
          }
         </div>
         <div>
            <h3 className="font-bold text-lg">Episodes</h3>
            <div className="flex flex-col">
              {episodes.length > 0 && episodes.map((ep) => (
                <Link to={'/episode/' + ep.id} key={ep.id}>{ep.name} - {ep.episode}</Link>
              ))}
            </div>
         </div>
        </div>
      </main>
      <Pagination
        page={page}
        updatePage={updatePage}
      />
    </>
  )
}
