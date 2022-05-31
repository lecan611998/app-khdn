import React from 'react';
import { SafeAreaView, StatusBar,View } from 'react-native';
import { Body, Header, MenuItem } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { useNavigation } from '@react-navigation/core';
import { styles } from './stytes';
const KPICurrentMonthDashboard = (props) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={colors.primary} />
            <Header title="KPI tháng hiện tại" />
            <Body style={{ marginTop: fontScale(26) }} showInfo={false} />
            <View style={styles.body}>
                <MenuItem style={{ marginTop: fontScale(25) }} title="Top AM" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.topam} width={width - fontScale(60)} onPress={() => navigation.navigate("TopAM")} />
                <MenuItem style={{ marginTop: fontScale(30) }} title="Nhóm KPI" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.groupkpi} width={width - fontScale(60)} onPress={() => navigation.navigate("GroupKPI")} />
                <MenuItem style={{ marginTop: fontScale(30) }} title="Tập danh sách giao" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.qualitysub} width={width - fontScale(60)} onPress={() => navigation.navigate("DeliveryListDashboard")} />
                <MenuItem style={{ marginTop: fontScale(30) }} title="Năng suất bình quân" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.productivitysub} width={width - fontScale(60)} onPress={() => navigation.navigate("ProductivitySubAdmin")} />
            </View>
        </SafeAreaView>
    );
}

export default KPICurrentMonthDashboard;