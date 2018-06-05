import React, {Component} from 'react'
import {ScrollView, Alert} from 'react-native'
import {Text, ListItem, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      courseId: 1,
      moduleId: 1,
      lessonId: 1,
      exam: {
        title: '',
        description: '',
        className: "Exam"
      },
      assignment: {
        title: '',
        description: '',
        className: "Assignment"
      }
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId")
    this.setState({lessonId: lessonId})
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState(
        {widgets: widgets.filter(w => w.lessonId == lessonId && (w.className === "Exam" || w.className === "Assignment"))}))
  }

  createExam() {
    console.log("creating exam")
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/lesson/" + this.state.lessonId + "/exam", {
            body: JSON.stringify(this.state.exam),
            headers: { 'Content-Type': 'application/json'},
            method: 'POST'
        })
  }

  createAssignment() {
    console.log("creating assignment")
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/lesson/" + this.state.lessonId + "/assignment", {
           body: JSON.stringify(this.state.assignment),
           headers: { 'Content-Type': 'application/json'},
           method: 'POST'
       })
  }

  updateTitle(text) {
    this.setState({
        exam: {
            ...this.state.exam,
            title: text
        },
        assignment: {
            ...this.state.assignment,
            title: text
        }
    })
  }

  updateDescription(text) {
    this.setState({
        exam: {
            ...this.state.exam,
            description: text
        },
        assignment: {
            ...this.state.assignment,
            description: text
        }
    })
  }

  render() {
    return(
      <ScrollView style={{padding: 15}}>
      <FormLabel>Title</FormLabel>
      <FormInput onChangeText={
        text => this.updateTitle(text)
      }/>
      <FormValidationMessage>
        Title is required
      </FormValidationMessage>

      <FormLabel>Description</FormLabel>
      <FormInput onChangeText={
        text => this.updateDescription(text)
      }/>
      <FormValidationMessage>
        Description is required
      </FormValidationMessage>

      <Button title="Add Assignment"
        onPress={() => this.createAssignment()} />
      <Button title="Add Exam"
        onPress={() => this.createExam()} />
      <Text h3>Exams</Text>
      {this.state.widgets.map(
        (widget, index) => (
          <ListItem
            onPress={() => {
                if(widget.className === "Exam")
                    this.props.navigation
                        .navigate("QuestionList", {examId: widget.id})}
            }
            key={index}
            subtitle={widget.description}
            title={widget.title}/>))}
      </ScrollView>
    )
  }
}
export default WidgetList