'use client'
import Link from "next/link"
import clsx from 'clsx'
import { usePathname } from "next/navigation"
import Sparkles from "./sparkles"

const links = [
    {name: 'Math', href: '/math'},
    {name: 'Storytelling', href : '/creative'},
    {name: 'Anything else', href: '/general'},
]
export default function NavLinks(){
    const pathname = usePathname()
    return(
        <>
            {links.map((link) =>{
                return(
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx (
                            'relative inline-block group border border-amber-300 w-40 bg-orange-100 items-center text-center px-4 py-2 font-medium hover:bg-amber-200 hover:text-orange-600  md:justify-center md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}  
                    >
                        <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-amber-400 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-orange-100 border border-amber-400 group-hover:bg-orange-200"></span>
                        <p className="relative md:block">{link.name}</p>
                        
                        
                    </Link>
                )
            })}
        </>
    )
}