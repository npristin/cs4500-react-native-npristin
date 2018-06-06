import React from 'react'
import {View, TextInput, StyleSheet, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class FillInTheBlanksQuestionEditor extends React.Component {
  static navigationOptions = { title: "Fill In The Blanks"}
  constructor(props) {
    super(props)
    this.state = {
        question: {
          title: '',
          description: '',
          points: 0,
          variableText: ''
        },
        examId: 1
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    const questionId = navigation.getParam("questionId")
    this.setState({examId: examId})
    this.setState({questionId: questionId})
    console.log(this.state.examId)
    console.log(questionId)

    if (questionId != null) {
        fetch("https://cs4550-java-server-npristin.herokuapp.com/api/blanks/" + questionId)
        .then(response => (response.json()))
        .then(question => this.setState({question: question}))
    }
  }

  updateForm(newState) {
    this.setState(newState)
  }

  createFillInTheBlanks() {
      console.log("creating fill in the blanks")
      console.log(this.state.question)
      fetch("https://cs4550-java-server-npristin.herokuapp.com/api/exam/" + this.state.examId + "/blanks", {
              body: JSON.stringify(this.state.question),
              headers: { 'Content-Type': 'application/json'},
              method: 'POST'
      }).then(response => console.log(response))
  }

  deleteFillInTheBlanks() {
      fetch("https://cs4550-java-server-npristin.herokuapp.com/api/blanks/" + this.state.questionId, {
              method: 'DELETE'
          }).then(this.props.navigation.goBack())
  }

  render() {
    return(
      <ScrollView>
        <FormLabel>Title</FormLabel>
        <FormInput
            value={this.state.question.title}
            onChangeText={
                text => this.updateForm({question: {...this.state.question, title: text }})
        }/>
        <FormValidationMessage>
          Title is required
        </FormValidationMessage>

        <FormLabel>Description</FormLabel>
        <FormInput
            value={this.state.question.description}
            onChangeText={
                text => this.updateForm({question: {...this.state.question, description: text}})
        }/>
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>

        <FormLabel>Points</FormLabel>
        <FormInput
            value={this.state.question.points.toString()}
            onChangeText={
                text => this.updateForm({question: {...this.state.question, points: text}})
        }/>
        <FormValidationMessage>
          Points are required
        </FormValidationMessage>

        <FormLabel>Question Text</FormLabel>
        <View style={{backgroundColor: 'white', height: 100}}>
        <TextInput
            returnKeyType='none'
            multiline={true}
            style={styles.input}
            value={this.state.question.variableText}
            onChangeText={
                text => this.updateForm({question: {...this.state.question, variableText: text}})
        }/>
        </View>
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>

        <Text h3>Preview</Text>
        <Text h2>{this.state.question.title}</Text>
        <Text>{this.state.question.description}</Text>
        <Text style={{alignSelf: 'flex-end'}}>{this.state.question.points} Pts</Text>
        <View style={{paddingBottom: 40}}>
        <TextInput
            multiline={true}
            numberOfLines={20}
            value={this.state.question.variableText.replace(/(\[).+?(\])/g,
                        React.createElement("TextInput"))}/>
        </View>
        <View>
            <Text>
            Hi
            <TextInput value="hi"/>
            </Text>
        </View>

        <View style={{paddingTop:10}}>
        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={() => this.createFillInTheBlanks()} />
        </View>
        <View style={{paddingTop:10, paddingBottom: 20}}>
        {this.state.questionId == null ?
            <Button	backgroundColor="red"
                 color="white"
                 title="Cancel"
                 onPress={() => this.props.navigation.goBack()}/>
          : <Button backgroundColor="red"
                 color="white"
                 title="Delete"
                 onPress={() => this.deleteFillInTheBlanks()}/>
        }
        </View>
      </ScrollView>
    )
  }
}

export default FillInTheBlanksQuestionEditor

const styles = StyleSheet.create({
   inputView: {
     backgroundColor: 'white',
     height: 100
   }
});