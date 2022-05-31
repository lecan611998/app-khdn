import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { Body } from '..';
import { width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import { styles } from './stytes';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Button from '../button'
import { getListBranch, getListLeader } from '../../api/manager';
const SearchTopAm = (props) => {
    const [searchMd, setSearchMd] = useState(false)
    const [showMdItem, setShowMdItem] = useState(false)
    const [showMdItem2, setShowMdItem2] = useState(false)
    const [branch, setBranch] = useState([])
    const [leader, setLeader] = useState([])
    const [branchList, setBranchList] = useState([])
    const [leaderList, setLeaderList] = useState([])
    const radio_props = [
        { label: 'Cao tới thấp', value: "desc" },
        { label: 'Thấp tới cao', value: "asc" },
    ];
    const [sort, setSort] = useState("desc");
    const getBranchList = async () => {
        const res = await getListBranch()
        setBranchList(res.data)
    }
    const getLeaderList = async (shopCode) => {
        const res = await getListLeader(shopCode)
        setLeaderList(res.data)
    }
    useEffect(() => {
        getBranchList()
        {
            props.loginInfo.shopCode != '' ?
                getLeaderList(props.loginInfo.shopCode) : null
        }
    }, [])
    return (
        <>
            <TouchableOpacity style={[{ width: props.width }, { width: width - fontScale(100), height: fontScale(40) }, styles.selectContainer]}
                onPress={() => { setSearchMd(true) }}
            >
                <Image source={images.teamwork} style={{ flex: 1 / 10, width: fontScale(30), height: fontScale(30), alignSelf: "center" }} resizeMode="contain" />
                <Text style={{ flex: 8 / 10, color: "#B7B7B7", alignSelf: "center", textAlign: "center" }}>Tìm kiếm</Text>
                <Image source={images.arrowdown} resizeMode="cover" style={styles.arrowDown} />
            </TouchableOpacity>
            <Modal
                visible={searchMd}
                animationType="slide"
                transparent={true}
            >
                <TouchableOpacity style={{ flex: 1 / 2 }} onPress={() => { setSearchMd(false) }}></TouchableOpacity>
                <View style={{ flex: 1 / 2 }}>
                    <Body />
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <Text style={{ textAlign: "center" }}>Vui lòng chọn</Text>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: fontScale(20) }}>
                            <RadioForm
                                formHorizontal={true}
                                animation={true}
                            >
                                {
                                    radio_props.map((obj, i) => (
                                        <RadioButton key={i} >
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={sort === obj.value}
                                                onPress={() => {
                                                    setSort(obj.value)
                                                    // console.log(obj)
                                                }}
                                                buttonWrapStyle={{ marginLeft: fontScale(50) }}
                                                buttonSize={fontScale(19)}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={() => { setSort(obj.value) }}
                                                labelStyle={{ fontSize: fontScale(17), color: '#707070', marginRight: fontScale(50) }}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>

                                    ))
                                }
                            </RadioForm>
                        </View>

                        <TouchableOpacity
                            style={[styles.bg]}
                            disabled={props.loginInfo.roleType == "ROLE_COMPANY" ? false : true}
                            onPress={() => { setShowMdItem(!showMdItem); setSearchMd(!searchMd) }}
                        >
                            <Text style={{ flex: 1 / 2, textAlign: "center", fontWeight: "bold", fontSize: fontScale(18) }}>Chọn chi nhánh</Text>
                            <Text style={{ flex: 1 / 2, textAlign: "center", fontSize: fontScale(16) }}>
                                {
                                    (props.loginInfo.roleType == "ROLE_COMPANY" ? (branch.shop_name == undefined ? "Tất cả" : branch.shop_name) :

                                        branchList[0]?.shop_name)
                                }
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bg]}
                            disabled={props.loginInfo.roleType == "ROLE_LEADER" ? true : false}
                            onPress={() => { setShowMdItem2(!showMdItem2); setSearchMd(!searchMd) }}
                        >
                            <Text style={{ flex: 1 / 2, textAlign: "center", fontWeight: "bold", fontSize: fontScale(18) }}>Chọn Khối</Text>
                            <Text style={{ flex: 1 / 2, textAlign: "center", fontSize: fontScale(16) }}>
                                {
                                    (props.loginInfo.roleType == "ROLE_LEADER" ? leaderList[0]?.shop_name :
                                        (leader.shop_name == undefined ? "Tất cả" : leader.shop_name))
                                }

                            </Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", marginTop: fontScale(20), marginBottom: fontScale(20), justifyContent: "center" }}>
                            <Button wIcon style={{}} label="Hủy" color="red" icon={images.closeline} onPress={() => setSearchMd(!searchMd)} />
                            <Button wIcon style={{}} label="Tìm kiếm" color="#32A2FC" icon={images.sendline} onPress={() => {
                                props.search(sort, branch.shop_code == undefined ? "" : branch.shop_code, leader.shop_code == undefined ? "" : leader.shop_code)
                                setSearchMd(!searchMd)
                            }} />
                        </View>

                    </View>
                </View>
            </Modal>
            <Modal
                visible={showMdItem}
                animationType="slide"
                transparent={true}
            >
                <TouchableOpacity style={{ flex: 1 / 2 }} onPress={() => { setShowMdItem(!showMdItem); setSearchMd(!searchMd) }}></TouchableOpacity>
                <View style={{ flex: 1 / 2 }}>
                    <Body />
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <Text style={{ textAlign: "center", marginBottom: fontScale(20) }}>Vui lòng chọn</Text>
                        <FlatList
                            data={branchList}
                            style={{ marginTop: fontScale(10), marginBottom: fontScale(30) }}
                            keyExtractor={(item, key) => key.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBranch(item)
                                            setLeader([])
                                            getLeaderList(item.shop_code)
                                            setShowMdItem(!showMdItem)
                                        }}
                                    >
                                        <Text style={{ textAlign: "center", backgroundColor: index % 2 != 0 ? "white" : "#F5F5F5", width: width, alignSelf: "center", fontSize: fontScale(20), marginTop: fontScale(10) }}

                                        >{item.shop_name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                visible={showMdItem2}
                animationType="slide"
                transparent={true}
            >
                <TouchableOpacity style={{ flex: 1 / 2 }} onPress={() => { setShowMdItem2(!showMdItem2); setSearchMd(!searchMd) }}></TouchableOpacity>
                <View style={{ flex: 1 / 2 }}>
                    <Body />
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <Text style={{ textAlign: "center", marginBottom: fontScale(20) }}>Vui lòng chọn chi nhánh</Text>
                        <FlatList
                            data={leaderList}
                            style={{ marginTop: fontScale(10), marginBottom: fontScale(30) }}
                            keyExtractor={(item, key) => key.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setLeader(item)
                                            setShowMdItem2(!showMdItem2)
                                        }}
                                    >
                                        <Text style={{ textAlign: "center", backgroundColor: index % 2 != 0 ? "white" : "#F5F5F5", width: width, alignSelf: "center", fontSize: fontScale(20), marginTop: fontScale(10) }}

                                        >{item.shop_name}</Text>
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
export default SearchTopAm;