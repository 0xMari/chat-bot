import { useState, useRef, useEffect } from "react"


export default function Sparkles(){
    const canvasRef = useRef(null)
    const [category, setCategory] = useState('Math')

    const spark = [
        {
            name: 'Math', 
            part: ['📚', '👩‍🏫', '👨‍💻', '🥽', '🧪', '🧮', '📐'],
        },
        {
            name: 'Storytelling',
            part: ['✨', '🧚‍♀️', '🧜‍♀️', '👑', '🐉', '🌸', '🌈'],
        },
        {
            name:'Anything else',
            part: ['🧶', '💿', '🦭', '💐', '🌙', '🍜', '🏝️'],
        },
    ]
    
    let particles = []
    
   
    return(
        <canvas></canvas>
    )
}