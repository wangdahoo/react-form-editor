import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Button, Modal } from 'antd'
import { FormStore } from '../stores/FormStore'
import { FormAttrsStore } from '../stores/FormAttrsStore'
import GeneratedForm from './GeneratedForm'

interface ToolbarProps {
    form: FormStore
    formAttrs: FormAttrsStore
    onSave: (json: string) => void
}

function Toolbar (props: ToolbarProps) {
    const { form, formAttrs, onSave } = props

    const [modalVisible, setModalVisible] = useState(false)

    const getJson = () => JSON.stringify({
        items: form.getItems(),
        attrs: formAttrs
    })

    function onPreview () {
        setModalVisible(true)
    }

    return (
        <div className="form-editor-toolbar-content">
            <Button type="link" icon="eye" onClick={onPreview}>预览</Button>
            <Button type="link" icon="save" onClick={() => onSave(getJson())}>保存</Button>

            <Modal
                title="表单预览"
                centered
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {modalVisible ? <GeneratedForm form={JSON.parse(getJson())} /> : null}
            </Modal>
        </div>
    )
}

export default observer(Toolbar)
