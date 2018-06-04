import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class CourseList extends Component {
  static navigationOptions = {title: 'Courses'}
  constructor(props) {
    super(props)
    fetch('https://cs4550-java-server-npristin.herokuapp.com/api/course')
      .then(response => (response.json()))
      .then(courses => {
        this.setState({courses: courses})
      })
    this.state = {
      courses: []
    }
  }
}
export default CourseList