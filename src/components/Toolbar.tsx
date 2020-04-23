import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'
import { FormStore } from '../stores/FormStore'
import { FormAttrsStore } from '../stores/FormAttrsStore'

interface ToolbarProps {
    form: FormStore
    formAttrs: FormAttrsStore
    onPreview: (json: string) => void
    onSave: (json: string) => void
}

function Toolbar (props: ToolbarProps) {
    const { form, formAttrs, onPreview, onSave } = props

    const getJson = () => JSON.stringify({
        items: form.getItems(),
        attrs: formAttrs
    })

    return (
        <div className="form-editor-toolbar-content">
            <Button type="link" icon="eye" onClick={() => onPreview(getJson())}>预览</Button>
            <Button type="link" icon="save" onClick={() => onSave(getJson())}>保存</Button>
        </div>
    )
}

export default observer(Toolbar)
