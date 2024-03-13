/* eslint-disable react/prop-types */
function TitleHome({ title, subtitle, subtitle2 }) {
    return (
        <>
            <div className='text-center lg:w-4/5 mx-auto mt-28'>
                <img
                    className="h-16 w-auto hover:border border-transparent mx-auto mb-4"
                    src="/img/logo_sf.png"
                    alt="Your Company"
                />
                <span className="pt-7 text-5xl font-mantinia text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-main">{title}</span></span>
                <p className="mt-2 text-2xl font-mantinia text-main lg:text-xl dark:text-main">{subtitle}</p>
                <p className="text-lg font-mantinia text-main lg:text-xl dark:text-main">{subtitle2}</p>
            </div>
        </>
    );
}

export default TitleHome;