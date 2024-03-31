import React, { useState, useEffect } from 'react';
import { firestore } from "../firebase_config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import Modal from './modal'; // Import the Modal component
import "./index.css"; // Import the CSS file

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({});
    const [submissionSuccess, setSubmissionSuccess] = useState(false); // State for submission success
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    useEffect(() => {
        const fetchQuestionsData = async () => {
            try {
                const response = await fetchQuestions();
                setQuestions(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchQuestionsData();
    }, []);

    const fetchQuestions = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'questions'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const handleChange = (questionId, value, questionText) => {
        setResponses(prevState => ({
            ...prevState,
            [questionText]: value // Set the response with the question text as the key
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const responseRef = collection(firestore, 'Responses');
            await addDoc(responseRef, responses);
            console.log("Response uploaded successfully!");
            setSubmissionSuccess(true); // Set submission success to true
            setShowModal(true); // Show the modal
        } catch (error) {
            console.error("Error uploading response:", error);
        }

        // Clear the responses after submission
        setResponses({});
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
        setSubmissionSuccess(false); // Reset submission success state
    };

    return (
        <div className="question-container">
            <h1 className="question-heading">Feedback Form</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <ul className="question-list">
                            {questions.map(question => (
                                <li key={question.id} className="question-item">
                                    <p className="question-text">{question.Questions}</p>
                                    <div className="options">
                                        <label className="option">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value="Agree"
                                                onChange={() => handleChange(question.id, "Agree", question.Questions)}
                                            />
                                            Agree
                                        </label>
                                        <label className="option">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value="Strongly Agree"
                                                onChange={() => handleChange(question.id, "Strongly Agree", question.Questions)}
                                            />
                                            Strongly Agree
                                        </label>
                                        <label className="option">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value="Neutral"
                                                onChange={() => handleChange(question.id, "Neutral", question.Questions)}
                                            />
                                            Neutral
                                        </label>
                                        <label className="option">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value="Disagree"
                                                onChange={() => handleChange(question.id, "Disagree", question.Questions)}
                                            />
                                            Disagree
                                        </label>
                                        <label className="option">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value="Strongly Disagree"
                                                onChange={() => handleChange(question.id, "Strongly Disagree", question.Questions)}
                                            />
                                            Strongly Disagree
                                        </label>
                                        {/* Add other radio button options */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                    {showModal && (
                        <Modal closeModal={closeModal}>
                            
                            <p className="success-message">Responses saved successfully!</p>
                            <button onClick={closeModal}>Close</button>
                        </Modal>
                    )}
                </>
            )}
        </div>
    );
};

export default Question;
