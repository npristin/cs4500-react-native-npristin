import React from 'react'
import {ScrollView, View, TextInput, StyleSheet} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import WidgetService from "../services/WidgetService";

class AssignmentWidget extends React.Component {
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
      lessonId: 1,
      previewMode: false
    },
    this.widgetService = WidgetService.instance()
  }

  componentDidMount() {
      const {navigation} = this.props;
      const assignmentId = navigation.getParam("assignmentId")
      const lessonId = navigation.getParam("lessonId")
      this.setState({assignmentId: assignmentId})
      this.setState({lessonId: lessonId})
      console.log(this.state.assignmentId)
      if (assignmentId != null) {
        this.widgetService
            .findAssignmentById(assignmentId)
            .then(assignment => this.setState({assignment: assignment}))
      }
  }

  updateForm(newState) {
    this.setState(newState)
  }

  createAssignment() {
      console.log("creating/updating assignment")
      console.log(this.state.assignment)
      this.widgetService
        .createAssignmentWidget(this.state.lessonId, this.state.assignment)
        .then(this.props.navigation.navigate('WidgetList', {widgets: []}))
  }

  deleteAssignment() {
      this.widgetService
        .deleteAssignmentWidget(this.state.assignmentId)
        .then(this.props.navigation.navigate('WidgetList', {widgets: []}))
  }

  render() {
    return(
        <ScrollView style={{padding: 15, marginBottom: 30}}>
            {!this.state.previewMode &&
                <ScrollView>
                    <FormLabel>Title</FormLabel>
                    <FormInput
                        value={this.state.assignment.title}
                        onChangeText={
                            text => this.updateForm({assignment: {...this.state.assignment, title: text }})
                    }/>
                    <FormValidationMessage>
                      Title is required
                    </FormValidationMessage>

                    <FormLabel>Description</FormLabel>
                    <FormInput
                        value={this.state.assignment.description}
                        onChangeText={
                            text => this.updateForm({assignment: {...this.state.assignment, description: text}})
                    }/>
                    <FormValidationMessage>
                      Description is required
                    </FormValidationMessage>

                    <FormLabel>Points</FormLabel>
                    <FormInput
                        value={this.state.assignment.points.toString()}
                        onChangeText={
                            text => this.updateForm({assignment: {...this.state.assignment, points: text}})
                    }/>
                    <FormValidationMessage>
                      Points are required
                    </FormValidationMessage>

                    <View style={{paddingTop:10}}>
                    <Button	backgroundColor="green"
                             color="white"
                             title="Save"
                             onPress={() => this.createAssignment()}/>
                    </View>
                    <View style={{paddingTop:10}}>
                    {this.state.assignmentId == null ?
                        <Button	backgroundColor="red"
                             color="white"
                             title="Cancel"
                             onPress={() => this.props.navigation.goBack()}/>
                      : <Button backgroundColor="red"
                             color="white"
                             title="Delete"
                             onPress={() => this.deleteAssignment()}/>
                    }
                    </View>
                </ScrollView>
            }

            {this.state.previewMode &&
                <ScrollView>
                    <Text style={{fontWeight: "bold"}} h4>{this.state.assignment.title}</Text>
                    <Text>{this.state.assignment.description}</Text>
                    <Text style={{alignSelf: 'flex-end', fontWeight: "bold"}}>{this.state.assignment.points} Pts</Text>

                    <Text style={{fontWeight: "bold"}} h5>Essay Answer</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={10}/>
                    </View>
                    <View style={{paddingTop:15}}>
                        <Text style={{fontWeight: "bold"}} h5>Upload a file</Text>
                        <View style={{backgroundColor: 'white'}}>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                numberOfLines={5}/>
                        </View>
                    </View>
                        <View style={{paddingTop:15}}>
                        <Text style={{fontWeight: "bold"}} h5>Submit a link</Text>
                            <View style={{backgroundColor: 'white'}}>
                                <TextInput
                                    style={styles.input}
                                    multiline={true}
                                    numberOfLines={5}/>
                        </View>
                    </View>
                </ScrollView>
            }

        <Button title="Preview"
            onPress={() => {
                this.setState({previewMode: !this.state.previewMode})}}
            buttonStyle={{marginTop: 10}}/>
      </ScrollView>
    )
  }
}

export default AssignmentWidget

const styles = StyleSheet.create({
   inputView: {
     backgroundColor: 'white',
     height: 100
   }
});