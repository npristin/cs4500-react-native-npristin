import React, {Component} from 'react'
import {ScrollView, Alert, Modal, View} from 'react-native'
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
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
      this.setState({modalVisible: visible});
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
    this.setModalVisible(!this.state.modalVisible)
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/lesson/" + this.state.lessonId + "/exam", {
            body: JSON.stringify(this.state.exam),
            headers: { 'Content-Type': 'application/json'},
            method: 'POST'
        })
  }

  updateTitle(text) {
    this.setState({
        exam: {
            ...this.state.exam,
            title: text
        }
    })
  }

  updateDescription(text) {
    this.setState({
        exam: {
            ...this.state.exam,
            description: text
        }
    })
  }

  render() {
    return(
      <ScrollView style={{padding: 15}}>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{marginTop: 22}}>
          <View>
              <Text h2>Add Exam</Text>
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

              <View style={{paddingTop:10}}>
              <Button title="Save Exam"
                    backgroundColor="green"
                    color="white"
                    onPress={() => this.createExam()} />
              </View>
              <View style={{paddingTop:10}}>
              <Button title="Cancel"
                      backgroundColor="red"
                      color="white"
                      onPress={() => this.setModalVisible(!this.state.modalVisible)} />
              </View>
          </View>
        </View>
      </Modal>

      <Button title="Add Exam"
                      onPress={() => this.setModalVisible(!this.state.modalVisible)} />

      <View style={{paddingTop:10}}>
      <Button title="Add Assignment"
        onPress={() => this.props.navigation
                            .navigate("AssignmentEditor", {lessonId: this.state.lessonId})} />
      </View>
      <View style={{paddingTop:10}}>
      <Text h3>Assignments</Text>
      {this.state.widgets.filter(widget => widget.className === "Assignment").map
        ((widget, index) => (
           <ListItem
             onPress={() =>
                this.props.navigation
                    .navigate("AssignmentEditor", {lessonId: this.state.lessonId, assignmentId: widget.id})}
             key={index}
             subtitle={widget.description}
             title={widget.title}/>))
      }
      </View>
      <View style={{paddingTop:10}}>
      <Text h3>Exams</Text>
      {this.state.widgets.filter(widget => widget.className === "Exam").map
          ((widget, index) => (
             <ListItem
               onPress={() =>
                this.props.navigation
                    .navigate("QuestionList", {examId: widget.id})}
               key={index}
               subtitle={widget.description}
               title={widget.title}/>))
        }
      </View>
      </ScrollView>
    )
  }
}
export default WidgetList