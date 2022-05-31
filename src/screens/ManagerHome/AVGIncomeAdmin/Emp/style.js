import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors } from "../../../../utils/Colors";
import { fontScale } from "../../../../utils/Fonts";


export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary
    },
    dateContainer: {
        flexDirection: "row"
    },

    notification: {
        color: colors.white,
        alignSelf: "center",
        marginTop: fontScale(29),
        fontSize: fontScale(14)
    }
})