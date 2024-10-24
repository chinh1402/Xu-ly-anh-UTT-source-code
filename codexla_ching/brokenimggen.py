import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import wiener

# Load the image and convert to grayscale
img = cv2.imread('codexla_ching/6.jpg', cv2.IMREAD_GRAYSCALE)

# Add Gaussian noise
mean = 0
std_dev = 10  # Standard deviation controls the noise intensity
gaussian_noise = np.random.normal(mean, std_dev, img.shape)  # Generate Gaussian noise
noisy_img = img + gaussian_noise  # Add the noise to the original image
restored_img = wiener(noisy_img, (5, 5))

# Ensure the noisy image remains in valid pixel range [0, 255]

# Save the noisy image
cv2.imwrite('codexla_ching/brokenimgs/noisy_image.tiff', noisy_img)

# Visualize the results
plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original Image')
plt.subplot(1, 3, 2), plt.imshow(noisy_img, cmap='gray'), plt.title('Noisy Image (Gaussian)')
plt.show()
