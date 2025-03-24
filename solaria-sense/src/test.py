import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score
from datasets import load_dataset
from sentence_transformers import SentenceTransformer
import time

# Load pre-trained models for embeddings and tasks
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Function to get embeddings for text
def get_embeddings(texts):
    return embedding_model.encode(texts, convert_to_tensor=False)

# Load IMDb dataset for sentiment classification
def load_imdb_data(num_samples=1000):
    dataset = load_dataset('imdb', split='train')
    texts = dataset['text'][:num_samples]
    labels = dataset['label'][:num_samples]
    return texts, labels

# Load Tatoeba dataset for language identification (simplified example)
def load_tatoeba_data(num_samples=1000):
    dataset = load_dataset('tatoeba', lang1='en', lang2='fr', split='train')
    texts = dataset['translation'][:num_samples]
    # Simplified: Use 'en' or 'fr' as labels (0 or 1)
    labels = [0 if 'en' in item else 1 for item in texts]
    return texts, labels

# Cluster-Based Search (CBS) for ICL
def cluster_based_search(train_texts, train_labels, test_texts, test_labels, num_clusters=10, num_demos=5):
    # Step 1: Get embeddings for all training texts
    train_embeddings = get_embeddings(train_texts)
    
    # Step 2: Cluster training demonstrations
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    kmeans.fit(train_embeddings)
    cluster_labels = kmeans.labels_
    
    # Step 3: For each test sample, select demos from the nearest cluster
    test_embeddings = get_embeddings(test_texts)
    predicted_labels = []
    
    for test_emb in test_embeddings:
        # Find the nearest cluster
        nearest_cluster = kmeans.predict(test_emb.reshape(1, -1))[0]
        
        # Get demonstrations from the nearest cluster
        cluster_indices = np.where(cluster_labels == nearest_cluster)[0]
        selected_indices = np.random.choice(cluster_indices, size=num_demos, replace=False)
        selected_demos = [train_texts[i] for i in selected_indices]
        selected_labels = [train_labels[i] for i in selected_indices]
        
        # Simplified prediction: Use majority vote from selected demos
        pred_label = max(set(selected_labels), key=selected_labels.count)
        predicted_labels.append(pred_label)
    
    # Step 4: Evaluate accuracy
    accuracy = accuracy_score(test_labels, predicted_labels)
    return accuracy

# Traditional ICL (random demo selection)
def traditional_icl(train_texts, train_labels, test_texts, test_labels, num_demos=5):
    predicted_labels = []
    for _ in test_texts:
        # Randomly select demonstrations
        selected_indices = np.random.choice(len(train_texts), size=num_demos, replace=False)
        selected_labels = [train_labels[i] for i in selected_indices]
        
        # Simplified prediction: Majority vote
        pred_label = max(set(selected_labels), key=selected_labels.count)
        predicted_labels.append(pred_label)
    
    accuracy = accuracy_score(test_labels, predicted_labels)
    return accuracy

# Main experiment
def run_experiment(dataset_name='imdb', num_samples=1000, num_clusters=10, num_demos=5):
    if dataset_name == 'imdb':
        texts, labels = load_imdb_data(num_samples)
    elif dataset_name == 'tatoeba':
        texts, labels = load_tatoeba_data(num_samples)
    else:
        raise ValueError("Unsupported dataset")
    
    # Split into train (demos) and test sets
    split_idx = int(0.8 * len(texts))
    train_texts, test_texts = texts[:split_idx], texts[split_idx:]
    train_labels, test_labels = labels[:split_idx], labels[split_idx:]
    
    # Run CBS and measure time
    start_time = time.time()
    cbs_accuracy = cluster_based_search(train_texts, train_labels, test_texts, test_labels, num_clusters, num_demos)
    cbs_time = time.time() - start_time
    
    # Run traditional ICL and measure time
    start_time = time.time()
    trad_accuracy = traditional_icl(train_texts, train_labels, test_texts, test_labels, num_demos)
    trad_time = time.time() - start_time
    
    print(f"Dataset: {dataset_name}")
    print(f"CBS Accuracy: {cbs_accuracy:.2f}, Time: {cbs_time:.2f}s")
    print(f"Traditional ICL Accuracy: {trad_accuracy:.2f}, Time: {trad_time:.2f}s")

# Run experiments
run_experiment(dataset_name='imdb')  # Sentiment classification
run_experiment(dataset_name='tatoeba')  # Language identification