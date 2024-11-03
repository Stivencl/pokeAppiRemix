import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react";

 
export const loader = async () => {
    const pokemonlist = await fetch("https://pokeapi.co/api/v2/pokemon/");
    return json(await pokemonlist.json());

}



export default function PokeList(){
const list = useLoaderData<typeof loader>()
 console.log(list)

 return(
    <div>
         <div className="text-sky-400 text-9xl font-bold flex justify-center">
               <h1 className="">Poke Api</h1>
             </div>
             
             <div className="grid grid-cols-5 gap-4 bg-gradient-to-r from-gray-500 to-gray-1000 fixed top-60 left-0 right-0" >
              {list.results.map((element: any) => (
                 <div className="" key={element.name}>
                    <Link className="no-underline hover:underline ... text-sky-400" to={`pokemon/${element.name}`}>{element.name}</Link>
                 </div>
                        
                 ))}
                   
     </div>
 
         
    </div>
 )
}
