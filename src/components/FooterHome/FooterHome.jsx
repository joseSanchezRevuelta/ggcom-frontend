/* eslint-disable react/prop-types */
function FooterHome() {
    return (
        <>
            <div className='text-center mx-auto mt-40 lg:mt-32 flex flex-row w-full'>
                <div className="mx-auto flex flex-row items-center">
                <span className="text-white">Colaborating with</span>
                <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer"><img
                    className="h-8 mx-2 w-auto hover:border border-transparent"
                    src="/img/rawg.jpg"
                    alt="Your Company"
                /></a>
                <span className="text-white">Rawg API</span>
                </div>
            </div>
        </>
    );
}

export default FooterHome;