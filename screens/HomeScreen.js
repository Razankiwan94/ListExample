import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, 
  TouchableHighlight, 
  TextInput
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

const items=[
  {
    id:1, 
    title:"Don't cry because it's over, smile because it happened."
  },
  {
    id:2, 
    title:"So many books, so little time.",
  }, 
  {
    id:3, 
    title:"Be yourself; everyone else is already taken."
  }, 
  {
    id:4, 
    title:"A room without books is like a body without a soul."
  }, 
  {
    id:5, 
    title:"Be the change that you wish to see in the world."
  }, 
  {
    id:6, 
    title:"In three words I can sum up everything I've learned about life: it goes on."
  }, 
  {
    id:7, 
    title:"You only live once, but if you do it right, once is enough."
  },
  {
    id:8, 
    title:"A friend is someone who knows all about you and still loves you."
  }
];


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title:'Home', 
    headerStyle:{
      backgroundColor:'#7aacdb'
    },
    headerTintColor: '#fff',
    
  };
 
  constructor(){
    super();
    this.state={
      fav:[], 
      data:[], 
      isChecked:[], 
      selectedItems:[], 
    }
    this.isIconCheckedOrNot=this.isIconCheckedOrNot.bind(this);
    this.showItemAsSelected=this.showItemAsSelected.bind(this);

  }
  
  componentWillMount(){
    this.setState({
      data:items
    });
    let initialCheck = this.state.data.map(() => false);
    this.setState({isChecked : initialCheck})
  }
  renderSeparator = () => {
    return (
      <View
        style={styles.Separator}
      />
    );
  };
  renderHeader = () => {    
    return (      
      <TextInput 
        placeholder='Search' 
        onChangeText={text => this.searchFilterFunction(text)}
        style={styles.searchBar}
      />
    );  
  };
  renderItem(rowData){
    console.log(rowData);
    return(
      <ListItem              
        roundAvatar              
        title={rowData.item.title}                     
        containerStyle={{ borderBottomWidth: 0}}
        titleStyle={{  textAlign:'left'}} 
        onPress={()=>{this.isIconCheckedOrNot(rowData.item, rowData.index)}}
        leftIcon={ this.showItemAsSelected(rowData.index) }
      />
    );
  }
  searchFilterFunction = text => {
    const newData = items.filter(item => {    
     const itemData = `${String(item.title).toUpperCase()}`;
     const textData = text.toUpperCase();
     return itemData.indexOf(textData) > -1;
    });    
   this.setState({ data: newData }); 
 };
 isIconCheckedOrNot = (item,index) => {
  let { isChecked,selectedItems} = this.state;
  isChecked[index] = !isChecked[index];
  const newData=this.state.data;
  this.setState({ isChecked : isChecked,data:newData});
  if(isChecked[index] == true){
    selectedItems.push(item.title);
  }else {            
    selectedItems.pop(row);
    isChecked[index]=false;
    this.setState({ isChecked : isChecked});
  }
 
}
  showItemAsSelected(index) {
      if(this.state.isChecked[index]== false){
        return(<Icon name='star' size={25} color='#d3d3d3'/>);
      }
      else if (this.state.isChecked[index]== true) {
          return (
            <Icon name='star' size={25} color='#e5b532' />
          );
      }

  }
  renderFav(){
    this.props.navigation.navigate('fav', {post:this.state.selectedItems}); 
  }
  render() {
    return (
      <View style={styles.container}>
       <View style={styles.TopHeaderContainer}>
         <Text style={styles.BoldTitle}>Check out these amazing quotes.</Text>
         <Text style={styles.LightTitle}>You can pick your favourits!</Text>
         <TouchableHighlight onPress={()=>{this.renderFav()}} underlayColor='#d3d3d3'>
           <Text style={{textDecorationLine:'underline', textDecorationColor:'blue', color:'blue', margin:4}}>go to favourits</Text>
         </TouchableHighlight>
       </View>
          <FlatList
          data={this.state.data}
          keyExtractor={(item) => 'key'+item.id}
          extraData={this.state}
          renderItem={(item)=>this.renderItem(item)}
          ItemSeparatorComponent={this.renderSeparator} 
          ListHeaderComponent={this.renderHeader}
          />
      </View>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:15, 
  },
  Separator:{
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  }, 
  searchBar:{
    borderRadius:10,
    padding:8, 
    margin:10, 
    borderWidth:1, 
    borderColor:'#d3d3d3'
  }, 
  ItemContainer:{
    flexDirection:'row', 
    padding:8
  }, 
  TopHeaderContainer:{
    margin:8, 
    flexDirection:'row', 
    flexWrap:'wrap'
  }, 
  BoldTitle:{
    fontSize:21, 
    fontWeight:'200'
  }, 
  LightTitle:{
    fontSize:18, 
    color:'gray'
  }
 
});
