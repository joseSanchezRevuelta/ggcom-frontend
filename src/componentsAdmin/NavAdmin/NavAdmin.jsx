/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../../features/users/usersSlice.js';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function NavAdmin() {

    const frontUrl = import.meta.env.VITE_URL_FRONT;

    const userState = useSelector(state => state.user)

    const dispatch = useDispatch();

    const location = useLocation();

    const disclosureButtonRef = useRef(null);

    const [navigation, setNavigation] = useState([
        { name: 'Users', href: '/userlist', current: true },
        { name: 'Communities', href: '/communitieslist', current: false }
    ]);

    useEffect(() => {
        const updatedNavigation = navigation.map((item) => ({
            ...item,
            current: item.href === location.pathname
        }));
        setNavigation(updatedNavigation);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const handleDisclosureButtonClick = () => {
        if (disclosureButtonRef.current) {
            disclosureButtonRef.current.click();
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem("data_ggcom");
        dispatch(clearUserData());
        window.location.href = `${frontUrl}/`;
    };


    return (
        <>
            <Disclosure as="nav" className="fixed top-0 bg-neutral-900 border-slate-800 border-b border-b-main w-full">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-full">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" ref={disclosureButtonRef}>
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
                                        <Link to="/userlist">
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
                                                        item.current ? 'text-main hover:bg-main hover:text-white' : 'text-white hover:bg-main hover:text-white',
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
                                    <span className='text-main'>Admin</span>
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <UserCircleIcon className="block h-8 w-8 text-main" aria-hidden="true" />
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
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-900 border border-main py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-main')}
                                                            onClick={handleLogOut}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
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
                                        onClick={handleDisclosureButtonClick}
                                    >
                                        {item.name}
                                        <span className="sr-only hidden">Open main menu</span>
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

export default NavAdmin;