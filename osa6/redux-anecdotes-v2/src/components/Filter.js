import React from 'react'
import { connect } from 'react-redux'
import { filterSetting } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.filterSetting(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(
  null,
  { filterSetting })(Filter)