import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.css'
import './index.less'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import 'mobx-react-lite/batchingForReactDom'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App name="Tom" />
  </ConfigProvider>,
  document.getElementById('root')
)
