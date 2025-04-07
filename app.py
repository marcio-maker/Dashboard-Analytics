from flask import Flask, render_template, jsonify
import random
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    # Gerar dados aleatórios para o dashboard
    days = 7
    dates = [(datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d') for i in range(days, -1, -1)]
    
    data = {
        'dates': dates,
        'visitors': [random.randint(800, 2000) for _ in range(days)],
        'conversions': [random.randint(20, 100) for _ in range(days)],
        'sources': {
            'Orgânico': random.randint(40, 50),
            'Direto': random.randint(20, 30),
            'Redes Sociais': random.randint(15, 25),
            'Referência': random.randint(5, 15)
        },
        'metrics': {
            'total_visitors': sum([random.randint(800, 2000) for _ in range(7)]),
            'conversion_rate': round(random.uniform(2.0, 5.0), 1),
            'avg_time': round(random.uniform(2.0, 5.0), 1),
            'bounce_rate': round(random.uniform(25.0, 45.0), 1)
        },
        'top_pages': [
            {'page': '/produtos', 'views': random.randint(2000, 3000), 'conversion': round(random.uniform(3.0, 6.0), 1)},
            {'page': '/blog', 'views': random.randint(1500, 2500), 'conversion': round(random.uniform(1.5, 3.5), 1)},
            {'page': '/contato', 'views': random.randint(1000, 2000), 'conversion': round(random.uniform(5.0, 8.0), 1)}
        ]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)