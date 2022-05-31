import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StatusBar, Text, View, TouchableOpacity, StyleSheet, TextInput, Keyboard, Modal, FlatList } from 'react-native';
import { Body } from '../../../../../../comps';
import { colors } from '../../../../../../utils/Colors';
import { width } from '../../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../../utils/Fonts';
import { images } from '../../../../../../utils/Images';
const Seacrh = (props) => {
    const navigation = useNavigation();
    const [text, setText] = useState('')
    const [show, setShow] = useState(false)
    const [placeholder, setPlaceholder] = useState("Tất cả")
    const data = [
        { id: "", name: "Tất cả" },
        { id: "new", name: "Mới" },
        { id: "cancel", name: "Hủy" },
    ]
    useEffect(() => {

    })
    return (
        <>
            {
                props.searchText == true ?
                    <View style={[{ width: props.width }, { width: width - fontScale(100), height: fontScale(40), marginBottom: fontScale(20) }, styles.view]}>
                        <Image source={images.qualitysub} style={styles.qualitysub} resizeMode="contain" />
                        <TextInput placeholder="Nhập STB" style={styles.textInput} value={text} onChangeText={(text) => { setText(text) }}></TextInput>
                        <TouchableOpacity style={{ flex: 1 / 10 }}
                            onPress={() => {
                                props.search(text)
                                Keyboard.dismiss()
                            }}>
                            <Image source={images.search} style={styles.search} />
                        </TouchableOpacity>

                    </View>
                    :
                    <TouchableOpacity style={[{ width: props.width }, { width: width - fontScale(100), height: fontScale(40) }, styles.view]}
                            onPress={()=>{
                                setShow(true)
                                
                            }}
                    >
                        <Image source={images.check} style={styles.check} resizeMode="contain" />
                        <Text style={styles.textInput} >{placeholder}</Text>
                        <Image source={images.arrowdown} style={[styles.search, { flex: 1 / 10 }]} />
                    </TouchableOpacity>


            }
            <Modal
                visible={show}
                animationType="slide"
                transparent={true}
            >
                <TouchableOpacity style={{ flex: 1 / 2 }} 
                onPress={() => { 
                    setShow(!show)
                   
                }}
                ></TouchableOpacity>
                <View style={{ flex: 1 / 2 }}>
                    <Body />
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <Text style={{ textAlign: "center", marginBottom: fontScale(20) }}>Vui lòng chọn</Text>
                        <FlatList
                            data={data}
                            style={{ marginTop: fontScale(10), marginBottom: fontScale(30) }}
                            keyExtractor={(item, key) => key.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setPlaceholder(item.name)
                                            props.searchSelect(item.id)
                                            setShow(!show)
                                        }}
                                    >
                                        <Text style={{ textAlign: "center", backgroundColor: index % 2 != 0 ? "white" : "#F5F5F5", width: width, alignSelf: "center", fontSize: fontScale(25), marginTop: fontScale(10) }}

                                        >{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default Seacrh;

const styles = StyleSheet.create({
    view: { flexDirection: "row", backgroundColor: "#fff", borderRadius: fontScale(8), padding: fontScale(10), alignSelf: "center", },
    search: { width: fontScale(20), height: fontScale(20), alignSelf: "center", resizeMode: "contain", tintColor: "#515655" },
    qualitysub: { flex: 1 / 10, width: fontScale(50), height: fontScale(50), alignSelf: "center" },
    textInput: { flex: 8 / 10, color: "#B7B7B7", alignSelf: "center", textAlign: "center" },

    check: { flex: 1 / 10, width: fontScale(20), height: fontScale(20), alignSelf: "center" },


})