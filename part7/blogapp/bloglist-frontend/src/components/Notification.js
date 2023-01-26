import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notifications === null) {
    return null
  }

  const style = {
    color: props.notifications.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    display: props.notifications.length === 0 ? 'none' : ''
  }

  return (
    <div id='notification' style={style}>
      {props.notifications.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(
  mapStateToProps
)(Notification)