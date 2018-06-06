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
          points: 0,
          options: '',
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
    this.setState({questionId: questionId})
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

  deleteMultipleChoiceQuestion() {
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/choice/" + this.state.questionId, {
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

        <FormLabel>Add Option</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({option: text})
        }/>
        <FormValidationMessage>
          Add at least two options
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
                            style={{ backgroundColor: 'rgb(204, 206, 209)'}}
                            leftIcon={{name: "check-circle"}}
                            rightIcon={{name: "cancel", color:"red"}}
                            onPressRightIcon={() => alert("hi!")}
                            key={index}
                            title={option}/>
                        : <ListItem
                            leftIcon={{name: "add-circle-outline"}}
                            rightIcon={{name: "cancel", color:"red"}}
                            key={index}
                            title={option}
                            onPress={() => this.updateForm(
                                {question: {...this.state.question, correctOption: index}})}/>
            )) : null
        }

        <FormInput onChangeText={
          text => this.updateForm({question: {options: text}})
        }/>

        <Text h3>Preview</Text>
        <Text h2>{this.state.question.title}</Text>
        <Text>{this.state.question.description}</Text>
        <Text>{this.state.question.points} Pts</Text>
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

        <View style={{paddingTop:10}}>
        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={() => this.createMultipleChoiceQuestion()}/>
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
                 onPress={() => this.deleteMultipleChoiceQuestion()}/>
        }
        </View>

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