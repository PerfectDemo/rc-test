'use strict';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Message from '../component/message';

@withRouter
@inject('file')
@observer
export default class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            content: '',
            messageShow: false,
            messageContent: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('new lock:', nextProps);
    }

    componentDidMount() {
        const isCreate = this.props.type === 'create';

        if (!isCreate) {
            console.log('match:', this.props.match);
            const id = this.props.match.params.id;
            this.props.file.setCurrentFile({ id });
            this.props.file.requireLock(id);
            this.props.file.getFile(id).then(() => {
                this.setState({
                    name: this.props.file.name,
                    content: this.props.file.content
                });
            });
        } 
    }

    handleSubmit() {
        const isCreate = this.props.type === 'create';

        if (isCreate) {
            this.props.file.createFile(this.state.name, this.state.content)
                .then(() => this.props.file.fetchFiles())
                .then(() => {
                    this.setState({ messageShow: true, messageContent: 'insert success!'});
                    setTimeout(() => {
                        this.setState({ messageShow: false });
                        this.props.history.push('/files'); 
                    } , 1500);
                })
                .catch(() => {
                    this.setState({ messageShow: true, messageContent: 'insert failed!'});
                    setTimeout(() => this.setState({ messageShow: false }) , 1500);
                });
        } else {
            const id = this.props.match.params.id;
            this.props.file.updateFile(id, this.state.content)
                .then(() => {
                    this.setState({ messageShow: true, messageContent: 'update success!'});
                    setTimeout(() => {
                        this.setState({ messageShow: false });
                        this.props.history.push('/files'); 
                    } , 1500);
                })
                .catch(() => {
                    this.setState({ messageShow: true, messageContent: 'update failed!'});
                    setTimeout(() => this.setState({ messageShow: false }) , 1500);
                });
    
        }
        return false;
    }

    render() {
        const isCreate = this.props.type === 'create';
        const lock  = this.props.file.lock;
        const editing = !isCreate && !lock;
        const type = isCreate ? 'Create' : 'Edit';
        console.log('render lock:', lock);


        return (
        <div style={ { margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } }>
            <h3>{type} page</h3>
            { editing ? <h4>Someone Editing...</h4> : '' }
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={ (e) => e.preventDefault() }>
                <div>   
                    <label for="name">file name: </label>
                    <input disabled={!isCreate} id="name"  value={this.state.name} onChange={ (event) => this.setState({ name: event.target.value }) }/>
                </div>
                <br />
                <div>
                    <label for="textarea">content: </label>
                    <textarea disabled={ !isCreate && !lock }id="textarea" defaultValue={this.props.file.content} style={ { height: 200, verticalAlign: 'middle' } } value={this.state.content } onChange={ (event) => this.setState({ content: event.target.value }) }/>
                </div>
                <button onClick={ () => this.handleSubmit() }style={ { width: 50 } }>Save</button>
            </form>
            <Message show={ this.state.messageShow } content={ this.state.messageContent } />
        </div>
        )
    }
}