import { StyleSheet } from "react-native";
import { fontScale } from "../../../../utils/Fonts";
import { colors } from "../../../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    body: {
        flex:1,
        backgroundColor:colors.white
    },
    bg: {
        backgroundColor: colors.white,
        borderRadius: fontScale(15),
        paddingTop: -fontScale(9),
        minHeight: fontScale(30),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal:20
      },
})