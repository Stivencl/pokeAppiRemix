
import { useLoaderData } from "@remix-run/react";
import {json, LoaderFunctionArgs } from "@remix-run/node"
import invariant from "tiny-invariant";

export const loader = async (
    {params}:LoaderFunctionArgs) => {
      invariant(params.name, "Name is undefined")
    const pokename = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    
    return json(await pokename.json()); 
      
}

export default function Pokemon(){
    const pokemon = useLoaderData<typeof loader>();
    console.log(pokemon);
    return(
      <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Altura: {pokemon.height}</p>
            <p>Peso: {pokemon.weight}</p>
      </div>
             
    );
}