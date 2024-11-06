"use client";
import { AnotherButtonProps } from '@/types';
import React from 'react'

const AnotherButton = ({title}:AnotherButtonProps) => {
  return (
    <div>
   <button className='bg-primary-blue text-white rounded-full mt-10'
   onClick={() => alert('Hello World!')}
   >
    {title}
    </button>
    </div>
  )
}

export default AnotherButton