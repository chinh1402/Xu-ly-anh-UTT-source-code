import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import wiener
from PIL import Image

# Load the image using OpenCV (ensure it is grayscale)
image_path = r'C:\Users\ndchi\OneDrive\Desktop\school files\Xu ly anh UTT\codexla_ching\brokenimgs\noisy_image.tiff'
noisy_img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)  # Use IMREAD_UNCHANGED for 16-bit TIFF
print(noisy_img)
# Check if the image is loaded correctly
if noisy_img is None:
    print(f"Failed to load image: {image_path}")
else:
    print(f"Image loaded successfully: {noisy_img.shape}, dtype: {noisy_img.dtype}")

    # Normalize the image to the range [0, 65535] if it's a 16-bit image
    img_scaled = cv2.normalize(noisy_img, dst=None, alpha=0, beta=65535, norm_type=cv2.NORM_MINMAX)

    # Apply Wiener filter (ensure the image is in the appropriate format)
    restored_img = wiener(img_scaled, (5, 5))

    # Clip and normalize the restored image back to an 8-bit range for visualization
    restored_img_normalized = np.clip(restored_img, 0, 65535).astype(np.uint16)

    # Visualize the results
    plt.subplot(1, 3, 1), plt.imshow(noisy_img, cmap='gray'), plt.title('Original Noisy Image (16-bit)')
    plt.subplot(1, 3, 2), plt.imshow(restored_img_normalized, cmap='gray'), plt.title('Restored Image (16-bit)')
    plt.show()
