import NavLinks from "./ui/navlinks"



export default function Page(){


    return(
        <div className="w-screen h-screen max-w-2xl mx-auto pt-[30vh] flex flex-col items-center">
            <h2 className='px-[10vw] md:py-[1vw] text-5xl md:text-7xl w-full text-center font-kirang'>
                What do you need help with?
            </h2>
            <div className="flex w-full items-center md:justify-around gap-2 pt-[10vh] flex-col md:flex-row">
                <NavLinks/>
            </div>
        </div>
    )
}