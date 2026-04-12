'use client'

import {useState} from 'react';
import BevelButton from "@/components/Buttons/BevelButton";
import {Button} from "@/components/ui/button";
import {ButtonGroup} from "@/components/ui/button-group"


export default function PracticeHook() {
    const [count, setCount] = useState(0);

    const clickAdd = () => setCount(count + 1);
    const clickSubtract = () => count > 0 ? setCount(count - 1) : 0;

    return (
        <div className="p-5">
            <h1>Count: {count}</h1>
            {/*<BevelButton onClick={clickAdd} text="Add"/>*/}
            {/*<BevelButton onClick={clickRemove} text="Remove"/>*/}
            <ButtonGroup aria-label="Controls" className="h-fit gap-1">
                <Button onClick={clickAdd} className="bg-gray-400" variant='outline'>Increment</Button>
                <Button onClick={clickSubtract} variant="outline" className="bg-red-400">Decrement</Button>
            </ButtonGroup>

        </div>

    )
}