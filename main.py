from flask import Flask, jsonify
import spidev
import time
from collections import deque
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize SPI
spi = spidev.SpiDev()
spi.open(0, 0)
spi.max_speed_hz = 1350000

# Store last 100 measurements (FIFO queue)
sensor_data = deque(maxlen=100)  # Keeps the last 100 entries

def read_adc(channel):
    """Read from MCP3008 channel (0-7)"""
    adc = spi.xfer2([1, (8 + channel) << 4, 0])
    value = ((adc[1] & 3) << 8) + adc[2]  # Convert to 10-bit value
    return value

def read_moisture(channel=0):
    """Read from MCP3008 and return moisture percentage"""
    value = read_adc(channel)
    percentage = (value / 1023) * 100  # Higher value = more moisture
    return round(percentage, 2)

def read_temperature(channel=1):
    """Read temperature from KY-028 analog output"""
    value = read_adc(channel)  # Read raw ADC value (0-1023)
    voltage = (1023.0/value)*0.12  # Convert to voltage

    print(f"Raw ADC: {value}, Voltage: {voltage:.2f}V")  # Debugging info

    # Adjust the temperature formula (calibration needed)
    temperature = (voltage - 0.5) * 100  # Common approximation for LM35-based sensors

    return round(temperature, 2)

@app.route('/sensor-data', methods=['GET'])
def get_sensor_data():
    """Return latest moisture and temperature values"""
    if not sensor_data:
        return jsonify({"moisture": None, "temperature": None, "history": []})

    latest = sensor_data[-1]
    return jsonify({"moisture": latest["moisture"], "temperature": latest["temperature"], "history": list(sensor_data)})

def collect_sensor_data():
    """Read sensors every 5 minutes and store in history"""
    while True:
        new_entry = {
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
            "moisture": read_moisture(),
            "temperature": read_temperature(),
        }
        sensor_data.append(new_entry)
        print(f"New data recorded: {new_entry}")
        time.sleep(300)  # Wait 5 minutes

if __name__ == '__main__':
    from threading import Thread
    Thread(target=collect_sensor_data, daemon=True).start()
    app.run(host='0.0.0.0', port=5000, debug=True)