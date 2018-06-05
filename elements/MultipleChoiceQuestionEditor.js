import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Button, CheckBox, ListItem} from 'react-native-elements';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class MultipleChoiceQuestionEditor extends React.Component {
  static navigationOptions = { title: "Multiple Choice"}
  constructor(props) {
    super(props)
    this.state = {
      question: {
          title: '',
          description: '',
          options: '',
          points: 0,
          correctOption: 0
      },
      examId: 1,
      option: ''
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
        fetch("https://cs4550-java-server-npristin.herokuapp.com/api/choice/" + questionId)
        .then(response => (response.json()))
        .then(question => this.setState({question: question}))
    }
  }

  updateForm(newState) {
    this.setState(newState)
  }

  createMultipleChoiceQuestion() {
    console.log("creating multiple choice question")
    console.log(this.state.question)
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/exam/" + this.state.examId + "/choice", {
            body: JSON.stringify(this.state.question),
            headers: { 'Content-Type': 'application/json'},
            method: 'POST'
    }).then(response => console.log(response))
  }

  render() {
    return(
      <ScrollView>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({question: {...this.state.question, title: text}})
        }/>
        <FormValidationMessage>
          Title is required
        </FormValidationMessage>

        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({question: {...this.state.question, description: text}})
        }/>
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>

        <FormLabel>Add Option</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({option: text})
        }/>
        <FormValidationMessage>
          Add at least two options
        </FormValidationMessage>

        <Button backgroundColor="blue"
                 color="white"
                 title="Add Choice"
                 onPress={() => {
                    if(this.state.option != '')
                        this.updateForm(
                            {question: {...this.state.question, options: this.state.question.options + "," + this.state.option}})
                    }}/>
        <FormLabel>Choices</FormLabel>
        {this.state.question.options != '' ?
            this.state.question.options.split(",").map(
                (option, index) => (
                    index == this.state.question.correctOption ?
                        <ListItem
                            style={{ backgroundColor: 'rgb(204, 206, 209)'}}
                            leftIcon={{name: "check-circle"}}
                            key={index}
                            title={option}/>
                        : <ListItem
                            leftIcon={{name: "add-circle-outline"}}
                            key={index}
                            title={option}
                            onPress={() => this.updateForm(
                                {question: {...this.state.question, correctOption: index}})}/>
            )) : null
        }

        <FormInput onChangeText={
          text => this.updateForm({question: {options: text}})
        }/>

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={() => this.createMultipleChoiceQuestion()}/>
        <Button	backgroundColor="red"
                 color="white"
                 title="Cancel"/>

        <Text h3>Preview</Text>
        <Text h2>{this.state.question.title}</Text>
        <Text>{this.state.question.description}</Text>
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
    )
  }
}

export default MultipleChoiceQuestionEditor

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