from PIL import Image
import pytesseract
def getText(imageLoc: str) -> str:
    text = pytesseract.image_to_string(Image.open(imageLoc))
    return text 