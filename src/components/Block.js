import React, { Component } from 'react'

export default class Block extends Component {
    render() {
        const {id, attributes} = this.props
        return (
            <div className="block">
                <p className="block__id">{id}</p>
                <p className="block__data">{attributes.data}</p>
            </div>
        )
    }
}
