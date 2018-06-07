import React from 'react'
import {ScrollView, View, TextInput, StyleSheet} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import EssayQuestionService from "../services/EssayQuestionService"


class EssayQuestionWidget extends React.Component {
  static navigationOptions = { title: "Essay"}
  constructor(props) {
    super(props)
    this.state = {
        question: {
          title: '',
          description: '',
          points: 0
        },
        examId: 1,
        previewMode: false
    }

    this.essayQuestionService = EssayQuestionService.instance();
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
        this.essayQuestionService
            .findEssayById(questionId)
            .then(question => this.setState({question: question}))
    }
  }

  updateForm(newState) {
    this.setState(newState)
  }

  createEssayQuestion() {
    console.log("creating essay question")
    console.log(this.state.question)
    this.essayQuestionService
        .createEssayQuestion(this.state.examId, this.state.question)
        .then(this.props.navigation.navigate('ExamWidget', {questions: []}))
  }

  deleteEssayQuestion() {
      this.essayQuestionService
        .deleteEssayQuestion(this.state.questionId)
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

        <View style={{paddingTop:10}}>
        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={() => this.createEssayQuestion()}/>
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
                 onPress={() => this.deleteEssayQuestion()}/>
        }
        </View>
        </ScrollView>
        }

        {this.state.previewMode &&
        <ScrollView>
        <Text h2>{this.state.question.title}</Text>
        <Text>{this.state.question.description}</Text>
        <Text style={{alignSelf: 'flex-end'}}>{this.state.question.points} Pts</Text>
        <View style={styles.inputView}>
            <TextInput
                multiline={true}
                numberOfLines={10}/>
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

export default EssayQuestionWidget

const styles = StyleSheet.create({
   inputView: {
     backgroundColor: 'white',
     height: 100
   }
});