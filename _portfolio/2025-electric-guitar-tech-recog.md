---
title: "Electric Guitar Technique Recognition"
excerpt: "Machine learning project for classifying electric guitar playing techniques."
collection: portfolio
---

**Status:** Completed course project  
**Keywords:** machine learning, audio signal processing

This project explores whether electric guitar playing techniques can be recognized automatically from audio. The goal was to support music education, transcription, and performance analysis.

We worked with a dataset covering 9 common electric guitar techniques: alternate picking, legato, tapping, sweep picking, vibrato, hammer-on, pull-off, slide, and bend. Two learning pipelines were compared: a transfer-learning route using wav2vec 2.0 embeddings with an MLP classifier, and a vision-based route using Mel-spectrograms with ConvNetworks.

## Methodology

<!-- ![Dataset and technique examples]({{ '/images/elecGuitarRecogImgs/dataset-techniques.png' | relative_url }}) -->

<!-- ![Mel-spectrogram patterns for the 9 techniques]({{ '/images/elecGuitarRecogImgs/MEL_Spec.jpg' | relative_url }}) -->
![Mel-spectrogram patterns for the 9 techniques]({{ '/images/elecGuitarRecogImgs/MEL_Spec.jpg' | relative_url }})

![wav2vec + MLP pipeline]({{ '/images/elecGuitarRecogImgs/WAV2VEC.jpg' | relative_url }})

![Mel-spectrogram + ConvNet pipeline]({{ '/images/elecGuitarRecogImgs/Vision_based.jpg' | relative_url }})

To improve robustness, we used pitch-shift augmentation to balance the dataset and on-the-fly augmentations such as gain variation and additive noise. The models were trained with a 6:2:2 train/validation/test split, cross-entropy loss, AdamW optimization, on-the-fly learning rate adjustment, and early stopping.

## Results

![Training and validation curves on ConvNetwork]({{ '/images/elecGuitarRecogImgs/MEL_train_acc.png' | relative_url }})
![Training and validation curves on ConvNetwork]({{ '/images/elecGuitarRecogImgs/MEL_train_loss.png' | relative_url }})

![Confusion matrices on ConvNetwork]({{ '/images/elecGuitarRecogImgs/MEL_cm.png' | relative_url }})

![UMAP visualization of learned feature embeddings]({{ '/images/elecGuitarRecogImgs/MEL_umap.png' | relative_url }})

The Mel-spectrogram + ConvNet pipeline achieved a Top-1 accuracy of 93%, outperforming the wav2vec + MLP route, which reached 65%. The main errors came from acoustically similar techniques, especially hammer-on versus pull-off, and some confusion between legato and tapping. Overall, the results show that guitar techniques can be recognized effectively from time-frequency audio representations, while pretrained speech models can still provide useful features for non-speech audio classification tasks.
