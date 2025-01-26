'use client'
import Link from "next/link";
import NavLinks2 from "../navlinks2";
import {HomeIcon, ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Menu(){
    const [isExpanded, setIsExpanded] = useState(false)
    const path = usePathname()

    const toggleSideBar = () =>{
        setIsExpanded(!isExpanded)
    }

    useEffect(()=>{
        if(window.innerWidth<768){
            setIsExpanded(false)
        }
        
    }, [path])

    return(
        <div className={`flex flex-col md:flex-col px-3 py-4 md:px-2 bg-blue-100 ${isExpanded ? 'w-[100vw] md:w-64 h-screen z-1 md:z-0' : 'bg-white md:bg-blue-100 ml-4 md:ml-0 w-[10vw] md:w-16 h-[5vh] md:h-full z-1 md:z-0'}`}>
            <div className="flex flex-col">
                <button className="self-end" onClick={toggleSideBar} aria-label={isExpanded? 'Collapse sidebar': 'Expand sidebar'}>
                    {isExpanded ? (
                        <ChevronLeftIcon className="border border-gray-400 md:border-none rounded-xl md:rounded-none w-6 m-2 md:m-0 p-1 md:p-0"/>
                    ):(
                        <ChevronRightIcon className="border border-gray-400 md:border-none rounded-xl md:rounded-none w-6 ml-6 md:ml-0 p-1 md:p-0"/>
                    )}
                </button>
                <Link
                    className="mb-2 flex h-10 items-end justify-center md:justify-start rounded-md px-3 p-2 md:h-10"
                    href='/'>
                        <HomeIcon className="w-6 text-black"/>
                        {isExpanded? (
                            <p className="hidden md:block w-20 text-black md:w-20">
                                logo
                            </p>
                        ):(<></>)}
                        
                </Link>
                
            </div>
            <div className="flex grow justify-start space-x-2 flex-col md:space-x-0 md:space-y-1">
                <NavLinks2 exp={isExpanded}/>
            </div>
        </div>
    )
}