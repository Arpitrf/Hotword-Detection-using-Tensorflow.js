# Hotword-Detection-using-Tensorflow.js

This is a simple implementation of training a personalized **hotword/wakeword** detection or a **command-reconizer** model using tensorflow.js

### Training
Training is done on the browser itself. No need for heavy GPUs etc.
1. Open train.html and collect samples for each word by clicking on the correpsonding button for the word and speaking the word out loud. (The recorder remains on for about 1 or 2 seconds.
Tip: 10-20 samples for each word should be enough for a  decent model. Collect much more samples for background noise as compared to other words. 
2. After collecting the samples and clicing the train button, 2 files - transferModel.json and transferModel.weights.bin would be downloaded in your Downloads folder. Copy and paste these files to the "weights" folder.

### Demo
1. Edit the metadata.json file with the hotwords that you have used.
2. Run a local server, say, python -m SimpleHTTPServer 8000
3. Open demo.html and play around with it.

For more information visit https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
