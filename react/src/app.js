/**
 * Created by rustem on 24.08.16.
 */

class HelloWorld extends React.Component {
  state = {
    greeting: 'Hello world!'
  }

  render() {
    return (
      <div className="greeting">{this.state.greeting}</div>
    )
  }
}
