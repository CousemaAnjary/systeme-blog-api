import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav className='bg-white shadow p-4'>
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            to="/admin/dashboard"
                            className="text-blue-600 text-2xl font-bold hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105">
                            VibeNet
                        </Link>

                    </div>
                </div>

            </nav>
        </>
    );
}
