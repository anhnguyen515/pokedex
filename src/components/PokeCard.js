import React from "react";
import { Link } from "react-router-dom";
import {
  PokemonColor,
  PokemonIdFormat,
  UppercaseFirstLetter,
} from "../common/utils";

export default function PokeCard(props) {
  return (
    <Link
      to={`/${props.slug}`}
      className="pokemon--card"
      style={{
        backgroundColor: `${PokemonColor(props.types[0].type.name).slice(
          -1
        )}40`,
      }}
    >
      <p className="pokemon--id">{`#${PokemonIdFormat(props.id)}`}</p>
      <img className="pokemon--image" src={props.img} alt="pokemon avatar" />
      <p className="pokemon--name">{UppercaseFirstLetter(props.name)}</p>
      <div className="pokemon--types">
        {props.types.map((type, index) => (
          <p
            key={index}
            className="pokemon--type"
            style={{
              background: `${PokemonColor(type.type.name)[0]}`,
            }}
          >
            {UppercaseFirstLetter(type.type.name)}
          </p>
        ))}
      </div>
    </Link>
  );
}
