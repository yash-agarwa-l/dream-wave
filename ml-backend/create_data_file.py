import pandas as pd
import re
import nltk
from datasets import load_dataset

print("Starting the data generation process...")

# --- Minimal code needed to process DreamBank ---

# Ensure NLTK data is available
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

def clean_dream_text(text):
    text = re.sub(r'[^\w\s\.\,\!\?\:\;]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip().lower()

def analyze_dream_mood(text):
    positive_words = ['happy', 'joy', 'love', 'beautiful', 'wonderful', 'amazing', 'peaceful', 'calm', 'good', 'great']
    negative_words = ['scared', 'afraid', 'sad', 'angry', 'terrible', 'horrible', 'dark', 'evil', 'bad', 'wrong']
    high_arousal_words = ['running', 'screaming', 'fighting', 'flying', 'racing', 'excited', 'panic', 'intense']
    low_arousal_words = ['sleeping', 'quiet', 'still', 'calm', 'slow', 'peaceful', 'gentle', 'soft', 'relaxed']
    
    pos_count = sum(1 for word in positive_words if word in text)
    neg_count = sum(1 for word in negative_words if word in text)
    high_count = sum(1 for word in high_arousal_words if word in text)
    low_count = sum(1 for word in low_arousal_words if word in text)

    valence = (pos_count - neg_count) / (pos_count + neg_count) if (pos_count + neg_count) > 0 else 0
    arousal = (high_count - low_count) / (high_count + low_count) if (high_count + low_count) > 0 else 0
    return valence, arousal

def extract_dream_elements(text):
    elements = {
        'emotions': [], 'settings': [], 'characters': [], 'objects': [], 'activities': [], 'colors': [], 'themes': []
    }
    # This is a simplified extraction for speed. Your original script has more detail.
    if any(word in text for word in ['afraid', 'scared', 'terror']): elements['emotions'].append('fear')
    if any(word in text for word in ['happy', 'joy', 'excited']): elements['emotions'].append('happy')
    if any(word in text for word in ['sad', 'crying']): elements['emotions'].append('sad')
    if not elements['emotions']: elements['emotions'].append('neutral')

    if any(word in text for word in ['house', 'home', 'room']): elements['settings'].append('home')
    if any(word in text for word in ['school', 'class']): elements['settings'].append('school')
    if any(word in text for word in ['city', 'street']): elements['settings'].append('city')
    if not elements['settings']: elements['settings'].append('unknown')

    if any(word in text for word in ['chase', 'run', 'escape']): elements['themes'].append('chase')
    if any(word in text for word in ['fly', 'flying']): elements['themes'].append('flying')
    if not elements['themes']: elements['themes'].append('everyday')
    
    return elements

# --- Main script logic ---
try:
    print("Downloading DreamBank dataset from Hugging Face...")
    dataset = load_dataset("gustavecortal/DreamBank-annotated", split='train')
    df = dataset.to_pandas()
    print(f"Downloaded {len(df)} dream reports.")

    processed_dreams = []
    for idx, row in df.iterrows():
        dream_text = str(row.get('dream_report', ''))
        if not dream_text or len(dream_text.strip()) < 20:
            continue
        
        clean_text = clean_dream_text(dream_text)
        valence, arousal = analyze_dream_mood(clean_text)
        elements = extract_dream_elements(clean_text)
        
        processed_dream = {
            'dream_id': idx,
            'original_text': dream_text,
            'clean_text': clean_text,
            'mood_valence': valence,
            'mood_arousal': arousal,
            **elements
        }
        processed_dreams.append(processed_dream)

    processed_df = pd.DataFrame(processed_dreams)
    
    # Save the final file
    output_filename = 'processed_dreams.csv'
    processed_df.to_csv(output_filename, index=False)
    
    print(f"\n✅ Success! File '{output_filename}' has been created in your folder.")

except Exception as e:
    print(f"\n❌ An error occurred: {e}")
    print("Please make sure you have an internet connection and the 'datasets' library is installed (`pip install datasets`).")