import React, {Component} from 'react'
import {ScrollView, Alert, Modal, View} from 'react-native'
import {Text, ListItem, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import WidgetService from "../services/WidgetService";

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

    this.widgetService = WidgetService.instance();
  }

  setModalVisible(visible) {
      this.setState({modalVisible: visible});
  }

  findAllWidgets(lessonId) {
      this.widgetService
        .findAllWidgets()
        .then(widgets => this.setState(
           {widgets: widgets.filter(w => w.lessonId == lessonId && (w.className === "Exam" || w.className === "Assignment"))}))
  }

  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId")
    this.setState({lessonId: lessonId})
    this.findAllWidgets(lessonId)
  }

  componentWillReceiveProps(newProps) {
    const {navigation} = newProps;
    console.log(newProps)

    this.findAllWidgets(this.state.lessonId)
  }

  createExam() {
    console.log("creating exam")
    this.setModalVisible(!this.state.modalVisible)
    this.widgetService
        .createExamWidget(this.state.lessonId, this.state.exam)
        .then(() => this.findAllWidgets(this.state.lessonId))
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
      <ScrollView style={{padding: 15, marginBottom: 30}}>

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
                            .navigate("AssignmentWidget", {lessonId: this.state.lessonId})} />
      </View>
      <View style={{paddingTop:10}}>
      <Text h3>Assignments</Text>
      {this.state.widgets.filter(widget => widget.className === "Assignment").map
        ((widget, index) => (
           <ListItem
             onPress={() =>
                this.props.navigation
                    .navigate("AssignmentWidget", {lessonId: this.state.lessonId, assignmentId: widget.id})}
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
                    .navigate("ExamWidget", {examId: widget.id})}
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