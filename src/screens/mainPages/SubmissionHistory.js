/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { RightIcon, PageLogoSpe, PageTitle } from '../../components/styles';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getData, deleteData } from '../../helpers/fetchData-helpers';
import { SplashScreen } from '../../helpers/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SubmissionHistory = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const onDelete = (item)=>{
        deleteData('proposition/' + item.id).then(()=>{
            let index = data.findIndex((element)=>element.id = item.id)
            let dat = [...data]
            dat.splice(index, 1)
            setData(dat)
        }) 
    }
    useEffect(() => {
        AsyncStorage.getItem('credential').then((value)=>{
            value = JSON.parse(value)
            getData('producteur/' + value.producteurId +'/proposer').then((propositions)=>{
                console.log(propositions)
                setData(propositions)
                setLoading(false)
            })
        })
        
    }, []);
    if(loading){
        return <SplashScreen/>
    }
    return (
        <SafeAreaView style={styles.CardContainer}>
            <FlatList
                data={data}
                keyExtractor = {(item)=> item.id}
                ListHeaderComponent = {()=>{
                    return(
                        <View style={{alignItems:'center'}}>
                            <PageLogoSpe
                                resizeMode="cover"
                                source={require('../../assets/jumbofoodlogo.png')}
                            />
                            <PageTitle>Submission History</PageTitle>
                            <View style={styles.pagedesc}>
                                <Text style={styles.textdesc}>Here is the history of the products that you've submitted since you're a supplier.</Text>
                            </View>
                        </View>
                    )}
                }
                renderItem={({item})=>{
                    return(
                            <View style={styles.bigcontainer}>
                                <View>
                                    <Text style={styles.carddate}> {item.updatedAt} </Text>
                                    <RightIcon
                                    onPress={()=>onDelete(item)}
                                    delete={true}>
                                        <AntDesign
                                        color="red"
                                        name="delete"
                                        size={25}/>
                                        </RightIcon>
                                </View>
                                <View style={styles.Card}>
                                    <View style={{marginTop:10}}>
                                        <Text> Product Name : {item.nomProduit} </Text>
                                    </View>
                                    <View>
                                        <Text>Statut: {item.statut}</Text>
                                    </View>
                                    <View>
                                        <Text>Description : {item.description}</Text>
                                    </View>
                                    <Text>You have uploaded {item.photo.length} image(s) on this proposition</Text>
                                </View>
                            </View>
                    )
                }}
                    
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    pagedesc: {
        marginTop: 30,
        marginBottom: 40,
    },
    textdesc: {
        textAlign: 'center',
        fontSize: hp('2.5%'),
    },
    carddate: {
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
        paddingBottom: 10,
    },
    Card: {
        backgroundColor: '#EAF6F9',
        width: wp('85%'),
        borderRadius: 20,
        padding: 10,
        marginBottom: 5,

    },
    bigcontainer: {
        marginBottom: 20,
        borderWidth:0.9,
        borderRadius: 20,
        padding: 10,
    },
    forheight:{
        height: hp('100%'),
    },
});


export default SubmissionHistory;
