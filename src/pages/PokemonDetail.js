import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  UppercaseFirstLetter,
  PokemonIdFormat,
  StatFormat,
  PokemonColor,
} from "../common/utils";

export default function PokemonDetail() {
  const { slug } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function getPokemonDetail() {
    const pokemonDetail = `https://pokeapi.co/api/v2/pokemon/${slug}`;
    const speciesDetail = `https://pokeapi.co/api/v2/pokemon-species/${slug}`;

    const getPokemonDetail = axios.get(pokemonDetail);
    const getSpeciesDetail = axios.get(speciesDetail);

    axios.all([getPokemonDetail, getSpeciesDetail]).then(
      axios.spread((...allData) => {
        const pokemonDetailData = allData[0].data;
        const speciesDetailData = allData[1].data;
        setIsLoading(true);
        setPokemon(pokemonDetailData);
        setSpecies(speciesDetailData);
        setIsLoading(false);
      })
    );
  }

  useEffect(() => {
    getPokemonDetail();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container
          className="detail--container"
          style={{
            backgroundColor: `${PokemonColor(pokemon.types[0].type.name).slice(
              -1
            )}40`,
            borderColor: `${PokemonColor(pokemon.types[0].type.name).slice(
              -1
            )}`,
          }}
        >
          <Row>
            <Col xs={12}>
              <div className="detail--pokemon-name-container">
                <h2>{UppercaseFirstLetter(pokemon.name)}</h2>
                <span className="detail--pokemon-id">
                  #{PokemonIdFormat(pokemon.id)}
                </span>
              </div>
            </Col>
            <Col xs={12} md={4} className="detail--pokemon-info">
              <img
                className="detail--pokemon-image"
                src={pokemon.sprites.front_default}
                alt="pokemon thumbnail"
              />
            </Col>
            <Col>
              <p className="detail--pokemon-description">
                {species.flavor_text_entries[0].flavor_text}
              </p>
              <h3>Stats</h3>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="detail--pokemon-stat">
                  <span className="detail--stat-name">
                    {StatFormat(stat.stat.name)}
                  </span>
                  <ProgressBar
                    variant="danger"
                    className="detail--stat-bar"
                    now={stat.base_stat}
                    max={200}
                    label={stat.base_stat}
                  />
                </div>
              ))}
              <h3>Abilities</h3>
              {pokemon.abilities
                .map((ability) => UppercaseFirstLetter(ability.ability.name))
                .join(", ")}
              <h3>Types</h3>
              <div className="detail--pokemon-types">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="card--pokemon-type"
                    style={{
                      background: `${PokemonColor(type.type.name)[0]}`,
                    }}
                  >
                    {UppercaseFirstLetter(type.type.name)}
                  </span>
                ))}
              </div>
            </Col>
            <h4 className="link">
              <Link to="/">Home</Link>
            </h4>
          </Row>
        </Container>
      )}
    </>
  );
}
