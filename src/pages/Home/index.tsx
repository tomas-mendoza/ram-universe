import Card from "../../components/Card";
import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import getCharacters, { CharactersResponse } from "../../data/getCharacters";
import Pagination from "../../components/Pagination";

export default function Home() {
  const [characters, setCharacter] = useState([] as CharactersResponse[]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const updatePage = (quantity: number, operator: string) => {
    if(operator === '+' && hasNextPage) {
      setPage(page + quantity);
    }
    
    if(operator === '-' && page > 1) {
      setPage(page - quantity)
    }
  }

  const fetchCharacters = async () => {
    try {
      setCharacter([]);
      const response = await getCharacters(page);

      setCharacter(response.data.results);
      setHasNextPage(response.data.info.next !== null);
    } catch(err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchCharacters();
  }, [page]);

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
      <Pagination 
        page={page}
        updatePage={updatePage}
      />
    </>
  )
}