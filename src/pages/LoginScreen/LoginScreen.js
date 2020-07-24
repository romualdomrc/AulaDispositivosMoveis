import React from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

import * as LoginService from '../../database/LoginService'

const user = "romualdomrc@gmail.com"
const password = "123456"

class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mail: '',  
            password: '',
        }
    }

    async componentDidMount() {
        await LoginService.autoAuthenticate(user, password)
    }    

    async tryLogin(){
        console.log("usuario", this.state.mail," senha ",this.state.password);
        const { mail, password } = this.state;
        const { navigation } = this.props;
        await LoginService.authenticate(mail, password, navigation)
    }

    onChangeMail(value){
        this.setState({mail: value});
    }

    onChangePassword(value){
        this.setState({password: value});
    }

    render() {
        return(
            <View>
                <TextInput placeholder="user@email.com"
                           value={this.state.mail}
                           onChangeText={(value)=>this.onChangeMail(value)}
                           
                           />
                <TextInput placeholder="******"
                            value={this.state.password}
                            secureTextEntry
                            onChangeText={(value)=>this.onChangePassword(value)}
                                />
                  <Button 
                   color="#4473ba" 
                   title="Entrar" 
                   onPress={()=>this.tryLogin()}/>

            </View>    
        );
    }

};

export default function(props) {
    const navigation = useNavigation();
  
    return <LoginScreen {...props} navigation={navigation} />;
}