function toggleButtons(enable) {
    document.querySelectorAll('button').forEach(b => b.disabled = !enable);
   }

function count() {
    console.log(transferRecognizer.countExamples())
}

async function collectExample(label) {
    await transferRecognizer.collectExample(label)
}

async function train() {
    await transferRecognizer.train({
        epochs: 25,
        callback: {
        onEpochEnd: async (epoch, logs) => {
            console.log(`Epoch ${epoch}: loss=${logs.loss}, accuracy=${logs.acc}`);
        }
        }
    });
    const saveResult = await transferRecognizer.save('downloads://transferModel')
}

async function listen() {
    if (transferRecognizer.isListening()) {
        transferRecognizer.stopListening();
        toggleButtons(true);
        document.getElementById('listen').textContent = 'Listen';
        return;
      }
      toggleButtons(false);
      document.getElementById('listen').textContent = 'Stop';
      document.getElementById('listen').disabled = false;
        var k = 1
    await transferRecognizer.listen(result => {
        // - result.scores contains the scores for the new vocabulary, which
        //   can be checked with:
        const words = transferRecognizer.wordLabels();
        // console.log(words)
        // `result.scores` contains the scores for the new words, not the original
        // words.
        // console.log(result)
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
    const baseRecognizer = speechCommands.create('BROWSER_FFT');
    await baseRecognizer.ensureModelLoaded();
    transferRecognizer = baseRecognizer.createTransfer('frm');
    console.log(transferRecognizer)
}

$( document ).ready(function() {
    wordList = ["aqua","search","reset","clear","keywords"];
    $.each(wordList, function( index, word ) {
        if (!word.startsWith('_')){
            $("#candidate-words").append(`<span class='candidate-word col-md-2 col-sm-3 col-3' id='word-${word}'>${word}</span>`);
        }
    });
});
let transferRecognizer;
app();