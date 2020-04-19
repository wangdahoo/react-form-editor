import React from 'react'
import { Button, notification } from 'antd'
import FormEditor from '../src'

interface Props {
   name: string
}

export default function App (props: Props) {
    const { name } = props

    function greeting () {
        notification.info({
            message: `Hi, ${name}`
        })
    }

    return (
        <div>
            <FormEditor style={{
                height: '100vh'
            }} />
        </div>
    )
}
