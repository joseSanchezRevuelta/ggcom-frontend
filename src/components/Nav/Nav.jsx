/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import './Nav.css';
import SignIn from '../SignIn/SignIn.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../../features/users/usersSlice.js';

// const navigation = [
//     { name: 'Home', href: '/', current: true }, { name: 'Explore', href: '/explore', current: false }, { name: 'My Communities', href: '/mycommunities', current: false }, { name: 'Games', href: '/games', current: false }, { name: 'Shop', href: '/shop', current: false }, { name: 'About Us', href: '/aboutus', current: false }
// ]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Nav({ openSignIn, setOpenSignIn, openSignUp, setOpenSignUp }) {
    const userState = useSelector(state => state.user)
    // console.log(userState)

    const dispatch = useDispatch();

    const handleLogOut = () => {
        localStorage.removeItem("data_ggcom");
        dispatch(clearUserData());
    };

    const location = useLocation();

    const [navigation, setNavigation] = useState([
        { name: 'Home', href: '/', current: true },
        { name: 'Explore', href: '/explore', current: false },
        { name: 'My Communities', href: '/mycommunities', current: false },
        // { name: 'Games', href: '/games', current: false },
        // { name: 'Shop', href: '/shop', current: false },
        { name: 'About Us', href: '/aboutus', current: false }
    ]);

    useEffect(() => {
        const updatedNavigation = navigation.map((item) => ({
            ...item,
            current: item.href === location.pathname
        }));
        setNavigation(updatedNavigation);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const handleCreateCommunity = (event) => {
        let isLogin = true
        if (!isLogin) {
            event.preventDefault();
            setOpenSignIn(true)
        }
    }


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
                                {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <Link key='logout' className="bg-transparent hover:bg-main border border-main hover:border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={handleLogOut}>
                                        Log out
                                    </Link>
                                </div> */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <Link key='createcommunity' to='createcommunity' activeclassname="active" className="bg-transparent hover:bg-main border border-main hover:border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={handleCreateCommunity}>
                                        Create Community
                                    </Link>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {Object.keys(userState.userData).length ? (
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <UserCircleIcon className="block h-8 w-8 text-main" aria-hidden="true" />
                                                    {/* <img
                                                        className="h-8 w-8 rounded-full"
                                                        src="/img/logo.png"
                                                        // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        alt=""
                                                    /> */}
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                // as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/profile"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Settings
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                onClick={handleLogOut}
                                                            >
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    ) : (
                                        <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenSignIn(true)}>
                                            Login
                                        </button>
                                    )}
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