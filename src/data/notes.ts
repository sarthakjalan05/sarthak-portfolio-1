import { NoteItem } from '../types';

/**
 * ------------------------------------------------------------------
 * THE MAESTER'S NOTES (Writing Section Data)
 * Local article ledger stored without external CMS or backend dependency.
 * NOTE: The articles below are realistic placeholder technical posts
 * that can be customized or replaced with real articles anytime.
 * ------------------------------------------------------------------
 */
export const NOTES: NoteItem[] = [
  {
    slug: 'optimizing-tflite-edge-inference',
    title: 'Optimizing TensorFlow Lite for Zero-Latency On-Device Diagnostics',
    date: 'Mar 10, 2026',
    readingTime: '6 min read',
    tags: ['Edge AI', 'TensorFlow Lite', 'Mobile', 'MedTech'],
    excerpt:
      'How we quantized convolutional neural networks down to sub-5MB weights and cut mobile clinical screening latency below 120ms without compromising mucosal lesion detection.',
    body: `
### The Edge Imperative in Clinical Computing

In high-stakes diagnostic contexts, streaming patient imagery to remote cloud clusters presents severe privacy risks, regulatory friction, and fatal dependency on cellular connectivity. In rural screening camps across Tamil Nadu, connectivity is rarely guaranteed. To make algorithmic risk stratification accessible, the neural network must live entirely inside the handset.

Our initial baseline MobileNetV3 architecture had an unquantized FP32 weight footprint of approximately 24.6 MB. On mid-tier Android devices, inference times fluctuated between 380ms and 720ms—sufficient for desktop pipelines, but unacceptably sluggish for mobile screeners seeking immediate visual feedback.

### Post-Training Quantization Strategy

We adopted integer post-training quantization (INT8) using representative calibration datasets drawn from clinical lesion repositories.

\`\`\`python
import tensorflow as tf

def representative_dataset():
    for data in calibration_loader.take(300):
        yield [tf.dtypes.cast(data, tf.float32)]

converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.representative_dataset = representative_dataset
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.uint8
converter.inference_output_type = tf.uint8

tflite_quant_model = converter.convert()
with open("lesion_detector_int8.tflite", "wb") as f:
    f.write(tflite_quant_model)
\`\`\`

### Results & Performance Multipliers

- **Model Weight Reduction:** Shrunk from 24.6 MB to 4.8 MB (80.5% reduction).
- **Inference Latency:** Dropped from 460ms average to 112ms on mid-range hardware via NNAPI / GPU delegates.
- **Accuracy Parity:** Preserved 97.4% of the original FP32 model sensitivity, proving that aggressive quantization does not degrade clinical risk boundaries when calibrated systematically.
    `,
  },
  {
    slug: 'multimodal-affective-fusion-60-40',
    title: 'Calibrating 60/40 Multimodal Acoustic-Visual Fusion in Therapeutic AI',
    date: 'Feb 18, 2026',
    readingTime: '8 min read',
    tags: ['Multimodal AI', 'Affective Computing', 'Gemini API', 'FastAPI'],
    excerpt:
      'Why text-only language models miss critical psychological cues, and how mathematical weighting between vocal prosody and facial action units uncovers disguised distress.',
    body: `
### The Masking Problem in Conversational Agents

When an individual in distress types "I'm doing totally fine, thanks," a traditional text-based sentiment analyzer registers high positivity or neutral resilience. The text contains zero warning tokens. 

However, when spoken aloud, that same sentence is frequently accompanied by vocal pitch micro-tremors, elongated pause latencies, and micro-expressions around the orbital and zygomatic muscles. Humans unconsciously perceive this dissonance; conversational AI must do the same to prevent harmful algorithmic validation of masked depression.

### The 60/40 Fusion Architecture

In our therapeutic companion project *Serenity*, we tested different fusion configurations (early feature concatenation vs. late probabilistic voting vs. calibrated weighted scalar fusion).

We observed that facial affect models are prone to environmental artifacts (lighting fluctuations, head rotation, webcam angles). Vocal acoustics (jitter, shimmer, fundamental frequency F0 variation, speech pause density), on the other hand, proved remarkably consistent across varying device microphones.

We formalized the emotional incongruence index $I_e$ as:

$$I_e = 0.60 \\cdot V_{acoustic} + 0.40 \\cdot V_{facial}$$

Where $V_{acoustic}$ represents the acoustic distress probability and $V_{facial}$ represents the vision distress probability extracted via client-side face-api.js.

### Grounding the Dialogue via Gemini Models

When $I_e$ crosses our sensitivity threshold while conversational text polarity remains artificially positive, the system injects a hidden affective prompt context into the Gemini API session:

> *"System Observation: Patient verbal statement conflicts with acoustic and visual indicators (Incongruence Index: 0.78). Gently explore underlying hesitation without confronting or diagnosing."*

This allows the AI to respond with warm, non-invasive therapeutic inquiry rather than superficial cheerfulness.
    `,
  },
  {
    slug: 'scaling-mern-microservices-westeros',
    title: 'Architectural Patterns for High-Throughput MERN Services',
    date: 'Jan 04, 2026',
    readingTime: '5 min read',
    tags: ['Full-Stack', 'Node.js', 'MongoDB', 'React', 'System Design'],
    excerpt:
      'Lessons learned from building high-concurrency creator-brand collaboration engines with MongoDB connection pooling, Redis caching, and resilient Express middleware.',
    body: `
### The Monolith That Stumbled

During our engineering of Collabify.ai, early traffic spikes caused significant thread starvation in Node.js event loops. Matching algorithms querying multi-criteria creator parameters (engagement rate, tier, geographic reach) were issuing unbounded MongoDB aggregations while simultaneously encoding thumbnail assets.

Here is the tactical playbook we used to stabilize throughput and scale past 10,000 concurrent active creator sessions.

### 1. Connection Pool Right-Sizing

Default MongoDB connection pools in Mongoose often choke under rapid burst connections:

\`\`\`javascript
mongoose.connect(MONGO_URI, {
  maxPoolSize: 50,
  minPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4 // Force IPv4 to prevent DNS resolution latency
});
\`\`\`

### 2. Aggregation Pipeline Optimization with Compound Indexes

Complex search queries across multiple nested arrays require strict index discipline. We instituted compound indexes matching the equality-sort-range (ESR) rule, reducing P99 latency on creator discovery from 840ms to 42ms.

### 3. Decoupling Compute from the Express Request Lifecycle

Heavy operations—such as PDF invoice generation, engagement score updates, and automated email dispatches—were extracted into asynchronous BullMQ background workers backed by Redis, keeping the main HTTP thread lean and responsive.
    `,
  },
];
