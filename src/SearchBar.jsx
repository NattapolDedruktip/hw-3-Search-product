import React, { useEffect, useState } from 'react'




export default function SearchBar({search,hdlChange}) {
    return (
        <input value={search} onChange={hdlChange}  type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    )
}
