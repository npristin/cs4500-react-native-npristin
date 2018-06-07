import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Button, CheckBox, ListItem} from 'react-native-elements';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChoiceQuestionService from "../services/ChoiceQuestionService"

class MultipleChoiceQuestionWidget extends React.Component {
  static navigationOptions = { title: "Multiple Choice"}
  constructor(props) {
    super(props)
    this.state = {
      question: {
          title: '',
          description: '',
          points: 0,
          options: '',
          correctOption: 0
      },
      examId: 1,
      option: '',
      previewMode: false
    }
    this.choiceQuestionService = ChoiceQuestionService.instance();
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
        this.choiceQuestionService
            .findMCQuestionById(questionId)
            .then(question => this.setState({question: question}))
    }
  }

  updateForm(newState) {
    this.setState(newState)
  }

  createMultipleChoiceQuestion() {
    console.log("creating multiple choice question")
    console.log(this.state.question)
    this.choiceQuestionService
        .createMultipleChoiceQuestion(this.state.examId, this.state.question)
        .then(this.props.navigation.navigate('ExamWidget', {questions: []}))
  }

  deleteMultipleChoiceQuestion() {
    this.choiceQuestionService
        .deleteMultipleChoiceQuestion(this.state.questionId)
        .then(this.props.navigation.navigate('ExamWidget', {questions: []}))
  }

  deleteMultipleChoiceOption(option) {
    var optionsArr = this.state.question.options.split(",");
    var fst = optionsArr.splice(0,1).join("");
    if (fst == option) {
        var rest = optionsArr.join(",");
        this.updateForm({question: {...this.state.question, options: rest}})
    } else {
        var options = this.state.question.options.replace(","+option, '')
        this.updateForm({question: {...this.state.question, options: options}})
    }
  }

  render() {
    return(
    <ScrollView style={StyleSheet.absoluteFill}>
      <ScrollView style={{padding: 15, marginBottom: 30}}>
      {!this.state.previewMode &&
        <ScrollView>
        <FormLabel>Title</FormLabel>
        <FormInput
            value={this.state.question.title}
            onChangeText={
                text => this.updateForm({question: {...this.state.question, title: text}})
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

        <FormLabel>Add Choice</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({option: text})
        }/>
        <FormValidationMessage>
          Add at least two choices
        </FormValidationMessage>

        <View style={{paddingTop:10}}>
        <Button backgroundColor="blue"
                 color="white"
                 title="Add Choice"
                 onPress={() => {
                    if(this.state.option != '')
                        if(this.state.question.options == '')
                            this.updateForm(
                                {question: {...this.state.question, options: this.state.option}})
                        else
                            this.updateForm(
                                {question: {...this.state.question, options: this.state.question.options + "," + this.state.option}})
                    }}/>
        </View>
        <FormLabel>Choices</FormLabel>
        {this.state.question.options != '' ?
            this.state.question.options.split(",").map(
                (option, index) => (
                    index == this.state.question.correctOption ?
                        <ListItem
                            containerStyle={{backgroundColor: "lightgrey"}}
                            leftIcon={{name: "check-circle", size: 15, color: "black"}}
                            rightIcon={{name: "cancel", color:"red"}}
                            onPressRightIcon={() => this.deleteMultipleChoiceOption(option)}
                            key={index}
                            title={option}/>
                        : <ListItem
                            leftIcon={{name: "add-circle-outline", size: 15}}
                            rightIcon={{name: "cancel", color:"red"}}
                            onPressRightIcon={() => this.deleteMultipleChoiceOption(option)}
                            key={index}
                            title={option}
                            onPress={() => this.updateForm(
                                {question: {...this.state.question, correctOption: index}})}/>
            )) : null
        }
        <View style={{paddingTop:10}}>
        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={() => this.createMultipleChoiceQuestion()}/>
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
                 onPress={() => this.deleteMultipleChoiceQuestion()}/>
        }
        </View>
        </ScrollView>
        }

        {this.state.previewMode &&
        <ScrollView>
        <Text style={{fontWeight: "bold"}} h4>{this.state.question.title}</Text>
        <Text h5>{this.state.question.description}</Text>
        <Text style={{alignSelf: 'flex-end', fontWeight: "bold"}}>{this.state.question.points} Pts</Text>
        {this.state.question.options != '' ?
            this.state.question.options.split(",").map(
                (option, index) => (
                     <ListItem
                        leftIcon={{name: "add-circle-outline"}}
                        key={index}
                        title={option}/>
            ))
            : null
        }
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

export default MultipleChoiceQuestionWidget

const styles = StyleSheet.create({
  correctOption: { backgroundColor: 'blue'},
  input: {
       height: 40,
       fontSize: 13,
       padding: 4,
     },
     inputView: {
       backgroundColor: 'white',
       height: 100
     }
})