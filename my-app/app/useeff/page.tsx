'use client'

import { useEffect, useState } from 'react'

export default function MyUseEffect() {

   const [a, setA] = useState('a') 
   const [b, setB] = useState('b') 
   const [str, setStr] = useState('')

   useEffect(()=> {
    console.log("My Use Effect A: ", a, "B: ", b)
   },[b])  // dependency array

  return (
    <div>
      My Use Effect
      <button className='border-2 border-black m-2 p-1' onClick={() => {
        setA(b)
      }}>setA</button>
      <button className='border-2 border-black m-2 p-1' onClick={() => {
        setB(a)
      }}>setB</button>
      <input
        className='border-2 border-black m-2 p-1'
      type="text" value={str} onChange={e=> setStr(e.target.value)} />
    </div>
  )
}