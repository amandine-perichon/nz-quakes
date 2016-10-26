import React from 'react'
import rd3 from 'react-d3-library'
import createNode from './../d3/scatterplot'
const RD3Component = rd3.Component

export default class Scatterplot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {d3: ''}
  }

  componentDidMount() {
    this.setState({d3: createNode(this.props.quakes)})
  }

  componentWillReceiveProps () {
    this.setState({d3: createNode(this.props.quakes)})
  }

  render() {
    let plot = null
    if(this.props.quakes[0] !== undefined) {
      console.log(this.props.quakes)
      plot = <RD3Component data={this.state.d3} />
    }
    return (
      <div>
        {plot}
      </div>
    )
  }
}
