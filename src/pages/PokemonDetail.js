import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  UppercaseFirstLetter,
  PokemonIdFormat,
  StatFormat,
} from "../common/utils";

export default function PokemonDetail() {
  const { slug } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);

  function getPokemonDetail() {
    const pokemonDetail = `https://pokeapi.co/api/v2/pokemon/${slug}`;
    const speciesDetail = `https://pokeapi.co/api/v2/pokemon-species/${slug}`;

    const getPokemonDetail = axios.get(pokemonDetail);
    const getSpeciesDetail = axios.get(speciesDetail);

    axios.all([getPokemonDetail, getSpeciesDetail]).then(
      axios.spread((...allData) => {
        const pokemonDetailData = allData[0].data;
        const speciesDetailData = allData[1].data;
        setPokemon(pokemonDetailData);
        setSpecies(speciesDetailData);
      })
    );
  }

  useEffect(() => {
    getPokemonDetail();
  }, []);
  return (
    <>
      {pokemon && (
        <Container style={{ margin: "30px 0", backgroundColor: "white" }}>
          <Row>
            <Col xs={12}>
              <div className="detail--pokemon-name-container">
                <h2>{UppercaseFirstLetter(pokemon.name)}</h2>
                <p className="detail--pokemon-id">
                  #{PokemonIdFormat(pokemon.id)}
                </p>
              </div>
            </Col>
            <Col xs={12} md={4} style={{ border: "1px solid red" }}>
              <img
                className="detail--pokemon-image"
                src={pokemon.sprites.other.dream_world.front_default}
                alt="pokemon thumbnail"
              />
            </Col>
            <Col>
              <p className="detail--pokemon-description">
                {species?.flavor_text_entries[0].flavor_text}
              </p>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="detail--pokemon-stat">
                  <span>{StatFormat(stat.stat.name)}</span>
                  <ProgressBar
                    now={stat.base_stat}
                    max={200}
                    label={stat.base_stat}
                    style={{ height: 40, flexBasis: "75%" }}
                  />
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
