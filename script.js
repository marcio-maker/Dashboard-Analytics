document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            // Atualizar métricas
            document.getElementById('total-visitors').textContent = 
                data.metrics.total_visitors.toLocaleString();
            document.getElementById('conversion-rate').textContent = 
                data.metrics.conversion_rate + '%';
            document.getElementById('avg-time').textContent = 
                data.metrics.avg_time + ' min';
            document.getElementById('bounce-rate').textContent = 
                data.metrics.bounce_rate + '%';

            // Atualizar tabela
            const tableBody = document.querySelector('#top-pages tbody');
            data.top_pages.forEach(page => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${page.page}</td>
                    <td>${page.views.toLocaleString()}</td>
                    <td>${page.conversion}%</td>
                `;
                tableBody.appendChild(row);
            });

            // Criar gráficos
            createVisitorsChart(data.dates, data.visitors, data.conversions);
            createSourcesChart(data.sources);
        });

    function createVisitorsChart(dates, visitors, conversions) {
        const ctx = document.getElementById('visitors-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Visitantes',
                        data: visitors,
                        borderColor: '#5c6ac4',
                        backgroundColor: 'rgba(92, 106, 196, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Conversões',
                        data: conversions,
                        borderColor: '#47c1bf',
                        backgroundColor: 'rgba(71, 193, 191, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function createSourcesChart(sources) {
        const ctx = document.getElementById('sources-chart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(sources),
                datasets: [{
                    data: Object.values(sources),
                    backgroundColor: [
                        '#5c6ac4',
                        '#47c1bf',
                        '#f49342',
                        '#de3618'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
});