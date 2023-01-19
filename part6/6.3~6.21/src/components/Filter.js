import React from 'react'
import { connect } from 'react-redux'

const Filter = (props) => {
    const handleFilter = (event) => {
        props.setFilter(event)
    }

    const style = {
        marginBottom: 10
    }

  return (
    <div>
        <form>
            <div style={style}>
                filter <input onChange={handleFilter}/>
            </div>
        </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
    return {
        setFilter: event => {
            dispatch({type:'filter/setFilter', payload: event.target.value})
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Filter)