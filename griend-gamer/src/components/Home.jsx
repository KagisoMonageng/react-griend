import React, { useEffect, useState } from 'react'
import { getGames } from '../services/apiService';
import Image from './sub-components/Image';



export default function Home() {

    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const games = await getGames();
                setGames(games);
            } catch (error) {
                console.error(error)
            }
        }

        fetchGames();
    }, [])




    return (
        <div className='container px-2 mx-auto'>
            <h2 className="main-h2">Games</h2>

            <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2 content-center">

                {games && (
                    <>
                        {games.map((game, index) => (

                            <div key={game.game_id} className="card w-full md:w-96 ">
                                  <Image game={game} />

                                <div className="card-body ">
                                    <h2 className="card-title">{game.name}</h2>
                                    <p>{game.publisher}<br />{game.category}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">View Location</button>
                                    </div>
                                </div>
                            </div>

                        )
                        )}
                    </>
                )}

            </div>



        </div>
    )
}
