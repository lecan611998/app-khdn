import React from 'react';
import { View, Image, Text } from 'react-native';
import { fontScale } from '../../utils/Fonts';
import { styles } from './styles';

const ListItemDE = (props) => {
    const { title, icon, price, jusTitle, isFather, isChild } = props;
    return (
        <View style={styles.container}>
            {
                props.main ? <>
                    <View style={styles.titleContain}>
                        <Text style={styles.mainTitle}  > {title}</Text>
                    </View>
                    {
                        jusTitle ? null :
                            <View style={styles.price}>
                                <Text style={[styles.price, { color: "#00BECC", fontSize: fontScale(18), fontWeight: "bold" }]}>{price}</Text>
                            </View>
                    }
                </> : <>
                    <View style={[styles.titleContain, props.style, { flex: 4 / 5 }]}>
                        <Image source={icon} resizeMode="contain" style={[styles.icon, props.iconStyle]} />
                        <Text style={styles.title, {
                            color: isFather == true ? "#3E3E3E" : isChild == true ? "#9E9898" : "#818080",
                            fontSize: isChild == true ? fontScale(16) : isChild == true ? fontScale(19) : fontScale(17),
                        }}>{title}</Text>
                    </View>
                    {
                        jusTitle ? null :
                            <Text style={[styles.price, { flex: 1 / 5 }]}>{price}</Text>
                    }
                </>
            }
        </View>
    );
}

export default ListItemDE;