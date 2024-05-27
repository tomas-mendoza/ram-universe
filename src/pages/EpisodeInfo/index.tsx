import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { EpisodeResponse, getSingleEpisode } from "../../data/getEpisode";

export default function EpisodeInfo() {
  const params = useParams();
  const [episode, setEpisode] = useState<EpisodeResponse>();

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        if(params.id) {
          const response = await getSingleEpisode(params.id);

          response && setEpisode(response.data);
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
         <div className="bg-white rounded flex">
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
         </div>
        </div>
      </main>
    </>
  )
}
