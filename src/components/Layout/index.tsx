import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();
    const isAuthRoute = router.pathname.includes("auth");
    const isHomePage = router.pathname === "/";
    
    return (
        <div className='min-h-screen bg-blue-gray-50 w-full overflow-auto'>
            {isHomePage ? (
                <div className='bg-white'>{children}</div>
            ) : isAuthRoute ? (
                <div className='bg-white'>{children}</div>
            ) : (
                <div className='py-2 w-full'>
                    <div className='flex items-center justify-center'>
                        <Navbar />
                    </div>
                    <div className='bg-white px-12 rounded-xl py-4 min-h-screen'>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
