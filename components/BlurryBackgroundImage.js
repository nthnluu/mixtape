import CrossfadeImage from "react-crossfade-image";

export default function BlurryBackgroundImage({image, children, darkened}) {
    return <div className="full-height dark:bg-gray-900 bg-black text-white">
        <div className="z-50 relative h-full overflow-auto"
             style={{backdropFilter: "blur(98px)", "WebkitBackdropFilter": "blur(98px)"}}>
            {children}
        </div>
        <div className="absolute top-0 h-full">
            <CrossfadeImage src={image}
                            style={{height: '100%', width: '100%'}}
                            containerClass={`absolute top-0 h-full w-screen transition-opacity 
                            duration-300 ${darkened ? "opacity-25" : "opacity-50"}`}/>
        </div>
    </div>
}