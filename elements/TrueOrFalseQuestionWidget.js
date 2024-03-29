import React from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import TrueFalseQuestionService from "../services/TrueFalseQuestionService"

class TrueOrFalseQuestionWidget extends React.Component {
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
      examId: 1,
      previewMode: false
    }
    this.trueFalseQuestionService = TrueFalseQuestionService.instance();
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
          this.trueFalseQuestionService
            .findTrueFalseQuestionById(questionId)
            .then(question => this.setState({question: question}))
      }
   }

  updateForm(newState) {
    this.setState(newState)
  }

  createTrueFalseQuestion() {
      console.log("creating true false question")
      console.log(this.state.question)
      this.trueFalseQuestionService
        .createTrueFalseQuestion(this.state.examId, this.state.question)
        .then(response => console.log(response))
        .then(this.props.navigation.navigate('ExamWidget', {questions: []}))
  }

  deleteTrueFalseQuestion() {
      this.trueFalseQuestionService
        .deleteTrueFalseQuestion(this.state.questionId)
        .then(this.props.navigation.navigate('ExamWidget', {questions: []}))
  }

  render() {
    return(
      <ScrollView style={{padding: 15, marginBottom: 30}}>
          {!this.state.previewMode &&
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

                <CheckBox onPress={() => this.updateForm({question: {...this.state.question, isTrue: !this.state.question.isTrue}})}
                          checked={this.state.question.isTrue} title='The answer is true'/>
                <View style={{paddingTop:10}}>
                    <Button	backgroundColor="green"
                         color="white"
                         title="Save"
                         onPress={() => this.createTrueFalseQuestion()}/>
                </View>
                <View style={{paddingTop:10}}>
                    {this.state.questionId == null ?
                        <Button	backgroundColor="red"
                             color="white"
                             title="Cancel"
                             onPress={() => this.props.navigation.goBack()}/>
                      : <Button backgroundColor="red"
                             color="white"
                             title="Delete"
                             onPress={() => this.deleteTrueFalseQuestion()}/>
                    }
                </View>
            </ScrollView>
          }

          {this.state.previewMode &&
            <ScrollView>
                <Text style={{fontWeight: "bold"}} h4>{this.state.question.title}</Text>
                <Text h5>{this.state.question.description}</Text>
                <Text style={{alignSelf: 'flex-end', fontWeight: "bold"}}>{this.state.question.points} Pts</Text>
                <CheckBox title='True'/>

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

export default TrueOrFalseQuestionWidget