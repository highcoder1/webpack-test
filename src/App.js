import React, {Component} from 'react';
import styles from './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    let name = 'tangao'
    console.log(name)
  }
  render() {
    return (
      <div className={styles.appContainer}>App组件</div>
    )
  }
}

export default App;