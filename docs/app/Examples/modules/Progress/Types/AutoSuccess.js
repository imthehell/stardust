import React, { Component } from 'react'
import { Button, Progress } from 'stardust'

export default class ProgressAutoSuccessExample extends Component {
  state = { percent: 0 }

  toggle = () => this.setState({ percent: this.state.percent === 0 ? 100 : 0 })

  render() {
    return (
      <div>
        <Progress percent={this.state.percent} autoSuccess />
        <Button onClick={this.toggle}>Toggle Complete</Button>
      </div>
    )
  }
}
