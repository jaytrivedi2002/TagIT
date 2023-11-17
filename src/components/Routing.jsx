import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot, where, and } from "firebase/firestore";
import { db } from "../firebase";

const Routing = () => {
  const [to145th, setTo145th] = useState(0);
  const [to145thtonac, setTo145thToNac] = useState(0);
  const [to125th, setTo125th] = useState(0);
  const [to125thtonac, setTo125thToNac] = useState(0);

  function secondsToCeilingMinutes(s) {
    var seconds = parseInt(s.slice(0, -1), 10);
    var minutes = Math.ceil(seconds / 60);
    return minutes;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q1 = query(collection(db, "CCNY_Shuttle_Routing"), orderBy("datetime", "desc"), limit(1), where("nextStop", "==", "W125"));
        const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("1 datetime: ", doc.data().datetime, " previous stop: ", doc.data().prevStop, " nest stop: ", doc.data().nextStop, " prev to next stop time: ", doc.data().duration);
            console.log(secondsToCeilingMinutes(doc.data().duration));
            setTo125th(secondsToCeilingMinutes(doc.data().duration));
          });
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q1 = query(collection(db, "CCNY_Shuttle_Routing"), orderBy("datetime", "desc"), limit(1), where("nextStop", "==", "W145"));
        const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("2 datetime: ", doc.data().datetime, " previous stop: ", doc.data().prevStop, " nest stop: ", doc.data().nextStop, " prev to next stop time: ", doc.data().duration);
            console.log(secondsToCeilingMinutes(doc.data().duration));
            setTo145th(secondsToCeilingMinutes(doc.data().duration));
          });
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q1 = query(collection(db, "CCNY_Shuttle_Routing"), orderBy("datetime", "desc"), limit(1), and(where("prevStop", "==", "W145"), where("nextStop", "==", "NAC")));
        const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("3 datetime: ", doc.data().datetime, " previous stop: ", doc.data().prevStop, " nest stop: ", doc.data().nextStop, " prev to next stop time: ", doc.data().duration);
            console.log(secondsToCeilingMinutes(doc.data().duration));
            setTo145thToNac(secondsToCeilingMinutes(doc.data().duration));
          });
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q1 = query(collection(db, "CCNY_Shuttle_Routing"), orderBy("datetime", "desc"), limit(1), and(where("prevStop", "==", "W125"), where("nextStop", "==", "NAC")));
        const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("4 datetime: ", doc.data().datetime, " previous stop: ", doc.data().prevStop, " nest stop: ", doc.data().nextStop, " prev to next stop time: ", doc.data().duration);
            console.log(secondsToCeilingMinutes(doc.data().duration));
            setTo125thToNac(secondsToCeilingMinutes(doc.data().duration));
          });
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount


  const stops = [
    { name: "To 145th", time: to145th },
    { name: "145th > CCNY", time: to145thtonac },
    { name: "To 125th", time: to125th },
    { name: "125th > CCNY", time: to125thtonac },
  ];

  const getColorForTime = (minutes) => {
    if (minutes <= 10) {
      return "text-green-600";
    } else if (minutes <= 20) {
      return "text-yellow-600";
    } else {
      return "text-red-600";
    }
  };

  return (
    <div className="flex-col bg-white rounded-lg shadow-lg p-4">
      <h1 className="flex justify-center text-2xl font-bold mb-5">Bus Stop Timings</h1>
      <ul>
        {stops.map((stop, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b py-2 last:border-0"
          >
            <span className="text-lg">{stop.name}</span>
            <span className={`font-semibold ${getColorForTime(stop.time)}`}>
              {stop.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routing;
