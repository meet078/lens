import { FC, RefObject, useEffect, useRef, useState } from "react";
import BottomBar from "./camera/BottomBar";
import { Linking, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import TopBar from "./camera/TopBar";
import { AutoFocus, Camera, CameraType, FlashMode, ImageType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../ReactNavigatorProps";
export interface CameraProps extends NativeStackScreenProps<RootStackParamList, "home"> {

}

const CameraView: FC<CameraProps> = ({ navigation }) => {
    let camera: Camera;

    async function permisionFunction() {
        const result = await Camera.requestCameraPermissionsAsync();
        if (!result.granted) {
            console.log(result);
            alert("need access to camera for this app to work");
            Linking.openSettings();
        }
    }
    const takePicture = () => {
        const res = camera.takePictureAsync({
            base64: true,
            exif: false,
            quality: 1
        });
        res.then(value => {
            navigation.navigate("imageView", { image: value });
        })
    }
    useEffect(() => {
        permisionFunction();
    }, [])
    function toggleCameraType() {
        setCameraSide(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    const [cameraSide, setCameraSide] = useState(CameraType.back);
    const [flash, setFlash] = useState(false);
    const [hide, setHide] = useState(false);
    const isFocused = useIsFocused();
    const {height, width} = useWindowDimensions();
    const SnapShotButton = (
        <View
            style={{
                height: 70,
                width: 70,
                position: 'absolute',
                bottom: 10,
                zIndex: 1,
                left: '50%',
                transform: [{ translateX: -35 }],
            }}>
            <TouchableOpacity activeOpacity={0.5} onPress={takePicture}>
                <View
                    style={{
                        height: 70,
                        width: 70,
                        backgroundColor: 'white',
                        borderRadius: 100,
                        borderColor: 'gray',
                        borderWidth: 5,
                    }}
                />
            </TouchableOpacity>
        </View>
    )
    return (
        <View style={[StyleSheet.absoluteFill]}>
            <View style={{ position: "absolute", zIndex: 1, justifyContent: "space-between", height: "100%", width: "100%" }} onTouchStart={() => setHide(!hide)}>
                <TopBar hide={hide} action={[
                    {
                        icon: {
                            value: cameraSide ? "camera_rear" : "camera_front"
                        },
                        onPress: toggleCameraType
                    },
                    {
                        icon: {
                            value: flash ? "flash_on" : "flash_off"
                        },
                        onPress: () => setFlash(!flash)
                    },
                ]} />
                {SnapShotButton}
                <BottomBar hide={hide} navigation={navigation} />
            </View>
            {
                isFocused &&
                <Camera
                    ref={(ref) => {
                        camera=ref
                    }}
                    type={cameraSide}
                    focusable={true}
                    flashMode={flash ? FlashMode.on : FlashMode.off}
                    accessible={true}
                    autoFocus={AutoFocus.on}
                    useCamera2Api={true}
                    style={{flex: 1}}
                />
            }
        </View>
    );
}

export default CameraView;