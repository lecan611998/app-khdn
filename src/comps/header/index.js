import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/core';
import { _retrieveData } from '../../utils/Storage';
import { images } from '../../utils/Images';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../utils/Colors';
import Toast from 'react-native-toast-message';

const Header = (props) => {
    const { title } = props;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {
                props.profile
                    ?
                    <View style={{ flexDirection: "row" }}>
                        {
                            props.loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : <Image source={props.avatar} style={styles.avatar} />
                        }
                        <View style={styles.uInfoContent}>
                            <Text style={styles.uInfo}>{props.fullName}</Text>
                            <Text style={styles.uStaff}>{props.maGDV}</Text>
                        </View>
                    </View>
                    :
                    <View style={styles.headNotProfile}>
                        {
                            props.showBack == false
                                ?
                                <View style={styles.backIcon} />
                                :
                                <TouchableOpacity style={styles.backIcon} onPress={() => {
                                    navigation.goBack()
                                    // Toast.hide();
                                }}
                                >
                                    <Image source={images.back} style={styles.backIconImg} />
                                </TouchableOpacity>
                        }
                        <Text style={styles.title}>{title}</Text>
                    </View>
            }
        </View>
    );
}

export default Header;