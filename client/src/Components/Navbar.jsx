import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    RedirectToSignIn,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-white text-2xl font-semibold">
                    <a href="#">MyLogo</a>
                </div>

                {/* Menu Toggle Button (for mobile) */}
                <div className="block lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navbar Links */}
                <div
                    className={`${isOpen ? 'block' : 'hidden'
                        } w-full lg:flex items-center space-x-6`}
                >
                    <Link
                        // to="/"
                        className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
                    >
                        Home
                    </Link>
                    <Link
                        // to="/about"
                        className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
                    >
                        About
                    </Link>
                    <Link
                        // to="/services"
                        className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
                    >
                        Services
                    </Link>
                    <Link
                        // to="/contact"
                        className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
                    >
                        Contact
                    </Link>
                    <>
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
