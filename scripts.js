//generates a file path to the desired audio file and plays it
function getUrl(letter) {
    var url = "audio/"+letter+".mp3";
    new Audio(url).play();
}
//navigation function for the button that brings up the training set selector
$(document).ready(function () {
    $("#selectStart").click(function () {
        $("#Select").show();
        $("#Study").toggle();
        $("#selectStart").toggle();
    });
});
//navigation function for the button that starts the quiz
$(document).ready(function () {
    $("#quizStart").click(function () {
        $("#Create").show();
        $("#Select").toggle();
    });
});
//populate generates the quiz
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for(var i =0;i<choices.length;i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn"+i, choices[i]);
        }

        showProgress();
    }
}
//passes the users guess to the quiz object
function guess(id,guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }

}
//called when the quiz ended and displays final score and a button to return to the study section
function showScores() {
    var endScreenHtml = "<h1>Result</h1>";
    endScreenHtml +="<h2 id ='score'>You've scored "+(quiz.score/quiz.questions.length)*100+"%</h2>";
    endScreenHtml +="<div class='buttonContainer'><input type='button' id='returnHome' class='button' value='Home Screen' onclick='refresh()'></div>";
    var element = document.getElementById("quiz");
    $("#returnHome").show();
    element.innerHTML = endScreenHtml;
}
//displays how far along the user is in their quiz
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress")
    element.innerHTML = "Question "+currentQuestionNumber +" of "+quiz.questions.length;
}
//displays how many charactrs the user has added to their training set
function showSet(count) {
    var currentCount = finalQuestions.length/2;
    var element = document.getElementById("setSize")
    element.innerHTML = currentCount +" of "+5+" Characters Selected";
}
//disables the quiz start button so you can't start the quiz before selecting a training set
document.getElementById("quizStart").disabled =true;

