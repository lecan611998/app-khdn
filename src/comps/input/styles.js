import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    title:{
        color:'#EAEEEE',
        opacity:0.78,
        fontSize:fontScale(18),
        fontWeight:"bold"
    },
    container:{
        color: colors.white,
        paddingTop: fontScale(10), 
        height:fontScale(40),
        borderBottomColor: '#EAEEEE', 
        borderBottomWidth: fontScale(1)
    }
})