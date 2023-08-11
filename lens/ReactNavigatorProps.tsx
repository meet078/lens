import { CameraCapturedPicture } from "expo-camera";
import { ImagePickerAsset } from "expo-image-picker";

export type RootStackParamList = {
    home: undefined
    imageView: {
        image: CameraCapturedPicture | ImagePickerAsset,
    }
    textResult:{
        image: CameraCapturedPicture | ImagePickerAsset,
    }
};