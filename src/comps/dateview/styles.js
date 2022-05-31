import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        borderRadius:fontScale(13),
        paddingVertical:fontScale(13),
        marginHorizontal:width/4,
        backgroundColor:colors.white
    },
    dateLabel:{
        color:"#BAB400",
        fontWeight:"bold",
        fontSize:fontScale(14)
    }
})