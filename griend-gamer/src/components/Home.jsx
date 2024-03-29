import React, { useEffect, useState } from 'react'
import { getGames } from '../services/apiService';
import Image from './sub-components/Image';
import Skeleton from '@mui/material/Skeleton';
import { Link, Router } from 'react-router-dom';



export default function Home() {

    const [games, setGames] = useState([])
    const [offset, setOffset] = useState(0);

    const fetchGames = async () => {
        try {
            const games = await getGames(offset);
            setGames(prevData => [...prevData, ...games]);
            setOffset(prevOffset => prevOffset + 5);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchGames();
    }, [])

    return (
        <div className='container px-2 mx-auto'>
            <h2 className="main-h2">Games</h2>

            <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2 content-center">

                {games.length > 0 ? (
                    <>
                        {games.map((game, index) => (

                            <div  key={game.game_id} className="card w-full md:w-96 ">
                                <Image game={game} />
                                <div className="card-body ">
                                    <h2 className="card-title">{game.name}</h2>
                                    <p>{game.publisher}<br />{game.category}</p>
                                    <div className="card-actions justify-end">
                                        <Link to={'/open-game/'+game.game_id} className="btn btn-primary">View Game</Link>
                                    </div>
                                </div>
                            </div>

                        )
                        )}
                    </>) : (
                    <>
                        <div className="card w-full md:w-96 ">
                            <figure>
                                <Skeleton variant='rectangular' width={300} height={300} animation="pulse" className='rounded-lg' />
                            </figure>
                            <div className="card-body ">
                                <Skeleton variant='rectangular' width={250} height={10} animation="pulse" className='rounded-lg' />
                                <Skeleton variant='rectangular' width={150} height={10} animation="pulse" className='rounded-lg' />
                                <div className="card-actions justify-end">
                                    <Skeleton variant='rectangular' width={100} height={50} animation="pulse" className='rounded-lg' />
                                </div>
                            </div>
                        </div>

                        <div className="card w-full md:w-96 ">
                            <figure>
                                <Skeleton variant='rectangular' width={300} height={300} animation="pulse" className='rounded-lg' />
                            </figure>
                            <div className="card-body ">
                                <Skeleton variant='rectangular' width={250} height={10} animation="pulse" className='rounded-lg' />
                                <Skeleton variant='rectangular' width={100} height={10} animation="pulse" className='rounded-lg' />
                            </div>
                        </div>

                        <div className="card w-full md:w-96 ">
                            <figure>
                                <Skeleton variant='rectangular' width={300} height={300} animation="pulse" className='rounded-lg' />
                            </figure>
                            <div className="card-body ">
                                <Skeleton variant='rectangular' width={250} height={10} animation="pulse" className='rounded-lg' />
                                <Skeleton variant='rectangular' width={100} height={10} animation="pulse" className='rounded-lg' />
                            </div>
                        </div>
                    </>

                )}

            </div>



        </div>
    )
}
