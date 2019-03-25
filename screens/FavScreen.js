import React from 'react';
import { View, StyleSheet , Text} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class FavScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const fav = navigation.getParam('post','there is no fav ');
// console.log('fav',fav)
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20, margin:8, fontWeghit:'300'}}>Your favourits!</Text>
       {
          fav.map((l, i) => (
            <ListItem
              key={i}
              title={l}
              containerStyle={{ borderBottomWidth: 1, borderBottomColor:'#d3d3d3'}}
              titleStyle={{ textAlign:'left'}} 
            />
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
