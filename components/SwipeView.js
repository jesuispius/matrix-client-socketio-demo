import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Image
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { 
    Text,
    VStack,
    HStack,
    Center
} from "native-base";

export default function SwipeView(props) {
    console.log("List Image")
    console.log("Result: ", props.imageMotionDetect);
    console.log("List Image")

    const [listData, setListData] = useState(props.imageMotionDetect)
    
    console.log("List Image:", JSON.stringify(listData))

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const downloadRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].downloadRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor='white'
        >
            <Center w="360" h="125" bg="white" shadow={3}>
                <HStack space={4} alignItems="center" justifyContent="center">
                    <Center h="125" w="220">
                        <Image 
                            style={styles.pic} 
                            source={{uri: data.item.image}} />
                        {/*<Image source={{ uri: item.image }} style={styles.pic} />
                        <Image style={styles.pic} source={{uri: data.item.image}} />*/}
                        {/*<Image style={styles.pic} source={require('../backend/motionDetect/CQswKUgUwNOQdtqltAJJjYuB.jpg')} />*/}
                    </Center>
                    <VStack space={4} alignItems="center">
                        <Center h="125" w="130">
                            <Text fontSize="lg" fontWeight="bold">{data.item.id}</Text>
                            <Text fontSize="sm">{data.item.image}</Text>
                        </Center>
                    </VStack>
                </HStack>
            </Center>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => downloadRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Download</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <VStack space={4} alignItems="center">
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={onRowDidOpen}
                />
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10
    },
    rowBack: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        height: 41,
        margin: 5
    },
    backRightBtnLeft: {
        backgroundColor: '#3FA3FF',
        right: 75,
        height: 41
    },
    backRightBtnRight: {
        backgroundColor: '#FF5B5B',
        right: 0,
        height: 41
    },
    pic: {
        width: 220,
        height: 125,
        borderRadius: 10
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