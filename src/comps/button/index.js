import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const Button = (props) => {
    const {
        wIcon,
        icon,
        label,
        width,
        center,
        style,
        color,
        onPress
    } = props;
    return (
        wIcon ?
            <TouchableOpacity
                onPress={onPress}
                disabled={props.disabled == true ? true : false}
                style={[
                    styles.button,
                    style,
                    { backgroundColor: color, flexDirection: "row" }
                ]}>
                <Image source={icon} resizeMode="cover" style={styles.icon} />
                <Text style={[styles.text,{}]}>{label}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.container, { width: width, alignSelf: center ? "center" : "auto" }, style]} onPress={onPress}>
                <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>
    );
}

export default Button;