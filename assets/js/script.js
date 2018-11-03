// Initialize Firebase
var config = {
    apiKey: "AIzaSyCDs_jY8hvLHcw-lUrRC89R-I2CJQsfeyw",
    authDomain: "train-schedule-kirplink.firebaseapp.com",
    databaseURL: "https://train-schedule-kirplink.firebaseio.com",
    projectId: "train-schedule-kirplink",
    storageBucket: "",
    messagingSenderId: "366059419238"
};
firebase.initializeApp(config);

let database = firebase.database();



$(document).on('click', '#submit-train', function(event) {
    event.preventDefault();

    let trainName = $('#train-name-input').val().trim();
    let trainDestination =$('#destination-input').val().trim();
    let trainTime = $('#train-time-input').val().trim();
    let trainFrequency = $('#train-frequency').val().trim();

    console.log(trainTime);

    $('#train-name-input').val('');
    $('#destination-input').val('');    
    $('#train-time-input').val('');
    $('#train-frequency').val('');

    database.ref().push({

        trainName: trainName,
        destination: trainDestination,
        trainTime: trainTime,
        frequency: trainFrequency,
    })
    
    
    
});

database.ref().on('child_added', function(childSnapshot) {
    let tFrequency = childSnapshot.val().frequency;
    let firstTime = childSnapshot.val().trainTime

    let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    let currentTime = moment();

    let diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");

    let tRemainder = diffTime % tFrequency;

    let minutesTillTrain = tFrequency - tRemainder;

    let nextTrain = currentTime.add(minutesTillTrain, "minutes");
    
    $('#train-info-table').append(`
        <tr>
            <td>${childSnapshot.val().trainName}</td>
            <td>${childSnapshot.val().destination}</td>
            <td>${childSnapshot.val().frequency}</td>
            <td>${moment(nextTrain).format("hh:mm")}</td>
            <td>${minutesTillTrain}</td> 
        </tr>
    `)
})





















// let testArray = ['cat','dog','frog','cow']

// testArray.forEach(function(element, i){
    // console.log(element + ' ' + i);
// });