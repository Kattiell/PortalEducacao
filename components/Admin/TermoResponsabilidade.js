import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import RedirectButton from "../layout-components/RedirectButton";
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { TouchableOpacityBase } from "react-native";


export default function TermoResponsabilidade() {

    useEffect(() => {
        if (route.params) {
            route.params.nomeDoResponsavel ? setNomeResponsavel(route.params.nomeDoResponsavel) : () => { };
            route.params.cpfResponsavel ? setCpfResponsavel(route.params.cpfResponsavel) : () => { };
            route.params.nomeAluno ? setNomeAluno(route.params.nomeAluno) : () => { };
        }
    });

    useEffect(() => {

    }, [agree]);


    const [agree, setAgree ] = useState(false);
    const [nomeAluno, setNomeAluno] = useState();
    const [nomeResponsavel, setNomeResponsavel] = useState();
    const [cpfResponsavel, setCpfResponsavel] = useState();
    const navigation = useNavigation();
    const route = useRoute();

    function handleSelect() {
        agree ? setAgree(false) : setAgree(true)
    }


    return <View style={styles.container}>

        <View style={styles.modal}>
            <Icon
                containerStyle={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 30 }}
                name="arrow-back"
                type="material"
                size={40}
                color='#B088F7'
                onPress={() => {
                    navigation.goBack();
                }}
            ></Icon>

            <Text style={styles.mainText}>Eu, <Text style={styles.specialText}>{nomeResponsavel}</Text>, inscrito(a) no CPF: <Text style={styles.specialText}>{cpfResponsavel}</Text>, responsável legal pelo(a) estudante <Text style={styles.specialText}>{nomeAluno}</Text> autorizo o uso de seus dados pessoais para fins de cadastro e utiização no aplicativo "Portal Educação". Estou ciente da possibilidade de revogação dessa autorização e de total exclusão dos dados registrados pelo aplicativo a qualquer momento através de comunicação expressa pelo email <Text style={styles.specialText}>ProjetEduca5Pi@gmail.com</Text>.
            </Text>

            <View style={styles.context}>
                <TouchableOpacity style={styles.boxSelect} onPress={()=>handleSelect()}>
                    {
                        agree ?
                            <Icon
                                containerStyle={{ alignSelf: 'flex-start', marginLeft: 0, flexDirection: 'row' }}
                                name="check"
                                type="material"
                                size={25}
                                color='#B088F7'
                            >
                            </Icon>
                            : () => { }
                    }

                </TouchableOpacity>
                <Text style={styles.textAgree}>Estou de acordo com as informações acima e desejo prosseguir.</Text>
           </View>
            
           {
                agree && <Text onPress={() => { navigation.navigate('Cadastrar Aluno', { agree: true }) }} style={styles.textoBotao}>Finalizar Cadastro</Text>
           }
                    

        </View>
    </View>

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(240, 232, 245, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemList: {
        padding: 10,
        fontSize: 22,
        marginLeft: 25,
        marginRight: 25,
        borderBottomWidth: 0.8,
        borderColor: '#D6D6D6',
    },
    modal: {
        backgroundColor: 'white',
        width: 380,
        height: 550,
        alignItems:'center',
        justifyContent:'flex-start',
    },
    mainText: {
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 10,
        color: '#000000',
        fontWeight: '900',
        fontSize: 19,
        textAlign: 'justify'
    },
    specialText: {
        color: '#B088F7',
        fontSize: 18,
        fontWeight: '900',
        textDecorationLine: 'underline',
    },
    boxSelect: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginTop: 30,
        backgroundColor: 'rgba(240, 232, 245, 0.8)',
        width: 30,
        height: 30,
        borderColor: "#A0A0A0",
        borderWidth: 2,
    },
    textAgree: {
        marginTop: 23,
        marginBottom: 10,
        fontSize: 17,
        flexDirection: 'row',
    },
    context: {
        flexDirection: 'row',
        padding: 2,
        padding:25,
    },
    textoBotao: {
        position:'relative',
        bottom:5,
        fontWeight: '900',
        color: "#ffffff",
        fontSize: 20,
        backgroundColor: '#B38DF7',
        width: 200,
        height: 40,
        borderRadius: 6,
        marginTop:20,
        textAlign:'center',
        textAlignVertical:'center',
    }
});

