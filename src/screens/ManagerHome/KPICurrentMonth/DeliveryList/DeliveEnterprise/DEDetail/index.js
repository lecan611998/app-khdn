import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StatusBar, View, FlatList } from 'react-native';
import { check403 } from '../../../../../../api/emp';
import { getListDetailDE } from '../../../../../../api/manager';
import { Body, Header, Loading } from '../../../../../../comps';
import { colors } from '../../../../../../utils/Colors';
import { fontScale } from '../../../../../../utils/Fonts';
import { _retrieveData } from '../../../../../../utils/Storage';
import { showToast } from '../../../../../../utils/toast';
import { styles } from './stytes';
import Toast from 'react-native-toast-message';
import DEDetailItem from './DEDetailItem';
import Search from './search';
import { findByText } from '../../../../../../utils/Logistics';

const DeliveEnterpriseDetail = (props) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [dataSave, setDataSave] = useState([]);
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState('');
    const [text, setText] = useState('');
    const [status, setStatus] = useState('');
    const getData = async () => {
        setLoading(true)
        let code = await _retrieveData("code")
        let month = await _retrieveData("monthDetail")
        setMonth(month)
        let res = await getListDetailDE(month, code)
        if (res.status == "success") {
            // showToast("success", "Thành công", "Lấy dữ liệu thành công")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    setData(res.data.data)
                    setDataSave(res.data.data)
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

    const searchText = async (text) => {
        setText(text)
        if (status == "") {
            let result = findByText(text, dataSave, "taxCode")
            setData(result)
        } else {
            let arr = await findByText(status, dataSave, "status")
            let result = await findByText(text, arr, "taxCode")
            setData(result)
        }
    }
    const searchSelect = async (status) => {
        setStatus(status)
        if (text == "") {
            let result = findByText(status, dataSave, "status")
            setData(result)
        } else {
            let arr = await findByText(text, dataSave, "taxCode")
            let result = findByText(status, arr, "status")
            setData(result)
        }

    }
    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getData()
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent={true} backgroundColor={colors.primary} />
            <Header title="Chi tiết biến động doanh nghiệp" />
            <Search search={searchText} searchText={true} />
            <Search searchSelect={searchSelect} searchText={false} />
            <Body />
            <View style={styles.body}>
                <View style={{ marginBottom: fontScale(20), flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ fontSize: fontScale(18) }}>Chi tiết biến động doanh nghiệp </Text>
                    <Text style={{ fontSize: fontScale(18), color: "#AB8100" }}>{month}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 2 / 9, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(16), textAlign: "center" }}>Mã NV </Text>
                    <Text style={{ flex: 3 / 9, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(16), textAlign: "center" }}>Tên NV </Text>
                    <Text style={{ flex: 2 / 9, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(16), textAlign: "center" }}>MST</Text>
                    <Text style={{ flex: 2 / 9, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(16), textAlign: "center" }}>Trạng thái</Text>
                </View>
                <FlatList
                    data={data}
                    style={{ marginTop: fontScale(10) }}
                    keyExtractor={(item, key) => key.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <DEDetailItem empCode={item.empCode} empName={item.empName} taxCode={item.taxCode} status={item.status} index={index} />
                        )

                    }}
                />
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default DeliveEnterpriseDetail;