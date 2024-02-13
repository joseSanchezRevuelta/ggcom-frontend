/* eslint-disable react/prop-types */
import './Title.css';

function Title({ title, subtitle }) {
    return (
        <>
            <div className='text-center lg:w-4/5 mx-auto pb-6 pt-20'>
                <h1 className="pt-7 mb-7 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-main">{title}</span></h1>
                <p className="text-lg font-normal text-main lg:text-xl dark:text-main">{subtitle}</p>
            </div>
        </>
    );
}

export default Title;