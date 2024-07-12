'use client'

import { React, createContext, useContext, useState } from "react";

const AppContext = createContext(undefined)

export const AppWrapper = ( {children}) => {
const [selectedProject, setselectedProject] = useState()
}

return (
    <div>
        Hi
    </div>
)