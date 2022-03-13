import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  PokemonColor,
  PokemonIdFormat,
  UppercaseFirstLetter,
} from "../common/utils";

export default function PokeCard(props) {
  return (
    <Link to={`/${props.slug}`} className="card--link">
      <Card
        style={{
          backgroundColor: `${PokemonColor(props.types[0].type.name).slice(
            -1
          )}80`,
        }}
      >
        <p className="card--pokemon-id">{`#${PokemonIdFormat(props.id)}`}</p>
        <Card.Img src={props.img} />
        <Card.Body>
          <Card.Title>
            <h2>{UppercaseFirstLetter(props.name)}</h2>
          </Card.Title>
          <Card.Text className="card--pokemon-types">
            {props.types.map((type, index) => (
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
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
