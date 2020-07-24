import React from 'react';
import { View, TextInput, Button, Alert } from 'react-native'; 
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ScrollVieW } from "../../styles/styles";

import * as ContentDetailScreenService from '../../database/ContentDetailScreenService'

class ContentDetailScreen extends React.Component {

  	constructor(){
		super();
		this.state = {
			desc: '',  
			img: '',
			name: ''
		}
  	}
  
	componentDidMount() {
		const {desc, img, name} = this.props.route.params;
		this.setState({desc})
		this.setState({img})
		this.setState({name})
	}  

	updateContent(){
		const { id } = this.props.route.params
		const { navigation } = this.props
		console.log("id a ser atualizado ", id)
		const { database } = this.props.route.params
		const data = {
			name: this.state.name,
			desc: this.state.desc,
			img: this.state.img,
		}
		ContentDetailScreenService.updateContentDB(id, data, database)
		navigation.navigate('ContentScreen')

	}

	deleteContent() {
		const { id } = this.props.route.params
		const { navigation } = this.props
		console.log("id a ser apagado ", id)
		const { database } = this.props.route.params
		ContentDetailScreenService.deleteContentDB(id, database)
		navigation.navigate('ContentScreen')
	}

	onChangeTextInput(value, field) {
		const state = this.state;
		state[field] = value;
		this.setState(state);
	}


	render(){
		return (
		<View>
			<TextInput value={this.state.name} onChangeText={(value)=>this.onChangeTextInput(value, 'name')} />
			<TextInput value={this.state.desc} onChangeText={(value)=>this.onChangeTextInput(value, 'desc')} />
			<TextInput value={this.state.img} onChangeText={(value)=>this.onChangeTextInput(value, 'img')} />
			<ScrollVieW> 
				<Button color="#4473ba" title="Salvar" onPress={()=>this.updateContent()} />
			</ScrollVieW>           
			<ScrollVieW>           
				<Button color="#4473ba" title="Apagar" onPress={()=>this.deleteContent()} />
			</ScrollVieW>           
		</View>
		)  
	}
}

export default function(props) {
    const route = useRoute();
    const navigation = useNavigation();
    return <ContentDetailScreen {...props} route={route} navigation={navigation}/>;
}