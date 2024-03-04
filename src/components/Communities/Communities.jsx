import CommunitySimple from '../CommunitySimple/CommunitySimple.jsx'
import './Communities.css';

function Communities(communities) {
    function uniqueKey(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return (
        <>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-1 gap-4 lg:w-4/5 md:w-4/5 xs:w-full mx-auto">
                {/* <div className="flex-row xl:columns-4 lg:columns-3 md:columns-3 xs:colums-1 lg:w-4/5 md:w-4/5 xs:w-full mx-auto"> */}
                {communities.communities.map(community => ( // Utiliza () para devolver explícitamente
                    <CommunitySimple key={uniqueKey(1, 10000)} community={community} /> // Asegúrate de agregar un key único
                ))}
                {/* <CommunitySimple community={communities} /> */}
                {/* <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} /> */}
                {/* <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'532'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema '} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'732'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} />
                <CommunitySimple image={'https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg'} videogame={'Tarisland'} community={'Dilema donde se encuentra el cofre perdido'} comments={'481'} members={'32'} language={'English'} /> */}
            </div>
        </>
    )
}

export default Communities;