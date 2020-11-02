import React, { Component,Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, Button, Loading } from './common';
import TextLinks from './common/TestLinks';
import axios from 'axios';

import deviceStorage from '../services/deviceStorage';
class Registration extends Component {
   
    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
          password_confirmation: '',
          error: '',
          loading: false
        };
        this.registerUser = this.registerUser.bind(this);
        this.onRegistrationFail = this.onRegistrationFail.bind(this);
      }
      registerUser() {
        const { email, password, password_confirmation } = this.state;
    
        this.setState({ error: '', loading: true });
        axios.post("http://10.0.2.2:4000/user/signup",{
           
            email: email,
            password: password,
           
          
        },)
        .then((response) => {
           // Handle the JWT response here
           console.log("responsejwt"+response.data.jwt);
           deviceStorage.saveItem("id_token", response.data.jwt);
           this.props.newJWT(response.data.jwt);
          
        })
        .catch((error) => {
           // Handle returned errors here
           console.log(error);
      this.onRegistrationFail();
        });
       
      }
      onRegistrationFail() {
        this.setState({
          error: 'Registration Failed',
          loading: false
        });
      }
    render() {
      const { email, password, password_confirmation, error, loading } = this.state;
      const { form, section, errorTextStyle } = styles;
  
      return (
        
         
        <Fragment>
           
          <View style={form}>
            <View style={section}>
              <Input
                placeholder="user@email.com"
                label="Email"
                value={email}
                onChangeText={email => this.setState({ email })}
              />
            </View>
  
            <View style={section}>
              <Input
                secureTextEntry
                placeholder="password"
                label="Password"
                value={password}
                onChangeText={password => this.setState({ password })}
              />
            </View>
  
            
            <Text style={errorTextStyle}>
            {error}
          </Text>
          {!loading ?
            <Button onPress={this.registerUser} >
              Register
            </Button>
            :
            <Loading size={'large'} />}
          </View>
       
         <TextLinks onPress={this.props.authSwitch}>
          Already have an account? Log in!

         </TextLinks>
         </Fragment>
      );
    }
  }
  
  const styles = {
    form: {
      width: '100%',
      borderTopWidth: 1,
      borderColor: '#ddd',
    },
    section: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      backgroundColor: '#fff',
      borderColor: '#ddd',
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
      }
  };

export { Registration };