import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import getCharacter, { CharactersResponse } from "../../data/getCharacter";

export default function CharacterInfo() {
  const params = useParams();
  const [character, setCharacter] = useState<CharactersResponse>();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        if(params.id) {
          const response = await getCharacter(parseInt(params.id));

          setCharacter(response.data);
        }
      } catch(err: unknown) {
        console.error(err);
      }
    }

    fetchCharacter();
  }, [])

  return (
    <>
      <Header />
      <main className="w-screen h-auto bg-orange-200 flex justify-center">
        <div className="w-2/3 p-3 bg-white rounded flex">
          {
            character && (
              <>
                <div className="w-[250px] p-2">
                  <img src={character.image} alt="Character image" className="rounded" />
                </div>
                <div className="w-full">
                  <h1 className="text-2xl font-bold">{character.name} <span className="text-lg text-gray-800 font-normal">{character.origin.name}</span></h1>
                  <p className="text-gray-800">{character.location.name}</p>
                  <p>{character.gender}</p>
                  <h2 className="text-1xl font-bold">Episodes</h2>
                  <div className="flex flex-wrap gap-2">
                    { character.episode.map((ep) => (
                      <p>Episode {ep.split('/')[ep.split('/').length - 1]}</p>
                    ))}
                  </div>
                </div>
              </>
            )
          }
        </div>
      </main>
    </>
  )
}