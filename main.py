import RPi.GPIO as GPIO
import time

# Define GPIO pin
DIGITAL_PIN = 17  # Replace 17 with the GPIO pin you're using

# Set up the GPIO
GPIO.setmode(GPIO.BCM)  # Use Broadcom pin numbering
GPIO.setup(DIGITAL_PIN, GPIO.IN)  # Set the pin as an input

try:
    while True:
        # Read digital value
        if GPIO.input(DIGITAL_PIN):
            print("Soil is dry.")
        else:
            print("Soil is wet.")
        time.sleep(1)

except KeyboardInterrupt:
    print("Exiting program...")

finally:
    GPIO.cleanup()  # Reset GPIO settings
