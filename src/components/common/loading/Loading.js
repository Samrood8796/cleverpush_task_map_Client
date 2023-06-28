import React from 'react'
import './style.css'
const Loading = ({textContent}) => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <div className="loading-text">{textContent}</div>
        </div>
    )
}

export default Loading