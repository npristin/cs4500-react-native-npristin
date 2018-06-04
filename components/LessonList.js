import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class LessonList extends Component {
  static navigationOptions = {title: 'Lessons'}
  constructor(props) {
    super(props)
    this.state = {
      lessons: [],
      courseId: 1,
      moduleId: 1
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const courseId = navigation.getParam("courseId")
    const moduleId = navigation.getParam("moduleId")
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/course/"+courseId+"/module/"+moduleId+"/lesson")
      .then(response => (response.json()))
      .then(lessons => this.setState({lessons}))
  }
}
export default LessonList