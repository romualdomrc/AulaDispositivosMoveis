import React from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { Fab, TexT, VieW } from "../../styles/styles"
import ContentItem from '../../components/ContentItem'
import { useNavigation } from '@react-navigation/native'
import * as ContentScreenService from './ContentScreenService'

class ContentScreen extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            contents: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('focus', ()=>{
            this.contentUpdatePage();
        })
        this.contentUpdatePage()
    }

    contentUpdatePage(){
        console.log('contentUpdate');
        let contents = [];
        ContentScreenService.findContentList()
        .then((data) => {
            contents = data && (data.list || []) 
            database = data && (data.database || {}) 
            this.setState({
              contents,
              isLoading: false,
            });
        }).catch((err) => {
            console.log(err);
            this.setState = {
              isLoading: false
            }
        })
    }

    renderActivityIndicator(){
       if(this.state.isLoading){
        return(
            <VieW>
                <ActivityIndicator size="large"/>
            </VieW>
        )
       }     
    }

    render() {

        this.renderActivityIndicator()
     
        const { contents } = this.state; 
        const { navigation } = this.props;

        const items = contents ? contents.map((content, index) =>
                <ContentItem name={content.name}
                    desc={content.desc}
                    img={content.img}
                    id={content.id}
                    key={index}
                    onPress={()=>navigation.navigate('ContentDetailScreen',
                    ({ id: content.id , desc: content.desc, name: content.name, img: content.img, database: database})
                    
                    )}/>
            ) : []

        return(
            <VieW>
                <ScrollView>
                    {items}
                </ScrollView>    
                <Fab onPress={()=>{navigation.navigate('SecondScreen',
                ({ database: database })
                )}}><TexT>+</TexT></Fab>                
            </VieW>
        )
               
       
    }    
}    

export default function(props) {
    const navigation = useNavigation();
  
    return <ContentScreen {...props} navigation={navigation} />;
}