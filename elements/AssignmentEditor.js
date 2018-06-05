import React from 'react'
import {ScrollView, View, TextInput, StyleSheet} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class AssignmentEditor extends React.Component {
  static navigationOptions = { title: "Assignment"}
  constructor(props) {
    super(props)
    this.state = {
      assignment: {
        title: '',
        description: '',
        points: 0,
        className: "Assignment"
      },
      assignmentId: 1,
      lessonId: 1
    }
  }

  componentDidMount() {
      const {navigation} = this.props;
      const assignmentId = navigation.getParam("assignmentId")
      const lessonId = navigation.getParam("lessonId")
      this.setState({assignmentId: assignmentId})
      this.setState({lessonId: lessonId})
      console.log(this.state.assignmentId)
      fetch("https://cs4550-java-server-npristin.herokuapp.com/api/assignment/"+assignmentId)
        .then(response => (response.json()))
        .then(assignment => this.setState({assignment}))
  }

  updateForm(newState) {
    this.setState(newState)
  }

  createAssignment() {
      console.log("creating/updating assignment")
      console.log(this.state.assignment)
      fetch("https://cs4550-java-server-npristin.herokuapp.com/api/lesson/" + this.state.lessonId + "/assignment", {
              body: JSON.stringify(this.state.assignment),
              headers: { 'Content-Type': 'application/json'},
              method: 'POST'
      })
  }

}

export default AssignmentEditor
