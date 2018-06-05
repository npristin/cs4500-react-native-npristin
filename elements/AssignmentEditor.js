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

  
}

export default AssignmentEditor
