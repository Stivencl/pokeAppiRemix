
import { Link, useLoaderData } from "@remix-run/react";
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
    
    return(
      <div className="grid h-screen place-items-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
           <img className="w-full" src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{pokemon.name}</div>
            <p className="text-gray-700 text-base">Pokemon: {pokemon.order}</p>
            <p className="text-gray-700 text-base">Altura: {pokemon.height}</p>
            <p className="text-gray-700 text-base">Peso: {pokemon.weight}</p>
   
            </div>

        </div>
             <div>
              <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" to={`/`}>Back</Link>

             </div>
            
      </div>
             
    );
}