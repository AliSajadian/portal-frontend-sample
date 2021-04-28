class PureCanvas extends React.Component {
    shouldComponentUpdate() {
      return false;
    }
  
    render() {
      return (
        <canvas
          ref={node => node ? this.props.contextRef(node.getContext('2d') : null)}
        />;
    }
  }