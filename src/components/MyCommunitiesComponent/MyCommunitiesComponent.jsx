import Filter from "../Filter/Filter";
import { useEffect, useState } from "react";
import JoinedCommunities from "../JoinedCommunities/JoinedCommunities";
import CreatedCommunities from "../CreatedComunities/CreatedComunities";
import {
    Tab,
    initTE,
} from "tw-elements";

function MyCommunitiesComponent() {
    const [renderState, setRenderState] = useState(false)

    useEffect(() => {
        setRenderState(true)
    }, [renderState])

    useEffect(() => {
        initTE({ Tab });
    }, [renderState]);

    return (
        <>
            <div className="text-white text-center w-full mx-auto">
                <ul
                    className="mb-5 flex mx-auto list-none flex-row flex-wrap justify-center items-center border-b-0 pl-0 text-center"
                    role="tablist"
                    data-te-nav-ref>
                    <li role="presentation">
                        <a
                            href="#tabs-home"
                            className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-main dark:data-[te-nav-active]:text-main"
                            data-te-toggle="pill"
                            data-te-target="#tabs-home"
                            data-te-nav-active
                            role="tab"
                            aria-controls="tabs-home"
                            aria-selected="true"
                        >Joined communities</a>
                    </li>
                    <li role="presentation">
                        <a
                            href="#tabs-profile"
                            className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-main dark:data-[te-nav-active]:text-main"
                            data-te-toggle="pill"
                            data-te-target="#tabs-profile"
                            role="tab"
                            aria-controls="tabs-profile"
                            aria-selected="false"
                        >Created communities
                        </a>
                    </li>
                </ul>
                {/* <Filter /> */}
                <div className="mb-6 lg:mx-3">
                    {/* <div
                        className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                        id="tabs-home"
                        role="tabpanel"
                        aria-labelledby="tabs-home-tab"
                        data-te-tab-active>
                        Tab 1 content
                    </div> */}
                    <div
                        className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                        id="tabs-home"
                        role="tabpanel"
                        aria-labelledby="tabs-home-tab"
                        data-te-tab-active>
                        {/* Tab 1 content */}
                        <JoinedCommunities />
                    </div>
                    {/* <JoinedCommunities /> */}
                    <div
                        className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                        id="tabs-profile"
                        role="tabpanel"
                        aria-labelledby="tabs-profile-tab">
                        {/* Tab 2 content */}
                        <CreatedCommunities />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyCommunitiesComponent;
