import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../ReactNavigatorProps";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import IconButton from "./custom/IconButton";
export interface ImageViewProps extends NativeStackScreenProps<RootStackParamList, "imageView"> { }
const ImageView: FC<ImageViewProps> = ({ navigation, route: { params: { image } } }) => {
    return (
        <>
            <Image source={{ uri: image.uri}} style={{width: "100%", height: "100%", resizeMode: "contain"}} />
            <View style={{width: "100%", flexDirection: "row", justifyContent: "space-around", backgroundColor: "#00000099", position: 'absolute', bottom: 0}}>
                <IconButton icon={{ value: "cancel", size: 50 }} onPress={() => navigation.goBack()} />
                <IconButton icon={{ value: "check_circle", size: 50 }} onPress={() => navigation.replace("textResult", {image})} />
            </View>
        </>
    );
}

export default ImageView;