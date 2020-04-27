import React from 'react'
import FormEditor from '../src'
import { createFormItem, FormItemType } from '../src/stores/FormStore'

// import  '../dist/esm/index.css'
// import FormEditor from '../dist/esm'

interface Props {
   name: string
}

export default function App (props: Props) {
    const items = [
        createFormItem(FormItemType.INPUT),
        createFormItem(FormItemType.NUMBER),
        createFormItem(FormItemType.TEXTAREA),
        createFormItem(FormItemType.CHECKBOX),
        createFormItem(FormItemType.RADIO),
        createFormItem(FormItemType.SELECT),
        createFormItem(FormItemType.TEXT),
        createFormItem(FormItemType.RESULT),

        // 暂时不支持 layout
        // createFormItem(FormItemType.LAYOUT),
    ]

    return (
        <div>
            <FormEditor
                style={{
                    height: '100vh'
                }}
                defaultFormItems={items}
            />
        </div>
    )
}
