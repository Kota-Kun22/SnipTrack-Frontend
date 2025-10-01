import React from 'react'

const Card = ({title,desc}) => {
  return (
    <div className="bg-white shadow-custom border border-gray-100 flex flex-col p-6 gap-4 rounded-lg hover:shadow-lg transition-all duration-300 min-h-[200px] h-full">
        <h1 className="text-slate-900 text-xl font-bold font-roboto">{title}</h1>
        <p className="text-slate-600 text-sm leading-relaxed flex-grow">{desc}</p>
    </div>
  )
}

export default Card