import { useEffect } from 'react';
import NotFound from '../../components/NotFound/NotFound.jsx'

function NotFoundPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen'>
                <NotFound />
            </div>
        </>
    );
}

export default NotFoundPage;