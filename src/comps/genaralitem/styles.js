import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
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
        marginTop:fontScale(30),
        marginLeft:fontScale(20),
        marginRight:fontScale(20),
        marginBottom:fontScale(20)

        
      },
})