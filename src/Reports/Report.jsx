import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase_config';
import "./Report.css"; // Import the CSS file

const fetchData = async (setData) => {
    try {
        const responseCollectionRef = collection(firestore, 'Responses');
        const querySnapshot = await getDocs(responseCollectionRef);
        const responseData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        setData(responseData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const Report = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData(setData);
    }, []);

    const rowsPerPage = 5;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="report-container">
            <h1>Responses Report</h1>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Email ID</th>
                        <th>Sl. No</th>
                        <th>Question</th>
                        <th>Response</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((item, index) => {
                        let serialNumber = 0; // Reset the serial number for each document
                        return Object.entries(item.data).map(([question, response], questionIndex) => (
                            <tr key={`${item.id}-${questionIndex}`} className="document-row">
                                {questionIndex === 0 && <td rowSpan={Object.keys(item.data).length}>{item.id}</td>}
                                <td>{++serialNumber}</td>
                                <td>{question}</td>
                                <td>{response}</td>
                            </tr>
                        ))
                    })}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Report;
