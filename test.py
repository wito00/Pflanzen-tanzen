import spidev
import time

spi = spidev.SpiDev()
spi.open(0, 0)
spi.max_speed_hz = 1350000

def read_channel(channel):
    adc = spi.xfer2([1, (8 + channel) << 4, 0])  
    data = ((adc[1] & 3) << 8) + adc[2]
    return data

try:
    while True:
        values = [read_channel(i) for i in range(8)]
        print(f"ADC Values: {values}")
        time.sleep(1)
except KeyboardInterrupt:
    spi.close()
    print("Stopped.")
