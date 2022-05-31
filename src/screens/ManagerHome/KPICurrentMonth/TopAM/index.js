import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StatusBar, View, FlatList, TouchableOpacity } from 'react-native';
import { Body, DatePicker, Header, Loading, TopAmItem } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { styles } from './stytes';
import { showToast } from '../../../../utils/toast';
import { check403 } from '../../../../api/emp';
import { getTopAm } from '../../../../api/manager';
import SearchTopAm from '../../../../comps/searchTopAm';
import { _retrieveData } from '../../../../utils/Storage';

const TopAM = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState([]);
    // const [branchCode, setBranchCode] = useState('');
    // const [shopCode, setShopCode] = useState('');
    // const [sort, setSort] = useState(0);

    const getData = async (branchCode, month, shopCode, sort) => {
        setLoading(true)
        let res = await getTopAm(branchCode, month, shopCode, sort)
        if (res.status == "success") {
            // showToast("success", "Thành công", "Lấy dữ liệu thành công")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    setData(res.data.data)
                    // console.log(res.data.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                    showToast("info", "Thông báo", "Không có dữ liệu")
                }
            } else {
                setLoading(false)
                showToast("info", "Thông báo", "Không có dữ liệu")
            }
        } else {
            setLoading(false)
            showToast("error", "Lỗi hệ thống", res.message)
            check403(res.error, navigation)
        }
    }
    const modalCallBack = (sort, branch, shopcode) => {
        getData(branch, month, shopcode, sort)
    }
    const onChangeDatePicker = (date) => {
        setData([])
        setMonth(date)
        getData('', date, '', "desc")
        // _storeData("month", date)
    }
    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getData('', month, '', "desc")
            setLoginInfo(await _retrieveData("loginInfo"))
        })
    })
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent={true} backgroundColor={colors.primary} />
            <Header title="TopAM" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(140)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <View style={{ alignSelf: "center", marginTop: 20 }}>
                <SearchTopAm search={modalCallBack} loginInfo={loginInfo}/>
            </View>
            <Body style={{ marginTop: fontScale(20) }} showInfo={false} />
            <View style={styles.body}>
                {
                    data.length == 0 && loading == false ?
                        <Text style={{ textAlign: "center" }}>Không có dữ liệu</Text>
                        :
                        <View >
                            {
                                loading == true ? null :
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ flex: 1 / 10, textAlign: "center", color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17) }}>STT</Text>
                                        <Text style={{ flex: 3 / 10, textAlign: "center", color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17) }}>Khối</Text>
                                        <Text style={{ flex: 2 / 10, textAlign: "center", color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17) }}>Mã NV</Text>
                                        <Text style={{ flex: 3 / 10, textAlign: "center", color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17) }}>Tên</Text>
                                        <Text style={{ flex: 1 / 10, textAlign: "center", color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17) }}>KPI</Text>
                                    </View>
                            }

                            <FlatList
                                data={data}
                                style={{ marginTop: fontScale(10), marginBottom: fontScale(30) }}
                                keyExtractor={(item, key) => key.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TopAmItem stt={index} leader={item.leader} empCode={item.empCode} empName={item.empName} kpi={item.kpi} color={item.color} search={modalCallBack} />
                                    )

                                }}
                            />

                        </View>
                }

            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default TopAM;