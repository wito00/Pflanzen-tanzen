import spidev
import time

# Initialize SPI
spi = spidev.SpiDev()
spi.open(0, 0)  # Bus 0, Device 0 (CE0)
spi.max_speed_hz = 1350000  # SPI clock speed

def read_channel(channel):
    """Read data from an ADC channel (0-7)"""
    if channel < 0 or channel > 7:
        return -1
    adc = spi.xfer2([1, (8 + channel) << 4, 0])
    data = ((adc[1] & 3) << 8) + adc[2]  # Convert to 10-bit value
    return data

while True:
    moisture_value = read_channel(0)  # Read from CH0
    percentage = (1 - (moisture_value / 1023)) * 100  # Convert to % (drier is higher)
    print(f"Soil Moisture: {percentage:.2f}%")
    time.sleep(1)
