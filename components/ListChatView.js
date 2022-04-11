import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Alert
} from 'react-native';

export const ListChatView = ({itemList}) => {
    return(
        <View style={{ flex: 1 }} >
            <FlatList
                data={itemList}
                keyExtractor = {(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity>
                        <View style={styles.row}>
                            {/*<Image source={{ uri: item.image }} style={styles.pic} />*/}
                            <Image style={styles.pic} source={require('../assets/camera_view.jpg')} />
                            <View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.nameTxt}>{item.description}</Text>
                                </View>
                                <View style={styles.end}>
                                    <Image style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} source={{uri:"https://img.icons8.com/small/14/000000/double-tick.png"}}/>
                                    <Text style={styles.time}>{item.date} {item.time}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#dcdcdc',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 15,
        justifyContent: 'space-between',
        borderRadius: 10,
        margin: 5
    },
    pic: {
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 15,

    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    end: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        fontWeight: '400',
        color: '#666',
        fontSize: 12,

    },
    icon:{
        height: 28,
        width: 28, 
    }
});