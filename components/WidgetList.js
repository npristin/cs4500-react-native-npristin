import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      courseId: 1,
      moduleId: 1,
      lessonId: 1
    }
  }
}
export default WidgetList