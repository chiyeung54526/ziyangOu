---
title: "Electric Guitar Technique Recognition"
excerpt: "Machine learning project for classifying electric guitar playing techniques."
collection: portfolio
---

**Status:** Completed course project  
**Keywords:** machine learning, audio signal processing

<style>
.guitar-tech-figure {
  margin: 1.75rem 0;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid rgba(127, 127, 127, 0.22);
}

.guitar-tech-figure img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  pointer-events: none;
}

.guitar-tech-figure figcaption {
  margin-top: 0.65rem;
  color: #6f777d;
  font-size: 0.85em;
  line-height: 1.45;
  text-align: center;
}
</style>

This project explores whether electric guitar playing techniques can be recognized automatically from audio. The goal was to support music education, transcription, and performance analysis.

We worked with a dataset covering 9 common electric guitar techniques: alternate picking, legato, tapping, sweep picking, vibrato, hammer-on, pull-off, slide, and bend. Two learning pipelines were compared: a transfer-learning route using wav2vec 2.0 embeddings with an MLP classifier, and a vision-based route using Mel-spectrograms with ConvNetworks.

## Methodology

<!-- ![Dataset and technique examples]({{ '/images/elecGuitarRecogImgs/dataset-techniques.png' | relative_url }}) -->

<figure class="guitar-tech-figure">
  <img src="{{ '/images/elecGuitarRecogImgs/MEL_Spec.jpg' | relative_url }}" alt="Mel-spectrogram patterns for the 9 techniques">
  <figcaption>Figure 1. Mel-spectrogram patterns for the nine electric guitar playing techniques.</figcaption>
</figure>

<figure class="guitar-tech-figure">
  <img src="{{ '/images/elecGuitarRecogImgs/WAV2VEC.jpg' | relative_url }}" alt="wav2vec pipeline">
  <figcaption>Figure 2. Transfer-learning pipeline using wav2vec 2.0 feature embeddings and an MLP classifier.</figcaption>
</figure>

<figure class="guitar-tech-figure">
  <img src="{{ '/images/elecGuitarRecogImgs/Vision_based.jpg' | relative_url }}" alt="Mel-spectrogram and ConvNet pipeline">
  <figcaption>Figure 3. Vision-based learning pipeline using Mel-spectrogram inputs and a ConvNet classifier.</figcaption>
</figure>

To improve robustness, we used pitch-shift augmentation to balance the dataset and on-the-fly augmentations such as gain variation and additive noise. The models were trained with a 6:2:2 train/validation/test split, cross-entropy loss, AdamW optimization, on-the-fly learning rate adjustment, and early stopping.

## Results

<figure class="guitar-tech-figure">
  <img src="{{ '/images/elecGuitarRecogImgs/MEL_train_acc.png' | relative_url }}" alt="Training and validation accuracy curves on ConvNetwork">
  <figcaption>Figure 4. Training and validation accuracy curves for the Mel-spectrogram + ConvNet model.</figcaption>
</figure>

<figure class="guitar-tech-figure">
  <img src="{{ '/images/elecGuitarRecogImgs/MEL_train_loss.png' | relative_url }}" alt="Training and validation loss curves on ConvNetwork">
  <figcaption>Figure 5. Training and validation loss curves for the Mel-spectrogram + ConvNet model.</figcaption>
</figure>

<figure class="guitar-tech-figure">
  <img src="{{ '/images/elecGuitarRecogImgs/MEL_cm.png' | relative_url }}" alt="Confusion matrix on ConvNetwork">
  <figcaption>Figure 6. Confusion matrix for the Mel-spectrogram + ConvNet model on the test set.</figcaption>
</figure>

<figure class="guitar-tech-figure">
  <img src="{{ '/images/elecGuitarRecogImgs/MEL_umap.png' | relative_url }}" alt="UMAP visualization of learned feature embeddings">
  <figcaption>Figure 7. UMAP projection of learned feature embeddings before final classification.</figcaption>
</figure>

The Mel-spectrogram + ConvNet pipeline achieved a Top-1 accuracy of 93%, outperforming the wav2vec + MLP route, which reached 65%. The main errors came from acoustically similar techniques, especially hammer-on versus pull-off, and some confusion between legato and tapping. Overall, the results show that guitar techniques can be recognized effectively from time-frequency audio representations, while pretrained speech models can still provide useful features for non-speech audio classification tasks.
