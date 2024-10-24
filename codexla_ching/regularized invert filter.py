# This thing is sensitive to noised image. So dont input noise images

import cv2
import numpy as np
import matplotlib.pyplot as plt

# Function to create a point spread function (PSF) representing the blur
def motion_blur_psf(size):
    psf = np.zeros((size, size))
    psf[int((size-1)/2), :] = np.ones(size)  # Create a horizontal line to simulate motion blur
    psf = psf / size  # Normalize the PSF
    return psf

# Regularized inverse filter function
def regularized_inverse_filter(blurred_img, psf, eps=1e-6):
    # Fourier Transform of the blurred image and PSF
    blurred_img_fft = np.fft.fft2(blurred_img)
    psf_fft = np.fft.fft2(psf, s=blurred_img.shape)
    
    # Regularization: Add epsilon to avoid amplifying noise
    restored_img_fft = blurred_img_fft * np.conj(psf_fft) / (np.abs(psf_fft) ** 2 + eps)
    
    # Inverse Fourier Transform to get the restored image
    restored_img = np.fft.ifft2(restored_img_fft)
    
    # Take the real part of the image, since the result might have a small imaginary component
    restored_img = np.abs(restored_img)
    
    return restored_img

# Load the image and convert to grayscale
img = cv2.imread('codexla_ching/Lion.jpg', cv2.IMREAD_GRAYSCALE)

# Simulate degradation: Apply motion blur
psf = motion_blur_psf(15)  # Create a motion blur PSF
blurred_img = cv2.filter2D(img, -1, psf)  # Apply motion blur

# Apply regularized inverse filter
restored_img = regularized_inverse_filter(blurred_img, psf)

# Visualize the results
plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original Image')
plt.subplot(1, 3, 2), plt.imshow(blurred_img, cmap='gray'), plt.title('Blurred Image')
plt.subplot(1, 3, 3), plt.imshow(restored_img, cmap='gray'), plt.title('Restored Image (Regularized Inverse Filter)')
plt.show()
