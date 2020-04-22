'use strict';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('file')
@observer
export default class List extends Component {

    renderList(file) {
        return (
            <tr>
                <td align="center">{file.id}</td>
                <td align="center"><a href={file.url} download={file.name} >{file.name}</a></td>
                <td align="center"><Link to={`/files/${file.id}`}>edit</Link></td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <table style={{ width: '100%'}}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>operate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.file.files.map(file => this.renderList(file))}
                    </tbody>
                </table>
               
            </div>
        )
    }
}