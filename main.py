from flask import Flask, jsonify
import spidev
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize SPI
spi = spidev.SpiDev()
spi.open(0, 0)  # Bus 0, Device 0 (CE0)
spi.max_speed_hz = 1350000  # SPI clock speed

def read_moisture(channel=0):
    """Read from MCP3008 channel and return moisture percentage"""
    adc = spi.xfer2([1, (8 + channel) << 4, 0])
    value = ((adc[1] & 3) << 8) + adc[2]  # Convert to 10-bit value
    percentage = (1023 - value) / 1023 * 100  # Invert the value for correct percentage
    return round(percentage, 2)

@app.route('/moisture', methods=['GET'])
def get_moisture():
    moisture = read_moisture()
    return jsonify({"moisture": moisture})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
