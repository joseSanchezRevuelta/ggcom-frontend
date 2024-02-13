import Title from '../../components/Title/Title.jsx'
import Filter from '../../components/Filter/Filter.jsx'
import Communities from '../../components/Communities/Communities.jsx'

function Explore() {
    return (
        <>
            {/* <div className='bg-neutral-950 bg-cover bg-no-repeat bg-center bg-fixed bg-[url("../../public/img/wallpaper.jpg")]'> */}
            <div className='bg-neutral-950'>
                <Title title={'Explore Communities'} subtitle='Explore the videogame communities' />
                <Filter />
                <Communities />
            </div>
        </>
    );
}

export default Explore;