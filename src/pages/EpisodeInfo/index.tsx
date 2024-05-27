import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { EpisodeResponse, getSingleEpisode } from "../../data/getEpisode";
import { CharactersResponse, getMultipleCharacters } from "../../data/getCharacters";

export default function EpisodeInfo() {
  const params = useParams();
  const [episode, setEpisode] = useState<EpisodeResponse>();
  const [characters, setCharacters] = useState<CharactersResponse[]>([]);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        if(params.id) {
          const response = await getSingleEpisode(params.id);

          if(response) {
            setEpisode(response.data);

            const charactersInEpisode = [];

            for(const character of response.data.characters) {
              charactersInEpisode.push(character.split('/')[character.split('/').length - 1])
            }

            const charactersResponse = await getMultipleCharacters(charactersInEpisode.join(','));

            if(charactersResponse) {
              setCharacters(charactersResponse.data);
            }
          }
        }
      } catch(err: unknown) {
        console.error(err);
      }
    }
    
    fetchEpisode();
  }, []);
  return (
    <>
      <Header />
      <main className="w-screen h-auto bg-orange-200 flex justify-center">
        <div className="w-2/3 p-3 bg-white rounded flex flex-col">
         <div className="bg-white rounded flex flex-col">
         {
            episode && (
              <div key={episode.id}>
                <div className="w-full">
                  <h1 className="text-2xl font-bold">{episode.name} <span className="text-lg text-gray-800 font-normal">{episode.episode}</span></h1>
                  <p className="text-gray-800">{episode.air_date}</p>
                </div>
              </div>
            )
          }
            <h1 className="text-xl font-bold">Characters</h1>
            <div className="flex flex-wrap gap-2">
              {
                characters && characters.map((char) => (
                  <div key={char.id}>
                    <div className="w-[120px]">
                      <img src={char.image} className="rounded" />
                    </div>
                    <p>{char.name}</p>
                  </div> 
                ))
              }
            </div>
         </div>
        </div>
      </main>
    </>
  )
}
