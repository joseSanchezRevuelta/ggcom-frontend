/* eslint-disable react/prop-types */


function FooterHome() {
    return (
        <>
            <div className='text-center mx-auto mt-36 lg:mt-38 flex flex-row w-full'>
                <div className="mx-auto flex flex-row items-center">
                <span className="text-white">Colaborating with</span>
                <a href="#"><img
                    className="h-8 mx-3 w-auto hover:border border-transparent mx-auto"
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