import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UppercaseFirstLetter, PokemonIdFormat } from "../common/utils";

export default function PokemonDetail() {
  const { slug } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${slug}`).then((res) => {
      const data = res.data;
      setPokemonDetail(data);
    });
  }, []);
  return (
    <>
      {pokemonDetail && (
        <div>
          <h2 className="detail--pokemon-name">
            {UppercaseFirstLetter(pokemonDetail.name)}
          </h2>
          <p className="detail--pokemon-id">
            #{PokemonIdFormat(pokemonDetail.id)}
          </p>
          <img
            className="detail--pokemon-image"
            src={pokemonDetail.sprites.other.dream_world.front_default}
            alt="pokemon thumbnail"
          />
        </div>
      )}
    </>
  );
}
