var config = {
apiKey: "AIzaSyC-qbYhm8RKtE0iSKAnNwwFMAsPQ4bLY5s",
authDomain: "first-project-c1ef8.firebaseapp.com",
databaseURL: "https://first-project-c1ef8.firebaseio.com",
projectId: "first-project-c1ef8",
storageBucket: "first-project-c1ef8.appspot.com",
messagingSenderId: "577778427372"
};
firebase.initializeApp(config);

database = firebase.database();

database.ref().on("child_added", function(snapshot) {
	var newTrain = snapshot.val();

	var trainName = newTrain.trainName;
	var destination = newTrain.destination;
	var trainTime = newTrain.trainTime;
	var frequency = newTrain.frequency;

	var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	var diffTime = currentTime.diff(moment(timeConverted), "minutes");
	var remTime = diffTime % frequency;
	var minAway = frequency - remTime;
	var nextTrain = moment().add(minAway, "minutes");
    	nextTrain = moment(nextTrain).format("HH:mm");


	var row = $("<tr>");
    var html = "<td>" + trainName + "</td>";
    html += "<td>" + destination + "</td>";
    html += "<td>" + frequency + "</td>";
    html += "<td>" + nextTrain + "</td>";
    html += "<td>" + minAway + "</td>";
	row.html(html);
    $("#displayrow").append(row);
});

$("#addTrain").on("click", function(event) {
	event.preventDefault();

	var trainName = $("#train-name").val();
	var destination = $("#train-dest").val();
	var trainTime = $("#train-time").val();
	var frequency = $("#frequency").val();

	database.ref().push({
		"trainName": trainName,
		"destination": destination,
		"trainTime": trainTime,
		"frequency": frequency
	});
	
});