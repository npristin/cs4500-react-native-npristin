import React from 'react'
import {View, TextInput, StyleSheet, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import BlanksQuestionService from "../services/BlanksQuestionService"

class FillInTheBlanksQuestionWidget extends React.Component {
  static navigationOptions = { title: "Fill In The Blanks"}
  constructor(props) {
    super(props)
    this.state = {
        question: {
          title: '',
          description: '',
          points: 0,
          variables: ''
        },
        examId: 1,
        previewMode: false
    }
    this.blanksQuestionService = BlanksQuestionService.instance();
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
        this.blanksQuestionService
            .findBlanksQuestionById(questionId)
            .then(question => this.setState({question: question}))
    }
  }

  updateForm(newState) {
    this.setState(newState)
  }

  createFillInTheBlanks() {
      console.log("creating fill in the blanks")
      console.log(this.state.question)
      this.blanksQuestionService
        .createBlanksQuestion(this.state.examId, this.state.question)
        .then(response => console.log(response))
        .then(this.props.navigation.navigate('ExamWidget', {questions: []}))
  }

  deleteFillInTheBlanks() {
      this.blanksQuestionService
        .deleteBlanksQuestion(this.state.questionId)
        .then(this.props.navigation.navigate('ExamWidget', {questions: []}))
  }

  render() {
    const splitTexts = this.state.question.variables.split("\n");

    return(
        <ScrollView style={StyleSheet.absoluteFill}>
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

                <FormLabel>Question Text</FormLabel>
                <View style={{backgroundColor: 'white', height: 100}}>
                    <TextInput
                        returnKeyType='none'
                        multiline={true}
                        style={styles.input}
                        value={this.state.question.variables}
                        onChangeText={
                            text => this.updateForm({question: {...this.state.question, variables: text}})
                    }/>
                </View>
                <FormValidationMessage>
                  Description is required
                </FormValidationMessage>

                <View style={{paddingTop:10}}>
                    <Button	backgroundColor="green"
                             color="white"
                             title="Save"
                             onPress={() => this.createFillInTheBlanks()} />
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
                         onPress={() => this.deleteFillInTheBlanks()}/>
                }
                </View>
              </ScrollView>
              }

              {this.state.previewMode &&
                <ScrollView>
                    <Text style={{fontWeight: "bold"}} h4>{this.state.question.title}</Text>
                    <Text h5>{this.state.question.description}</Text>
                    <Text style={{alignSelf: 'flex-end', fontWeight: "bold"}}>{this.state.question.points} Pts</Text>
                    <View style={{paddingTop: 15}}>
                        {splitTexts.map((item, index) => {
                            let first = false;
                            let vars;
                            let itemsBeforeBrackets = item.split('[').filter(item => (item.indexOf(']') < 0))[0];

                            if (itemsBeforeBrackets === '') {
                                vars = item.split(']')[1];
                                first = true;
                            } else {
                                vars = itemsBeforeBrackets;
                            }
                            if (first) {
                                return (
                                    <View style={{paddingTop: 20, flex: 1, flexDirection: 'row'}}>
                                        <TextInput style={{backgroundColor: 'white', width: 100,
                                            borderColor: 'gray', borderWidth: 1}}/>
                                        <Text key={index} h5>
                                            {vars}
                                        </Text>
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={{paddingTop: 20, flex: 1, flexDirection: 'row'}}>
                                        <Text key={index} h5>
                                            {vars}
                                        </Text>

                                        <TextInput style={{backgroundColor: 'white', width: 100,
                                            borderColor: 'gray', borderWidth: 1}}/>
                                    </View>
                                )
                            }
                        })}


                    </View>
                </ScrollView>
              }
            <Button title="Preview"
                onPress={() => {
                    this.setState({previewMode: !this.state.previewMode})}}
                buttonStyle={{marginTop: 10}}/>
          </ScrollView>
        </ScrollView>
    )
  }
}

export default FillInTheBlanksQuestionWidget

const styles = StyleSheet.create({
   inputView: {
     backgroundColor: 'white',
     height: 100
   }
});