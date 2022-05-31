import React from 'react';
import { View, Text, FlatList } from "react-native";
import { fontScale } from '../../utils/Fonts';
import { styles } from './styles';

const GETable = (props) => { //table of screen GrowthEnterprise
    const TableItem = (props) => {
        return (
            <View style={{ flexDirection: "row", marginTop: fontScale(5), backgroundColor: props.index % 2 == 0 ? "#EFEFEF" : "white", height: fontScale(40), alignItems: "center" }}>
                <Text style={{ flex: 1 / 4, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props.taxCode}</Text>
                <Text style={{ flex: 1 / 4, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props.enterpriseName}</Text>
                <Text style={{ flex: 1 / 4, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props.subNumber}</Text>
                <Text style={{ flex: 1 / 4, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props._package}</Text>
            </View>
        )
    }
    return (
        <View >
            <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 / 4, textAlign: "center", fontWeight: "bold", color: "#00BECC", fontSize: fontScale(18) }}>MST</Text>
                <Text style={{ flex: 1 / 4, textAlign: "center", fontWeight: "bold", color: "#00BECC", fontSize: fontScale(18) }}>Tên DN</Text>
                <Text style={{ flex: 1 / 4, textAlign: "center", fontWeight: "bold", color: "#00BECC", fontSize: fontScale(18) }}>Số TB</Text>
                <Text style={{ flex: 1 / 4, textAlign: "center", fontWeight: "bold", color: "#00BECC", fontSize: fontScale(18) }}>Gói</Text>
            </View>
            <FlatList
                data={props.data}
                style={{ marginTop: fontScale(10), marginBottom: fontScale(30) }}
                keyExtractor={(item, key) => key.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TableItem index={index} taxCode={item.taxCode} enterpriseName={item.enterpriseName} subNumber={item.subNumber} _package={item._package} />
                    )

                }}
            />
        </View>
    );
}

export default GETable;