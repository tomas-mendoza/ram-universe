import Card from "../../components/Card";
import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import getCharacters, { CharactersResponse } from "../../data/getCharacters";

export default function Home() {
  const [characters, setCharacter] = useState([] as CharactersResponse[]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await getCharacters();
  
        setCharacter(response.data.results);
      } catch(err: unknown) {
        console.error(err);
      }
    }

    fetchCharacters();
  }, []);

  return (
    <>
      <Header />
      <main className="w-screen h-auto bg-orange-200 flex flex-wrap gap-5 justify-center p-5">
        { characters.length > 0 && characters.map((character) => (
          <Card 
            name={character.name} 
            gender={character.gender} 
            species={character.gender} 
            origin={character.origin}
            image={character.image}
            id={character.id}
            key={character.id}
          />
        ))}
      </main>
    </>
  )
}