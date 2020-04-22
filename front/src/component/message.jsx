import React from 'react';
import ReactDom from 'react-dom';

export default class Message extends React.Component {


    render() {
        const show = this.props.show;
        const content = this.props.content;

        const child = show ? 
            <div style={{ position: 'fixed', 
                display: 'inline-block', 
                padding: 10, 
                left: '50%', 
                top: '20%', 
                border: '1px solid black',
                background: 'white',
                 }}>
                { content }
            </div>
             : '';

        return ReactDom.createPortal(
            child,
            document.getElementById('root')
        );
    }
  }
  
