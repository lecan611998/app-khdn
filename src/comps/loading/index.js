import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from '../../utils/Colors';
import { _retrieveData } from '../../utils/Storage';
import { styles } from './style';

const Loading = (props) => {
    return (
        <View style={props.loading == true ? styles.loading : ''}>
            {
                props.loading == true ?
                    <ActivityIndicator size="large" color={colors.grey} />
                    : null
            }
        </View>
    );
}
export default Loading;