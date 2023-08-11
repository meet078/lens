import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "ReactNavigatorProps";
import { CameraCapturedPicture } from "expo-camera";
import { ImagePickerAsset } from "expo-image-picker";
import { FC, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Platform } from "react-native/Libraries/Utilities/Platform";
export interface TextResultProps extends NativeStackScreenProps<RootStackParamList, "textResult"> { }
const TextResult: FC<TextResultProps> = ({ route: { params: { image } } }) => {
    const createFormData = (image: ImagePickerAsset | CameraCapturedPicture) => {
        const data = new FormData();
        const ext  = image.uri.substring(image.uri.lastIndexOf(".") + 1)
        console.log(ext);
        data.append('image', {
            name: image.uri,
            type: `image/${ext}`,
            uri: image.uri
        });
        return data;
    };
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState("");
    const getText = async () => {
        const responese = await fetch("http://192.168.1.53:5000", {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'multipart/form-data;'
            }),
            body: createFormData(image)
        })
        if (responese.ok) {
            setLoading(false);
            const text = await responese.text();
            setResult(text);
        }

    }
    useEffect(() => {
        getText();
    }, [])
    return (<>
        {
            loading ?
                <>
                    <Image source={{ uri: image.uri }} style={StyleSheet.absoluteFill} />
                    <View style={{flex:1, position: "absolute", zIndex: 100, backgroundColor: "#00000099", justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}}>
                        <ActivityIndicator size={"large"} />
                    </View>
                </>
                :
                <ScrollView style={{
                    padding: 10
                }}>
                    <Text selectable={true} style={{color: "white"}}>
                        {result}
                    </Text>
                </ScrollView>
        }
    </>);
}

export default TextResult;