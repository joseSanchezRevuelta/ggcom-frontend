import Title from '../../components/Title/Title.jsx'
import Filter from '../../components/Filter/Filter.jsx'
import Communities from '../../components/Communities/Communities.jsx'

function MyCommunities() {
    return (
        <>
            <div className='bg-neutral-950'>
                <Title title={'My Communities'} subtitle='Explore your videogame communities' />
                <Filter />
                <Communities />
            </div>
        </>
    );
}

export default MyCommunities;