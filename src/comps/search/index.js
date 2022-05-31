import React from 'react';
import { Image, TextInput, View } from 'react-native';
import { fontScale } from '../../utils/Fonts';
import { styles } from './style';

const index = (props) => {
    return (
        <View style={[{ flexDirection: 'row',borderRadius:fontScale(20),marginTop:fontScale(10), width: props.width, paddingVertical: fontScale(2), alignSelf: "center", backgroundColor: "white" }, props.style, styles.homeSearch]}>
            <Image resizeMode="contain" source={props.leftIcon} style={styles.leftIco} />
            <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                <TextInput style={{ fontSize: fontScale(13) }} placeholder={props.placeholder} textAlign="center" keyboardType={props.keyboardType} onChangeText={props.onChangeText} />
            </View>
            <View style={{ justifyContent: "center" }}>
                <Image resizeMode="contain" source={props.rightIcon} style={styles.rightIco} />
            </View>
        </View>
    );
}

export default index;