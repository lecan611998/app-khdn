import React, { useState } from 'react';
import { SafeAreaView, Text, StatusBar, View } from 'react-native';
import { Body, DatePicker, Header, MenuItem } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import { fontScale } from '../../../../../utils/Fonts';
import { width } from '../../../../../utils/Dimenssion';
import { styles } from './stytes';
import { images } from '../../../../../utils/Images';

const DeliveryListDashboard = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const onChangeDatePicker = (date) => {
        setMonth(date)

    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={colors.primary} />
            <Header title="Tập danh sách giao" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(140)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body style={{ marginTop: fontScale(26) }} showInfo={false} />
            <View style={styles.body}>
                <MenuItem style={{ marginTop: fontScale(25) }} title="Doanh nghiệp giao" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.deliveenterpriseamount} width={width - fontScale(60)} onPress={() => navigation.navigate("DeliveEnterprise")} />
                <MenuItem style={{ marginTop: fontScale(30) }} title="Thuê bao theo doanh nghiệp" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.qualitysub} width={width - fontScale(60)} onPress={() => navigation.navigate("SubsByEnterprise")} />
                <MenuItem style={{ marginTop: fontScale(30) }} title="Doanh thu theo doanh nghiệp" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.KAMPT} width={width - fontScale(60)} onPress={() => navigation.navigate("RevenueByEnterprise")} />
            </View>
        </SafeAreaView>
    );
}

export default DeliveryListDashboard;