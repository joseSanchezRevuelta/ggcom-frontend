/* eslint-disable react/prop-types */
import './Title.css';

function Title({ title, subtitle, subtitle2 }) {
    return (
        <>
            <div className='text-center lg:w-4/5 mx-auto pb-6 pt-20'>
                <h1 className="pt-7 mb-7 text-3xl font-lato text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-white">{title}</span></h1>
                <p className="text-lg font-lato text-main lg:text-xl dark:text-main">{subtitle}</p>
                <p className="text-lg font-lato text-main lg:text-xl dark:text-main">{subtitle2}</p>
            </div>
        </>
    );
}

export default Title;