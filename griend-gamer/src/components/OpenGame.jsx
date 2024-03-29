import React, { useEffect, useState } from 'react'
import { getGame } from '../services/apiService';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Image from './sub-components/Image';
import Skeleton from '@mui/material/Skeleton';
import { LazyLoadImage } from "react-lazy-load-image-component";





export default function OpenGame() {

    const [game, setGame] = useState(null)
    const game_id = useParams().game_id
    useEffect(() => {
        fetchGame(game_id)
    }, [])

    const fetchGame = async () => {
        try {
            const game = await getGame(game_id)
            setGame(game)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <Header />
            {game ? (
                <>
                    <LazyLoadImage src={game.image} alt={game.name} className='w-full h-80 object-cover object-top' />
                    <div className="open-card">
                        <div className="container px-2">
                            <p className='text-3xl font-extrabold'>{game.name}</p>
                            {game.name !== game.full_name && (
                                <p className='mb-2'>{game.full_name}</p>
                            )}
                            <p className='font-semibold'>{game.publisher}</p>
                            <div className="badge my-4">
                                {game.category}
                            </div>

                        </div>
                    </div>

                    <div className="container px-2">
                        <p>{game.description}</p>

                        <p className='font-bold my-5 text-2xl'>Reviews</p>
                        
                        <div className="comment mb-6">
                            <div className="comment-header flex gap-3">
                                <img src={game.image} alt="" className='w-14 h-14 object-cover rounded-full border border-primary' />
                                <div className="comment-text">
                                    <p className='font-semibold mb-1'>Kagiso Monageng</p>
                                    <p className=''>thus is not a nice came shem</p>
                                </div>
                            </div>
                        </div>
                        <div className="comment mb-6">
                            <div className="comment-header flex gap-3">
                                <img src={game.image} alt="" className='w-14 h-14 object-cover rounded-full border border-primary' />
                                <div className="comment-text">
                                    <p className='font-semibold mb-1'>Kagiso Monageng</p>
                                    <p className=''>thus is not a nice came shem</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}


        </>
    )
}
