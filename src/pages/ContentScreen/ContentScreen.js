import React from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

class ContentScreen extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            contents: [],
            isLoading: true,
        }
    }

    render() {

        return(
            <VieW>
                <ScrollView>
                    
                    <TexT>testetestetestetesteteste</TexT>
                </ScrollView>    
                <TexT>+</TexT>
            </VieW>
        )
               
       
    }    
}    

export default function(props) {
    const navigation = useNavigation();
  
    return <ContentScreen {...props} navigation={navigation} />;
}