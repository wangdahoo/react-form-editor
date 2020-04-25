import React from 'react'
import FormEditor from '../src'

// import  '../dist/index.css'
// import FormEditor from '../dist'

interface Props {
   name: string
}

export default function App (props: Props) {
    return (
        <div>
            <FormEditor style={{
                height: '100vh'
            }} />
        </div>
    )
}
