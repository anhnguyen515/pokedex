import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "../components/PokeCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import Loading from "../components/Loading";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [loadMore, setLoadMore] = useState(`https://pokeapi.co/api/v2/pokemon`);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);
        setLoadMore(data.next);
        createPokemonObject(data.results);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
      <h1>Pokedex</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <Container className="pokedex">
          <Row xs={1} sm={2} md={3} lg={4}>
            {pokemon.map((item) => (
              <Col key={item.id} style={{ margin: 0, padding: 0 }}>
                <PokeCard
                  slug={item.name}
                  id={item.id}
                  img={item.sprites.front_default}
                  name={item.name}
                  types={item.types}
                />
              </Col>
            ))}
          </Row>
          <Button className="pokedex--load-btn" onClick={getAllPokemons}>
            Load more Pokemon
          </Button>
        </Container>
      )}
    </>
  );
}
