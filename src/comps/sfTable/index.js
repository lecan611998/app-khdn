import React from 'react';
import { View, Text, FlatList } from "react-native";
import { fontScale } from '../../utils/Fonts';
import { styles } from './styles';

const SFTable = (props) => { //table of screen SubFluct
    const TableItem = (props) => {
        return (
            <View style={{ flexDirection: "row", marginBottom: fontScale(10), backgroundColor: props.index % 2 == 0 ? "#EFEFEF" : "white", height: fontScale(40), alignItems: "center" }}>
                <Text style={{ flex: 1 / 3, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props.subNumber}</Text>
                <Text style={{ flex: 1 / 3, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props.date }</Text>
                <Text style={{ flex: 1 / 3, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props.type}</Text>
            </View>
        )
    }
    return (
        <View style={{marginBottom:fontScale(30)}}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 / 3, textAlign: "center", fontWeight: "bold", color: "#00BECC", fontSize: fontScale(18) }}>Số TB</Text>
                <Text style={{ flex: 1 / 3, textAlign: "center", fontWeight: "bold", color: "#00BECC", fontSize: fontScale(18) }}>Ngày TH</Text>
                <Text style={{ flex: 1 / 3, textAlign: "center", fontWeight: "bold", color: "#00BECC", fontSize: fontScale(18) }}>Loại CB</Text>
            </View>
            <FlatList
                data={props.data}
                style={{marginTop:fontScale(10)}}
                keyExtractor={(item, key) => key.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TableItem index={index} subNumber={item.subNumber} date={item.date} type={item.type} />
                    )

                }}
            />
        </View>
    );
}

export default SFTable;