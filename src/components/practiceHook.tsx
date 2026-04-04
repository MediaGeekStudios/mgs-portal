'use client'
import { useState } from 'react';
import BevelButton from "@/components/Buttons/BevelButton";

export function PracticeHook() {
    const [count, setCount] = useState(0);

    const clickAdd = () => setCount(count + 1);
    const clickRemove = () => count > 0 ? setCount(count - 1) : 0;

    return (
        <div style={{ padding: '2em' }}>
            <h1>Count: {count}</h1>
            <BevelButton onClick={clickAdd} text="Add"/>
            <BevelButton onClick={clickRemove} text="Remove"/>
        </div>
    )
}