//takes input from the set seletor and populates the quiz with questions from an array of possible questions
function setBuilder(input) {
    console.log(input);
    var possibleQuestions = [
        new Question("n",["す","の","ん","ち"],"ん"),
        new Question("wa",["ね","み","き","わ"],"わ"),
        new Question("ra",["ら","ひ","さ","て"],"ら"),
        new Question("ya",["み","む","や","に"],"や"),
        new Question("ma",["ま","り","あ","く"],"ま"),
        new Question("ha",["へ","き","え","は"],"は"),
        new Question("na",["ち","な","え","ん"],"な"),
        new Question("ta",["や","た","つ","す"],"た"),
        new Question("sa",["め","い","さ","せ"],"さ"),
        new Question("ka",["に","け","か","く"],"か"),
        new Question("a",["あ","い","た","か"],"あ"),
        new Question("ri",["ま","め","り","む"],"り"),
        new Question("mi",["よ","め","ゆ","み"],"み"),
        new Question("hi",["ひ","き","さ","ち"],"ひ"),
        new Question("ni",["む","ね","に","る"],"に"),
        new Question("chi",["る","ち","む","を"],"ち"),
        new Question("shi",["よ","む","き","し"],"し"),
        new Question("ki",["き","あ","め","え"],"き"),
        new Question("i",["い","つ","た","へ"],"お"),
        new Question("ru",["す","え","ゆ","る"],"る"),
        new Question("yu",["よ","ゆ","り","な"],"ゆ"),
        new Question("mu",["け","ち","よ","む"],"む"),
        new Question("fu",["さ","る","ふ","た"],"ふ"),
        new Question("nu",["ぬ","け","め","し"],"ぬ"),
        new Question("tsu",["ほ","つ","と","お"],"つ"),
        new Question("su",["し","す","ね","も"],"す"),
        new Question("ku",["せ","よ","ゆ","く"],"く"),
        new Question("u",["ほ","ろ","い","う"],"う"),
        new Question("re",["れ","お","を","む"],"れ"),
        new Question("me",["て","め","け","き"],"め"),
        new Question("he",["へ","ろ","の","す"],"へ"),
        new Question("ne",["お","お","ほ","ね"],"ね"),
        new Question("te",["る","て","け","む"],"て"),
        new Question("se",["そ","お","と","せ"],"せ"),
        new Question("ke",["く","け","ゆ","れ"],"け"),
        new Question("e",["え","れ","つ","れ"],"え"),
        new Question("wo",["え","ほ","を","る"],"を"),
        new Question("ro",["へ","う","ろ",""],"ろ"),
        new Question("yo",["る","れ","せ","よ"],"よ"),
        new Question("mo",["も","こ","る","つ"],"も"),
        new Question("ho",["ぬ","へ","ほ","て"],"ほ"),
        new Question("no",["く","の","え","よ"],"の"),
        new Question("to",["お","れ","と","ほ"],"と"),
        new Question("so",["む","ね","と","そ"],"そ"),
        new Question("ko",["へ","き","ね","こ"],"こ"),
        new Question("o",["ぬ","お","い","せ"],"お"),
        new Question("ん",["ma","tsu","n","ni"],"n"),
        new Question("わ",["tsu","mu","wa","ha"],"wa"),
        new Question("ら",["ra","hi","u","a"],"ra"),
        new Question("や",["ki","i","ya","u"],"ya"),
        new Question("ま",["ri","shi","fe","ma"],"ma"),
        new Question("は",["ha","mi","sa","ku"],"ha"),
        new Question("な",["chi","ru","na","ya"],"na"),
        new Question("た",["su","ta","mi","chi"],"ta"),
        new Question("さ",["u","shi","sa","mi"],"sa"),
        new Question("か",["ka","a","shi","ki"],"ka"),
        new Question("あ",["a","ru","chi","yu"],"a"),
        new Question("り",["ya","nu","ri","ru"],"ri"),
        new Question("み",["te","tsu","mi","ta"],"mi"),
        new Question("ひ",["fu","su","ta","hi"],"hi"),
        new Question("に",["ni","mi","se","ya"],"ni"),
        new Question("ち",["ta","ka","ri","chi"],"chi"),
        new Question("し",["re","n","shi","fu"],"shi"),
        new Question("き",["hi","ki","tsu","su"],"ki"),
        new Question("お",["re","i","n","ka"],"i"),
        new Question("る",["fe","ya","ru","ni"],"ru"),
        new Question("ゆ",["mi","yu","me","ni"],"yu"),
        new Question("む",["re","ra","chi","mu"],"mu"),
        new Question("ふ",["tsu","fu","ki","u"],"fu"),
        new Question("ぬ",["ki","me","ya","nu"],"nu"),
        new Question("つ",["tsu","ki","na","me"],"tsu"),
        new Question("す",["shi","su","nu","mu"],"su"),
        new Question("く",["me","chi","ku","su"],"ku"),
        new Question("れ",["ne","u","yu","ki"],"u"),
        new Question("れ",["ra","re","ni","se"],"re"),
        new Question("め",["me","ka","nu","mu"],"me"),
        new Question("へ",["shi","re","ka","he"],"he"),
        new Question("ね",["お","ma","u","ne"],"ne"),
        new Question("て",["ki","o","te","u"],"te"),
        new Question("せ",["ku","se","tsu","me"],"se"),
        new Question("け",["ke","re","ku","i"],"ke"),
        new Question("え",["chi","me","e","no"],"e"),
        new Question("を",["ki","wo","nu","fe"],"wo"),
        new Question("ろ",["wo","su","ke","ro"],"ro"),
        new Question("よ",["re","u","i","yo"],"yo"),
        new Question("も",["ku","mo","te","ke"],"mo"),
        new Question("ほ",["mu","ho","ko","me"],"ho"),
        new Question("の",["i","me","no","tsu"],"no"),
        new Question("と",["to","ne","wo","no"],"to"),
        new Question("そ",["i","nu","e","so"],"so"),
        new Question("こ",["yo","ko","te","shi"],"ko"),
        new Question("お",["me","o","to","fe"],"o")
    ];
    console.log(possibleQuestions);

    for(var i = 0;i<possibleQuestions.length;i++){
        if(finalQuestions.length === 10){
            break;
        }
        if(possibleQuestions[i].text === input || possibleQuestions[i].answer === input){ //adds a question for both the hiragana and the romaji
            finalQuestions.push(possibleQuestions[i]);
            document.getElementById("quizStart").disabled =false;
            showSet();
        }
    }
    shuffle(finalQuestions); // mixes the question set around
    console.log(finalQuestions);
    quiz = new Quiz(finalQuestions);
    populate();
}
//function and randomly mixes the question set
function shuffle(array){
    var counter = array.length;
    var index = array.length;
    var temp;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
//refreshes the page to return to study and reset quiz progress
function refresh(){
    window.location.reload(false);
}

var finalQuestions = [];
var quiz = new Quiz(finalQuestions);




