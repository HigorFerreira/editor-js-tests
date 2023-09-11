import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import './index_tw.css'
import './extra_css.css'
import '..//node_modules/react-grid-layout/css/styles.css'
import '..//node_modules/react-resizable/css/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)