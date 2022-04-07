prediction_1=""
prediction_2=""
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera")
function take_snapshot(){
    Webcam.snap(function(data_uri){document.getElementById("result").innerHTML=
'<img id="captured_image" src="'+data_uri+'">'})
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xQRttb4CE/model.json',modelloaded)
function modelloaded(){
    console.log("model loaded")
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="first prediction is "+prediction_1
    speak_data2="first prediction is "+prediction_2
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis)
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        document.getElementById("result_emotion_name").innerHTML=prediction_1;
        document.getElementById("result_emotion_name2").innerHTML=prediction_2;
        speak()
        if(results[0].label=="amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;";

        }
        if(results[0].label=="best"){
            document.getElementById("update_emoji").innerHTML="&#128077;";

        }
        if(results[0].label=="victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";

        }
        if(results[1].label=="amazing"){
            document.getElementById("update_emoji2").innerHTML="&#128076;";

        }
        if(results[1].label=="best"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";

        }
        if(results[1].label=="victory"){
            document.getElementById("update_emoji2").innerHTML="&#9996;";

        }
    }
}