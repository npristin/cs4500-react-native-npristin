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
  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId")
    this.setState({lessonId: lessonId})
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState(
        {widgets: widgets.filter(w => w.lessonId == lessonId && w.className == null)}))
  }

  createExam() {
    console.log("creating exam")
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/lesson/" + this.state.lessonId + "/exam", {
            body: JSON.stringify(this.state.exam),
            headers: { 'Content-Type': 'application/json'},
            method: 'POST'
        })
    }

}
export default WidgetList