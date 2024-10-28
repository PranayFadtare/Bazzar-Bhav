from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def scrape_data():
    url = 'https://apnasabji.com/product-category/buy-vegetables-online/'
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        products = []

        for product in soup.find_all(class_='product'):
            name = product.find(class_='woocommerce-loop-product__title').get_text(strip=True)
            image = product.find('img')['src']
            products.append({'name': name, 'image': image})

        return products
    else:
        print(f"Error: Unable to access the website (status code: {response.status_code})")
        return []

@app.route('/scrape', methods=['GET'])
def get_scraped_data():
    data = scrape_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
