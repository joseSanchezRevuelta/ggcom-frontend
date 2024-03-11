/* eslint-disable react/prop-types */


function TitleHome({ title, subtitle, subtitle2 }) {
    return (
        <>
            <div className='text-center lg:w-4/5 mx-auto'>
                <img
                    className="h-8 w-auto hover:border border-transparent mx-auto"
                    src="/img/logo_sf.png"
                    alt="Your Company"
                />
                <span className="mantinia pt-7 text-3xl font-mantinia text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-main">{title}</span></span>
                <p className="mantinia text-lg font-mantinia text-main lg:text-xl dark:text-main">{subtitle}</p>
                <p className="mantinia text-lg font-mantinia text-main lg:text-xl dark:text-main">{subtitle2}</p>
            </div>
        </>
    );
}

export default TitleHome;