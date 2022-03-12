import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "../components/PokeCard";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [loadMore, setLoadMore] = useState(`https://pokeapi.co/api/v2/pokemon`);

  function createPokemonObject(results) {
    results.forEach((pokemon) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((res) => {
          const data = res.data;
          setPokemon((prev) => [...prev, data]);
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
    <>
      <h1>Pokedex</h1>
      <div className="pokedex">
        {pokemon.map((item) => (
          <PokeCard
            slug={item.name}
            key={item.id}
            id={item.id}
            img={item.sprites.other.dream_world.front_default}
            name={item.name}
            types={item.types}
          />
        ))}
      </div>
      <button className="pokedex--load-btn" onClick={getAllPokemons}>
        Load more Pokemon
      </button>
    </>
  );
}
