import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase_config';
import Chart from 'react-google-charts';

const fetchData = async (setData) => {
    try {
        const responseCollectionRef = collection(firestore, 'Responses');
        const querySnapshot = await getDocs(responseCollectionRef);
        const responseData = querySnapshot.docs.map(doc => doc.data());
        setData(responseData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const ChartComponent = () => {
    const [data, setData] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [chartDataFormatted, setChartDataFormatted] = useState([]);
    const [colors, setColors] = useState({});

    useEffect(() => {
        fetchData(setData);
    }, []);

    const handleGetData = () => {
        if (selectedQuestion.trim() === '') {
            alert('Please select a question.');
            return;
        }

        const filteredData = data.filter(item => item[selectedQuestion] !== undefined);
        const chartData = [];
        const uniqueResponses = [...new Set(filteredData.flatMap(item => item[selectedQuestion]))];
        const responseColors = {};
        
        uniqueResponses.forEach((response, index) => {
            responseColors[response] = getRandomColor(index);
        });

        setColors(responseColors);

        filteredData.forEach(item => {
            const response = item[selectedQuestion];
            const existingRow = chartData.find(row => row[0] === response);
            if (existingRow) {
                existingRow[1]++;
            } else {
                chartData.push([response, 1]);
            }
        });

        const chartDataFormatted = [['Response', 'Count'], ...chartData];
        setChartDataFormatted(chartDataFormatted);
    };

    const handleSelectQuestion = (event) => {
        setSelectedQuestion(event.target.value);
    };

    const getRandomColor = (index) => {
        const colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395'];
        return colors[index % colors.length];
    };

    return (
        <div>
            <h2>Chart</h2>
            <div>
                <select value={selectedQuestion} onChange={handleSelectQuestion}>
                    <option value="">Select Question</option>
                    {Object.keys(data[0] || {}).map(question => (
                        <option key={question} value={question}>{question}</option>
                    ))}
                </select>
                <button
                    onClick={handleGetData}
                    style={{
                        backgroundColor: '#4CAF50', /* Green */
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Get Data
                </button>
            </div>
            <div style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={chartDataFormatted}
                    options={{
                        // Customize options as needed
                        chart: {
                            title: 'Responses',
                        },
                        colors: Object.values(colors),
                        legend: { position: 'top' }, // Position legend on top
                        // Make chart responsive
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    );
};

export default ChartComponent;
