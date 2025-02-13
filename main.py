import spidev
import time

# Initialize SPI for moisture sensor
spi = spidev.SpiDev()
spi.open(0, 0)  # Bus 0, Device 0 (CE0)
spi.max_speed_hz = 1350000  # SPI clock speed

# Initialize SPI for temperature sensor
spi_temp = spidev.SpiDev()
spi_temp.open(0, 1)  # Bus 0, Device 1 (CE1)
spi_temp.max_speed_hz = 1350000  # SPI clock speed

def read_channel(spi, channel):
    """Read data from an ADC channel (0-7)"""
    if channel < 0 or channel > 7:
        return -1
    adc = spi.xfer2([1, (8 + channel) << 4, 0])
    data = ((adc[1] & 3) << 8) + adc[2]  # Convert to 10-bit value
    return data

def convert_to_temperature(adc_value):
    voltage = adc_value * (3.3 / 1023) 
    temperature_celsius = (voltage - 0.5) * 100  # Example conversion formula
    return temperature_celsius

while True:
    # Read soil moisture
    moisture_value = read_channel(0)  # Read from CH0
    percentage = (1 - (moisture_value / 1023)) * 100  # Convert to % (drier is higher)
    print(f"Soil Moisture: {percentage:.2f}%")

    # Read temperature
    temp_value = read_channel(spi_temp, 0)  # Read from CH0 for temperature sensor
    temperature = convert_to_temperature(temp_value)
    print(f"Temperature: {temperature:.2f}°C")
    
    time.sleep(1)
