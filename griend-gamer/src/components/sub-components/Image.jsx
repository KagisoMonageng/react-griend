
import { LazyLoadImage } from "react-lazy-load-image-component";


export default function Image({ game }) {
    return (
        <figure><LazyLoadImage onLoad={()=>{

        }} src={game.image} alt={game.name} className='w-full h-80 object-cover object-top' />
        </figure>
    )
}
