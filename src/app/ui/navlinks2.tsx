'use client'
import Link from "next/link"
import clsx from 'clsx'
import { usePathname } from "next/navigation"
import { CalculatorIcon, BookOpenIcon, SparklesIcon} from '@heroicons/react/24/outline'

const links = [
    {
        name: 'Math', 
        href: '/math',
        icon: CalculatorIcon,
    },
    {
        name: 'Storytelling', 
        href : '/creative',
        icon: BookOpenIcon,
    },
    {
        name: 'Anything else', 
        href: '/general',
        icon: SparklesIcon,
    },
]

export default function NavLinks2({exp}: {exp: boolean}){
    const pathname = usePathname()
    
    return(
        <>
            {links.map((link) =>{
                const LinkIcon = link.icon
                return(
                    <Link
                    key={link.name}
                    href={link.href}
                    className={clsx (
                        `flex self-center md:justify-start md:content-start md:border-none items-center md:self-start md:text-left font-medium hover:bg-blue-100 hover:text-blue-600 p-2 px-3 ${exp ?' w-30 md:w-40' : 'w-[6vw]'}`,
                        {
                            'underline underline-blue-600 underline-offset-4 md:no-underline text-blue-600': pathname === link.href,
                        },
                )}  
                >
                    {exp? (
                        <>
                            <LinkIcon className="hidden md:block md:w-6 md:mr-2"/>
                            <p className="">{link.name}</p>
                        </>
                    ):(
                        <LinkIcon className="hidden md:block md:w-6 md:mr-2"/>
                    )}
                    
                </Link>

                )
                
                    
                
            })}
        </>
    )
}
