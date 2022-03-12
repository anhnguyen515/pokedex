export function UppercaseFirstLetter(string) {
  return string[0].toUpperCase() + string.substring(1);
}

export function PokemonIdFormat(id) {
  return ("00" + id).slice(-3);
}

export function PokemonColor(type) {
  switch (type) {
    case "normal":
      return ["#A4ACAF"];

    case "fighting":
      return ["#D56723"];

    case "flying":
      return [`linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)`, `#3dc7ef`];

    case "poison":
      return ["#B97FC9"];

    case "ground":
      return [`linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)`, `#f7de3f`];

    case "rock":
      return ["#A38C21"];

    case "bug":
      return ["#729F3F"];

    case "ghost":
      return ["#7B62A3"];

    case "steel":
      return ["#9EB7B8"];

    case "fire":
      return ["#FD7D24"];

    case "water":
      return ["#4592C4"];

    case "grass":
      return ["#9BCC50"];

    case "electric":
      return ["#EED535"];

    case "psychic":
      return ["#F366B9"];

    case "ice":
      return ["#51C4E7"];

    case "dragon":
      return [`linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)`, `#53a4cf`];

    case "dark":
      return ["#707070"];

    case "fairy":
      return ["#FCB8E8"];

    case "unknown":
    case "shadow":
      return ["#000000"];

    default:
      break;
  }
}
