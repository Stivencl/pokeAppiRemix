import { ActionFunctionArgs, json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react";


export const loader = async ({ request }: ActionFunctionArgs) => {
    console.log(request);
   const url = new URL(request.url);
   const offset = Number(url.searchParams.get("offset") || 0);
   const limit = 20; // Número de Pokémon por página
 
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
   const pokemonList = await response.json();
 
   return json({ pokemonList, offset });
 };
 
 export default function PokeList() {
   const { pokemonList, offset } = useLoaderData<typeof loader>();
 
   return (
     <div>
       <div className="text-sky-400 text-9xl font-bold flex justify-center">
         <h1 className="">Poke Api</h1>
       </div>
       
       <div className="grid grid-cols-5 gap-4 bg-gradient-to-r from-gray-500 to-gray-1000 fixed top-60 left-0 right-0">
         {pokemonList.results.map((element: any) => (
           <div className="" key={element.name}>
             <Link className="no-underline hover:underline text-sky-400" to={`pokemon/${element.name}`}>
               {element.name}
             </Link>
           </div>
         ))}
         <footer>
         <p>Desarrollado por:<br></br> Stiven Castaño Loaiza</p>
       </footer>
       </div>
 
       {/* Paginación */}
       <div className="flex justify-center mt-4">
         {offset > 0 && (
           <Link
             to={`?offset=${offset - 20}`}
             className="mx-2 px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-600"
           >
             Anterior
           </Link>
         )}
         {pokemonList.next && (
           <Link
             to={`?offset=${offset + 20}`}
             className="mx-2 px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-600"
           >
             Siguiente
           </Link>
         )}
       </div>
       
     </div>
   );
 }

 