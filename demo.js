let customSpeechRecognizer;

function toggleButtons(enable) {
    document.querySelectorAll('button').forEach(b => b.disabled = !enable);
   }

async function listen() {
    if (customSpeechRecognizer.isListening()) {
        customSpeechRecognizer.stopListening();
        toggleButtons(true);
        document.getElementById('listen').textContent = 'Listen';
        return;
      }
      toggleButtons(false);
      document.getElementById('listen').textContent = 'Stop';
      document.getElementById('listen').disabled = false;
        var k = 1
    await customSpeechRecognizer.listen(result => {
        // - result.scores contains the scores for the new vocabulary, which
        //   can be checked with:
        const words = customSpeechRecognizer.wordLabels();
        // console.log(words)
        // `result.scores` contains the scores for the new words, not the original
        // words.
        console.log(result)
        console.log("Iteration: ", k)
        k++;
        console.log("Scores", result.scores)
        // for (let i = 0 ; i < words.length ; ++i) {
        // console.log(`score for word '${words[i]}' = ${result.scores[i]}`);
        // }
        scores = Array.from(result.scores).map((s, i) => ({score: s, word: words[i]}));
        // Find the most probable word.
        scores.sort((s1, s2) => s2.score - s1.score);
        $("#word-"+scores[0].word).addClass('candidate-word-active');
        setTimeout(() => {
            $("#word-"+scores[0].word).removeClass('candidate-word-active');
        }, 2000);
    }, {probabilityThreshold: 0.75});

}

async function app() {
    customSpeechRecognizer = speechCommands.create('BROWSER_FFT', null, 'http://localhost:8000/best_weights/transferModel.json', 'http://localhost:8000/metadata.json'); 
    await customSpeechRecognizer.ensureModelLoaded();
    console.log(customSpeechRecognizer)
 }
 
 app();

 $( document ).ready(function() {
    wordList = ["aqua","search","reset","clear","keywords"];
    $.each(wordList, function( index, word ) {
        if (!word.startsWith('_')){
            $("#candidate-words").append(`<span class='candidate-word col-md-2 col-sm-3 col-3' id='word-${word}'>${word}</span>`);
        }
    });
});

