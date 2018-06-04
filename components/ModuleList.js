import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class ModuleList extends Component {
  static navigationOptions = {title: 'Modules'}
  constructor(props) {
    super(props)
    this.state = {
      modules: [],
      courseId: 1
    }
  }
  componentDidMount() {
    const courseId = this.props.navigation.getParam("courseId", 1);
    this.setState({
      courseId: courseId
    })
    fetch('https://cs4550-java-server-npristin.herokuapp.com/api/course/' + courseId + '/module')
      .then(response => (response.json()))
      .then(modules => this.setState({modules: modules}))
  }
}
export default ModuleList