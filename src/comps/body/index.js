import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { User } from '../../models/Data';
import { colors } from '../../utils/Colors';
import { fontScale } from '../../utils/Fonts';
import { _retrieveData } from '../../utils/Storage';
import { styles } from './style';

const index = (props) => {
    return (
        <View style={props.style}>
            {
                props.showInfo == false ? null : <Text style={styles.userInfo}>{props.displayName ? props.displayName + '(' + props.maGDV + ')' : null}</Text>
            }
            <View style={{ marginTop: fontScale(6.5), backgroundColor: "#fff", height: fontScale(50), borderTopLeftRadius: fontScale(50), borderTopRightRadius: fontScale(50) }} >
                {
                    props.children
                }
            </View>

        </View>
    );
}

export default index;