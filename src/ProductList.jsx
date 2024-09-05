import React, { useEffect, useState } from 'react'



export default function ProductList({search,filter,data}) {

    
    let checkBeforeFilter = search ? filter : data


    
    return (
        <ul className="menu bg-base-200  p-0 [&_li>*]:rounded-none">
            {
            checkBeforeFilter.map( item => (
                <li key={item.id}>{item.title} // {item.category} // {item.price}</li>
            ))
            }
        </ul>
    )
}
