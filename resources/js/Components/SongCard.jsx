import { useState, useRef, useEffect } from 'react'
import PrimaryButton from '@/Components/PrimaryButton'

export default function SongCard () {
    const [inputValue, setInputValue] = useState("0:00")
    const [musicDuration, setMusicDuration] = useState(null)
    const [buttonContent, setButtonContent] = useState(false)
    const [audioPlayedInSeconds, setAudioPlayedInSeconds] = useState(0)
    const audioPlayer = useRef(null)
    const audioBar = useRef(null)
    const timerRecursive = () => setTimeout(timer, 500)

    function timer()
    {
        const element = audioPlayer.current
        const timerInSeconds = Math.round(element.currentTime)
        setAudioPlayedInSeconds(timerInSeconds)
        let minutes = Math.floor(timerInSeconds / 60)
        let secondsToText = (timerInSeconds%60).toString()
        let seconds = ((secondsToText).length < 2) ? ("0" + secondsToText) : (secondsToText)
        let timerConverter = minutes + ":" + seconds
        
        let timeInput = audioBar.current
        timeInput.value = timerInSeconds
        timerRecursive
        setInputValue(timerConverter)
    }

    function playSong()
    {
        const element = audioPlayer.current
        setMusicDuration(element.duration)
        element.play()
        timer()
        setButtonContent(true)
    }

    function stopMusic()
    {
        const element = audioPlayer.current
        element.pause()
        setButtonContent(false)
        console.log(element.currentTime)
    }

    function test()
    {
        clearTimeout(timerRecursive)
        const element = audioPlayer.current
        console.log(audioBar.current.value)
        element.currentTime = audioBar.current.value
    }

    return (
        <div className="dark:bg-purple-400 h-[50vh] w-[25%] p-1 rounded-xl">
            <div className="m-6 h-[50%] dark:bg-purple-500 rounded-lg">
                IMAGE
            </div>
            <div className="text-center w-full lato text-xl font-black">
                TITLE
            </div>
            <div className="w-full text-center">
                ARTIST
            </div>
            <div className="p-3 mx-6 h-min rounded-full h-[10px] text-center">
                <input type="range" min="0" max={musicDuration} defaultValue="0" className="w-full accent-amber-400" onBlur={timer} ref={audioBar}/>
                {inputValue}
            </div>
            <div className="text-center">
                {buttonContent ? (
                    <PrimaryButton className="bg-green-500 hover:bg-green-700 focus:bg-green-800" onClick={stopMusic}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[1.5] stroke-current">
                          <path d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                        </svg>

                    </PrimaryButton>
                ) : (
                    <PrimaryButton className="bg-green-500 hover:bg-green-700 focus:bg-green-800" onClick={playSong}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[1.5] stroke-current">
                            <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                    </PrimaryButton>
                )}

                <audio controls ref={audioPlayer} hidden>
                </audio>
            </div>
        </div>
    )
}