import React from 'react';
import { View, StyleSheet, ScrollView, Alert} from 'react-native';
import { Button, Header, Input, Card, Text, Image} from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("db.db");


export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(
      tx => {
        tx.executeSql("select * from amount", [], (_, { rows }) =>
          // console.log(rows)
          this.setState({amount: (rows[0] || 0)})
        );
      },
      console.log(",,,,,,,,,,,,,",db)
    );
    
    this.state = {amount: 0, spend: 0}

  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists amount (id integer primary key not null, value int);"
      );
    });
  }

  handleAdd = () => {
    let amount = (+this.state.amount + +this.state.spend).toFixed(2);
    db.transaction(
      tx => {
        tx.executeSql("insert into amount (value) values (?)", [+amount]);        
      },
      null,
      console.log("error")
    );
    console.log(db)
    this.setState({amount, spend: 0})
  }

  handleSubtract = () => {
    let amounts = (this.state.amount - this.state.spend);
    if (amounts < 0) return;
    this.setState({amount: amounts.toFixed(2), spend: 0})
  }

  handleReset = () => { 
    Alert.alert("Reset", "Are you sure?", [ 
    {text: 'OK', onPress: () => this.setState({amount: 0, spend: 0})},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    ])
    
  }


  render() {
    
    return (
      
      <View>
        <Card style={{}}>
        <Text h4 style={{textAlign:"center"}}>Current Amount:</Text>
        <Text style={{textAlign:"center", fontSize: 25}}>${this.state.amount}</Text>
        
        </Card>
        <Card>

           <Button title="Add" style={{marginBottom: 20}} onPress={this.handleAdd}/>
           <Button title="Subtract" style={{marginBottom: 20}} onPress={this.handleSubtract}/>
           <Button title="Reset" onPress={this.handleReset}/>
        </Card>
        <ScrollView>
        <TextInputMask style={{backgroundColor: "red", height: 50, fontSize: 50}}
            type={'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',              
              suffixUnit: '',
              unit: '$',
            }}
            value={this.state.spend}
            onChangeText={text => {
              
              this.setState({
                spend: +text.replace(/[$,]/g, "")
              })
            }}
        />
        </ScrollView>
      </View>
      
    );
  }
  
}

LinksScreen.navigationOptions = {
  title: 'Amount',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
