import spidev
import time

# SPI Configuration
spi = spidev.SpiDev()
spi.open(0, 0)  # Open SPI bus 0, device (CS) 0
spi.max_speed_hz = 1350000

# Function to read ADC value from MCP3008
def read_channel(channel):
    adc = spi.xfer2([1, (8 + channel) << 4, 0])  
    data = ((adc[1] & 3) << 8) + adc[2]
    return data

try:
    while True:
        moisture_value = read_channel(0)  # Reading from CH0
        print(f"Moisture Level: {moisture_value}")
        time.sleep(1)
except KeyboardInterrupt:
    spi.close()
    print("Program Stopped.")
