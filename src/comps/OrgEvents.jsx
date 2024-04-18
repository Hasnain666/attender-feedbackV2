import React, {useEffect, useState, useRef} from "react";
import {db, auth } from "../firebase_config";
import { getUserData } from "./globalFunctions";
import {collection, getDocs, getDoc, query, doc, addDoc, setDoc, deleteDoc, where} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {Overlay} from "./Overlay";
import "react-datepicker/dist/react-datepicker.css";
import {Event} from "./Event";
import Displayname from "../Displayname";

//component for displaying events of organisers
const OrgEvents = () => {
    const userId = getUserData("user")

    //check if user is logged in and prevent entry if not
    if (!userId || !auth) {
        window.location.replace("/");
    } else {
        //console.log(userId)
    }

    const navigate = useNavigate()
    const [eventRefresh, setEventRefresh] = useState(0);
    const [myevents, setEvents] = useState([]);
    const [ismyAddOverlay, setIsMyAddOverlay] = useState(false)
    const [ismyUpdateOverlay, setismyUpdateOverlay] = useState(false)
    const [thisDocId, setthisDocId ] = useState('')
    const [thisEventName, setthisEventName ] = useState('')
    const [thisEventDate, setthisEventDate ] = useState(new Date())
    const [thisEvenFbDate, setthisEventFbName ] = useState(new Date())
    const [userFname, setUserFname] = useState("Event");
    const [userLname, setUserLname] = useState("Organiser");

    //component for handling page overlays
    const handleClickOverlay = (args,props, e) => {
        if(args === "add") {
            setIsMyAddOverlay(!ismyAddOverlay);
        } else {
            // console.log( tempDate)
            setthisEventName(props.userdata.eventName)
            setthisEventDate(props.userdata.eventDate.toDate())
            setthisEventFbName(props.userdata.eventFbDate.toDate())
            setthisDocId(args)
            setismyUpdateOverlay(!ismyUpdateOverlay)
        }

        return false
    }

    //componet for the onclick response when adding events
    const handAddEvent = (EventName, EventDate, EventFbDate,e) => {
        if (EventDate > EventFbDate) {
            alert("Feeedback date can't be earlier than event date")
        } else if (!EventName) {
            alert("no event name")
        }
        else {
            addEvents(EventName, EventDate, EventFbDate)
        }

        return false
    }

    //componet for the onclick response when deleting an event
    const handleDeleteEvent = (id, e) => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            delEvents(id)
        }

        return false
    }

    //componet for the onclick response when updating an event
    const handleUpdateEvent = (id, e) => {
        if (thisEventDate > thisEvenFbDate) {
            alert("Feeedback date can't be earlier than event date")
        } else if (!thisEventName) {
            alert("no event name")
        }
        else {
            updateEvent(id, e)
        }

        return false
    }

    //component responsible for generating an event on the web page.
    function Events(props){
        // console.log(props)
        const id = props.userdata.eventKey
        const eventName = props.userdata.eventName
        const eventDate = props.userdata.eventDate.toDate().toString();
        const eventAttendee = props.userdata.eventAttendee

        return (
            <div className="event" key={id}>
                <div className="text-container1">
                    <h2 className="text_11">{eventName}</h2>
                    <p className="text_21">Date: {eventDate}</p>
                    <p className="text_21">Attendees: {eventAttendee} students</p>
                </div>

                <div className="eventLinks">
                <button className="button1" key="del_{id}" data-key={id}
                            onClick={(e) => handleDeleteEvent(e.target.getAttribute('data-key'), e)}>Delete
                    </button>
                    <button className="button1" key="edit_{id}" data-key={id}
                            onClick={(e) => handleClickOverlay(id, props, e)}>Edit
                    </button>
                    <button className="button1" key="enom_{id}" data-key={id}
                            onClick={() => navigate('/nominate', {state: {doc_id: id}})}>Nominate
                    </button>


                </div>

            </div>
        )
    }

    //component for calling the event component to be used on the overlay. will be passed through as a child to the overlay
    function AddNewEventsDiv(props) {
        const [newEventName, setNewEventName] = useState('')
        const [newEventDate, setNewEventDate] = useState(new Date())
        const [newEventFbDate, setNewEventFbDate] = useState(new Date())

        const newDate = (date) => setNewEventDate(date)
        const newFbDate = (date) => setNewEventFbDate(date)
        const newName = (e) => setNewEventName(e)

        return (
            <Event
                newName={newName}
                eventName={newEventName}
                newDate={newDate}
                eventDate={newEventDate}
                newFbDate={newFbDate}
                fbDate={newEventFbDate}
                handEvent={handAddEvent}
                buttonName="Add"

            />
        )
    }

    //component for calling the event component to be used on the overlay. will be passed through as a child to the overlay
    function UpdateEventsDiv() {
        const newDate = (date) => setthisEventDate(date)
        const newFbDate = (date) => setthisEventFbName(date)
        const newName = (e) => setthisEventName(e)

        return (
            <Event
                newName={newName}
                eventName={thisEventName}
                newDate={newDate}
                eventDate={thisEventDate}
                newFbDate={newFbDate}
                fbDate={thisEvenFbDate}
                handEvent={handleUpdateEvent}
                buttonName="Update"

            />
        )
    }

    //function for deleting events id is the event id
    const delEvents = (id) => {
        try {
            // console.log(eventName, eventDate, eventFbDuration,userId.uid)
            deleteDoc(doc(db, "Events", id))
                .then((callback)=>{
                    console.log(callback)
                    setEventRefresh( Math.random() )

                })
                .catch(err => console.log("there is an error", err));


        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }

    //gets the username for the database based on the userid stored as a cookie from login
    const getUserName = () =>{
        (async function() {
            try {
                const collection_ref =doc(db, 'Users', userId.uid )
                const getEventsSnapshot = await getDoc(collection_ref);
                if (getEventsSnapshot.exists()) {
                    // console.log("Document data:", getEventsSnapshot.data());
                    setUserFname(getEventsSnapshot.data().fname)
                    setUserLname(getEventsSnapshot.data().lname)
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (e) {
                console.error(e);
            }
        })();

    }

    //function for adding events in firebase db
    const addEvents = (eventName, eventDate, eventFbDuration ) => {
        try {
            // console.log(eventName, eventDate, eventFbDuration,userId.uid)

            addDoc(collection(db, "Events"), {
                event_name: eventName,
                event_date: eventDate,
                event_fb_duration: eventFbDuration,
                org_id: userId.uid,
                event_attendee: 0,
                event_timestamp: firebase.firestore.Timestamp.now()
            })
                .then((callback)=>{
                    console.log(callback)
                    setEventRefresh( Math.random() )

                })
                .catch(err => console.log("there is an error", err));

            setIsMyAddOverlay(!ismyAddOverlay);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    //function for updating events in firebase db
    const updateEvent = () => {
        try {

            setDoc(doc(db, "Events", thisDocId ), {
                event_name: thisEventName,
                event_date: thisEventDate,
                event_fb_duration: thisEvenFbDate
            }, {merge : true})
                .then((callback)=>{
                    console.log(callback)
                    setEventRefresh( Math.random() )

                })
                .catch(err => console.log("there is an error", err));

            setismyUpdateOverlay(!ismyUpdateOverlay);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    //generates event list array to be used to display the organisers events
    useEffect(() => {
        (async function() {
            //console.log(userId.uid)
            try {
                setEvents([])
                const collection_ref =collection(db, 'Events', )
                const getEventsSnapshot = await getDocs(
                    query(
                        collection_ref, where("org_id", "==", userId.uid)
                    )
                );

                getEventsSnapshot.forEach((doc) => {
                    setEvents(prevState => [...prevState, {
                        "eventKey":doc.id ,
                        "eventName": doc.data().event_name,
                        "eventDate": doc.data().event_date,
                        "eventFbDate": doc.data().event_fb_duration,
                        "eventAttendee": doc.data().event_attendee
                    }]);
                })
            } catch (e) {
                console.error(e);
            }
        })();

    }, [eventRefresh]);

    //main function of orgevents. will process the array from useeffect and loops the content through Events Component for display.
    const GenerateEvents = () => {
        // let eventNodes =

        return (
            <div className="orgevents">
                <Overlay isOpen={ismyAddOverlay} onClose={() => setIsMyAddOverlay(!ismyAddOverlay)} children={AddNewEventsDiv()}
                         title="Add Event"/>
                <Overlay isOpen={ismyUpdateOverlay} onClose={() => setismyUpdateOverlay(!ismyUpdateOverlay)} children={UpdateEventsDiv()}
                         title="Update Event"/>
                <div className="eventCont">
                    {
                        myevents.map(function (myevent) {
                            return (
                                <Events userdata={myevent} key={myevent.eventKey}/>
                            )

                        })
                    }
                </div>
                <br/><br/><br/>
                <button className="button_11" key="add_{id}" onClick={(e) => handleClickOverlay("add", e)}>
                </button>

            </div>
        )
    }


    getUserName();

    //display the page
    return (

        <>
            <Displayname firstName={userFname} lastName={userLname} />
            <GenerateEvents />
        </>
    );
};

export default OrgEvents;