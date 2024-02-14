/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import './Nav.css';
import SignIn from '../SignIn/SignIn.jsx';
import SignUp from '../SignUp/SignUp.jsx';

// const navigation = [
//     { name: 'Home', href: '/', current: true }, { name: 'Explore', href: '/explore', current: false }, { name: 'My Communities', href: '/mycommunities', current: false }, { name: 'Games', href: '/games', current: false }, { name: 'Shop', href: '/shop', current: false }, { name: 'About Us', href: '/aboutus', current: false }
// ]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Nav({ openSignIn, setOpenSignIn, openSignUp, setOpenSignUp }) {

    const location = useLocation();

    const [navigation, setNavigation] = useState([
        { name: 'Home', href: '/', current: true },
        { name: 'Explore', href: '/explore', current: false },
        { name: 'My Communities', href: '/mycommunities', current: false },
        { name: 'Games', href: '/games', current: false },
        // { name: 'Shop', href: '/shop', current: false },
        { name: 'About Us', href: '/aboutus', current: false }
    ]);

    //   const handleNavLinkClick = (name) => {
    //     const updatedNavigation = navigation.map((item) => ({
    //       ...item,
    //       current: item.name === name
    //     }));
    //     setNavigation(updatedNavigation);
    //   };

    // useEffect(() => {
    //     const updatedNavigation = navigation.map((item) => ({
    //         ...item,
    //         current: item.href === location.pathname
    //     }));
    //     setNavigation(updatedNavigation);
    // }, [location.pathname, navigation]);

    useEffect(() => {
        const updatedNavigation = navigation.map((item) => ({
            ...item,
            current: item.href === location.pathname
        }));
        setNavigation(updatedNavigation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    

    return (
        <>
            <SignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} />
            <SignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />

            <Disclosure as="nav" className="fixed top-0 bg-neutral-900 border-slate-800 border-b border-b-main w-full">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-full">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                {/* Menu nav full screen*/}
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="">
                                        <Link to="/">
                                            <img
                                                className="h-8 w-auto hover:border border-transparent"
                                                src="/img/logo.png"
                                                alt="Your Company"
                                            />
                                        </Link>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    activeclassname="active"
                                                    className={classNames(
                                                        item.current ? 'text-main2 hover:bg-main hover:text-white' : 'text-white hover:bg-main hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenSignIn(true)}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Mobile menu nav*/}
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    // Ocultar enlace principal en tamaño móvil
                                    // item.href === '/' ? null : (
                                    <Link
                                        key={item.name}
                                        // as="a"
                                        to={item.href}
                                        activeclassname="active"
                                        className={classNames(
                                            item.current ? 'text-main2 hover:bg-neutral-800 hover:text-main2' : 'text-white hover:bg-main hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                    // aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                    // )
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
}

export default Nav;