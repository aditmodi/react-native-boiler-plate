import React, { Component } from 'react';

export const ReactNative = React;

ReactNative.StyleSheet = {
  create: function create(styles){
    return styles
  }
}

class View extends Component{
  render(){ return false; }
}

class ListView extends Component{
  static DataSource(){}
}

class AppRegistry{
  static registerComponent(){}
}

ReactNative.View = View;
ReactNative.ScrollView = ScrollView;
ReactNative.ListView = ListView;
ReactNative.Text = Text;
ReactNative.TouchableOpacity = View;
ReactNative.TouchableHighlight = View;
ReactNative.TouchableWithoutFeedback = View;
ReactNative.ToolbarAndroid = View;
ReactNative.Image = View;
ReactNative.AppRegistry = AppRegistry;
