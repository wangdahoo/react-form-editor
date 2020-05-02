import React from 'react'
import FormEditor from '../src'
import { createFormItem, FormItemType } from '../src/stores/FormStore'

// import FormEditor from '../dist'

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
                // defaultFormAttrs={{
                //     formWidth: 80,
                //     labelAlign: 'top',
                //     labelWidth: 200,
                //     labelWidthUnit: 'px'
                // }}
            />
        </div>
    )
}
