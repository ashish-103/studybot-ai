import React, { useContext } from 'react'
import ReactCardFlip from 'react-card-flip';
import { AboutContext } from '../home/AboutUs';

export default function AboutCard({ id, src, heading, description, className }) {
    // const [isFlipped, setIsFlipped] = useState(false);
    const { current, setCurrent } = useContext(AboutContext)
    const baseVariant = "rounded-md border shadow-md cursor-pointer h-[360px] md:w-[230px] lg:w-[250px] md:h-[330px]";
    return (
        <div className={className}>
            <ReactCardFlip isFlipped={id === current} flipDirection="horizontal">
                <div onClick={() => {
                    if (id !== current) {
                        setCurrent(id);
                    } else {
                        setCurrent(-1)
                    }
                }} className={baseVariant}>
                    <div className='h-[60%]'>
                        <img src={src} alt="aboutus" className='h-full mx-auto' />
                    </div>
                    <div className='h-[10%] px-4 pl-7 flex items-center bg-primary-orange bg-opacity-80'>
                        0{id}
                    </div>
                    <div className='h-[30%] text-sm font-semibold px-4 flex items-center justify-center rounded-b-md bg-primary-orange bg-opacity-50'>
                        {heading}
                    </div>
                </div>

                <div onClick={() => {
                    setCurrent(-1);
                }} className={baseVariant}>
                    <div className='p-4 text-sm h-full'>
                        <div className='h-full border-2 border-primary-orange rounded-md p-2'>
                            {description}
                        </div>
                    </div>
                </div>
            </ReactCardFlip>
        </div>
    )
}
