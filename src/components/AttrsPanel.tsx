import React from 'react'
import { Tabs } from 'antd'
import FormAttrs from './FormAttrs'
import formAttrsStore from '../stores/FormAttrsStore'

const { TabPane } = Tabs

class AttrsPanel extends React.Component {
    onChangeTab = (activeTab: string) => {
        // console.log(activeTab)
    }

    render () {
        return (
            <Tabs onChange={this.onChangeTab} animated={false}>
                 <TabPane tab="字段属性" key="field-attrs">

                </TabPane>
                <TabPane tab="表单属性" key="form-attrs">
                    <FormAttrs formAttrs={formAttrsStore} />
                </TabPane>
            </Tabs>
        )
    }
}

export default AttrsPanel
