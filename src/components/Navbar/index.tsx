import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
  } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from '../ui/use-toast';
import Image from 'next/image';
import Logo from '../../../public/logo.png'

export default function Navbar() {
    const router = useRouter();

    const onLogout = () => {
        router.push('/')
        toast({
            title: "Logout Berhasil!"
          })
    }
  return (
    <div className='border-b-2 w-full px-8 py-6 bg-[#b6252a]'>
        <div className='flex items-center justify-between'>
            <div>
                <Image src={Logo} alt='Logo' width={100} height={100}/>
            </div>
            <NavigationMenu>
                    <NavigationMenuList className='space-x-4'>
                        <NavigationMenuItem>
                        <Link href="/dashboard" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className='text-md'>Dashboard</div>
                            </NavigationMenuLink>
                        </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className='space-x-4'>
                        <Link href="/akses-poin" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <div className='text-md'>Akses Poin Tersedia</div>
                            </NavigationMenuLink>
                        </Link>
                        <Link href="/list-router" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className='text-md'>Data Router</div>
                            </NavigationMenuLink>
                        </Link>
                        <Link href="/monitoring" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className='text-md'>Monitoring</div>
                            </NavigationMenuLink>
                        </Link>
                        <Link href="/bandwith" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className='text-md'>Bandwith</div>
                            </NavigationMenuLink>
                        </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        <div className='flex items-center justify-end cursor-pointer' onClick={onLogout}>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className='text-md font-bold underline'>Logout</div>
                            </NavigationMenuLink>
                        </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
            </NavigationMenu>
        </div>
    </div>
  )
}
