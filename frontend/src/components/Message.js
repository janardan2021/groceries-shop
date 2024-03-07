

const Message = ({variant, children}) => {
  const messageStyles = () => {
      if (variant === 'success'){
        return {
          fontWeight: 'bold',
          color: 'green'
        }
      } else if (variant === 'danger') {
        return {
          fontWeight: 'bold',
          color: 'Crimson'
        }
      } else {
        return {
          fontWeight: 'bold',
          color: 'blue'
        }
      }
  }
  return (
    
    <div style={messageStyles()}>
        {children}
     
    </div>
  )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message
