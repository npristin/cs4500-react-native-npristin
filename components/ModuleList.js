import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class ModuleList extends Component {
  static navigationOptions = {title: 'Modules'}
  constructor(props) {
    super(props)
    this.state = {
      modules: [],
      courseId: 1
    }
  }
  
}
export default ModuleList