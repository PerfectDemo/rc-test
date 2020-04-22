import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Title(props) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            height: 50,
            borderBottom: '1px solid black',
            margin: 10
        }}>
            <Link to="/" >create</Link>
            <div>rc-store</div>
            <Link to="/files">list</Link>
        </div>
    )
}