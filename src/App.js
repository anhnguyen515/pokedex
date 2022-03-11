import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(`https://pokeapi.co/api/v2/pokemon`);

  function createPokemonObject(results) {
    results.forEach((pokemon) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((res) => {
          const data = res.data;
          setPokemons((prev) => [...prev, data]);
        });
    });
  }

  function getAllPokemons() {
    axios
      .get(loadMore)
      .then((res) => {
        const data = res.data;
        setLoadMore(data.next);
        createPokemonObject(data.results);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <button onClick={getAllPokemons}>Fetch more Pokemons!!!</button>
    </div>
  );
}

export default App;
