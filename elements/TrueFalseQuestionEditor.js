import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "True False"}
  constructor(props) {
    super(props)
    this.state = {
        question: {
          title: '',
          description: '',
          points: 0,
          isTrue: true
      },
      examId: 1
    }
  }

  componentDidMount() {
      const {navigation} = this.props;
      const examId = navigation.getParam("examId")
      const questionId = navigation.getParam("questionId")
      this.setState({examId: examId})
      console.log(this.state.examId)
      console.log(questionId)

      if (questionId != null) {
          fetch("https://cs4550-java-server-npristin.herokuapp.com/api/truefalse/" + questionId)
          .then(response => (response.json()))
          .then(question => this.setState({question: question}))
      }
   }

  updateForm(newState) {
    this.setState(newState)
  }

  createTrueFalseQuestion() {
      console.log("creating true false question")
      console.log(this.state.question)
      fetch("https://cs4550-java-server-npristin.herokuapp.com/api/exam/" + this.state.examId + "/truefalse", {
              body: JSON.stringify(this.state.question),
              headers: { 'Content-Type': 'application/json'},
              method: 'POST'
      })
    }

  render() {
    return(
      <View>
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

        <CheckBox onPress={() => this.updateForm({question: {isTrue: !this.state.isTrue}})}
                  checked={this.state.question.isTrue} title='The answer is true'/>

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={() => this.createTrueFalseQuestion()}/>
        <Button	backgroundColor="red"
                 color="white"
                 title="Cancel"
                 onPress={() => this.props.navigation.goBack()}/>

        <Text h3>Preview</Text>
        <Text h2>{this.state.question.title}</Text>
        <Text>{this.state.question.description}</Text>

      </View>
    )
  }
}

export default TrueFalseQuestionEditor