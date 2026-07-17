# 🌱 AgriRAG — Agricultural Document Question Answering System

AgriRAG is an AI-powered Retrieval-Augmented Generation (RAG) application designed to answer agricultural questions based exclusively on uploaded PDF documents.

The system allows users to upload agricultural documents, such as plant disease guides, pesticide manuals, and agricultural research papers. It processes and indexes the documents into a vector database and enables users to ask questions using natural language.

The system retrieves the most relevant information from the uploaded documents and uses a locally running Large Language Model (LLM) to generate an answer grounded in the retrieved context.

Each answer includes references to the original document and page number.

---

## 🎯 Project Objective

Agricultural information is often stored across large PDF documents, manuals, and technical reports, making it difficult to quickly find specific information.

AgriRAG solves this problem by combining semantic search with Large Language Models.

Instead of manually searching through hundreds of pages, users can ask questions such as:

> What causes potato late blight?

The system retrieves the relevant sections from the uploaded documents and generates an answer based only on the retrieved content.

Example response:

```json
{
  "answer": "Phytophthora infestans is the cause of potato late blight.",
  "sources": [
    {
      "filename": "plant_diseases.pdf",
      "page": 5
    }
  ]
}
```

---

## ✨ Features

- Upload and process PDF documents
- Extract text from PDF pages
- Split documents into smaller semantic chunks
- Generate vector embeddings
- Store embeddings in a persistent vector database
- Perform semantic similarity search
- Retrieve relevant document sections
- Generate context-aware answers using a local LLM
- Restrict answers to uploaded document content
- Return document citations and page numbers
- Filter retrieval results using a relevance threshold
- List uploaded documents
- Delete documents and their associated vector data
- REST API built with FastAPI
- Interactive Swagger API documentation
- Environment-based configuration
- Dependency injection
- Structured logging
- Centralized exception handling
- Fully local LLM execution using Ollama

---

## 🧠 How RAG Works

RAG stands for **Retrieval-Augmented Generation**.

Instead of sending a question directly to a Large Language Model, AgriRAG first searches the uploaded documents for relevant information.

The pipeline consists of two main stages.

### Document Indexing

```text
PDF Document
      │
      ▼
PDF Loader
      │
      ▼
Text Extraction
      │
      ▼
Text Splitter
      │
      ▼
Document Chunks
      │
      ▼
Embedding Model
      │
      ▼
Vector Embeddings
      │
      ▼
ChromaDB
```

### Question Answering

```text
User Question
      │
      ▼
Question Embedding
      │
      ▼
Semantic Search
      │
      ▼
ChromaDB
      │
      ▼
Relevant Chunks
      │
      ▼
Relevance Filtering
      │
      ▼
Prompt Builder
      │
      ▼
Llama 3.2 via Ollama
      │
      ▼
Generated Answer
      │
      ▼
Answer + Sources
```

This approach helps reduce hallucinations by grounding the LLM response in the content of the uploaded documents.

---

## 🏗️ Architecture

AgriRAG follows a modular layered architecture.

```text
                    Client
                      │
                      ▼
                FastAPI REST API
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
   Document API               Chat API
          │                       │
          ▼                       ▼
  Indexing Service           Chat Service
          │                       │
          │                       ▼
          │                Retrieval Service
          │                       │
          ▼                       ▼
      PDF Loader           Embedding Service
          │                       │
          ▼                       ▼
    Text Splitter              ChromaDB
          │                       │
          ▼                       ▼
 Embedding Service        Relevant Documents
          │                       │
          ▼                       ▼
       ChromaDB             Prompt Builder
                                  │
                                  ▼
                           Ollama / Llama 3.2
                                  │
                                  ▼
                          Answer + Sources
```

---

## 🛠️ Technology Stack

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### RAG & AI

- Sentence Transformers
- Hugging Face
- ChromaDB
- LangChain
- Ollama
- Llama 3.2

### Document Processing

- PyMuPDF (Fitz)

### Development Practices

- Layered Architecture
- Dependency Injection
- Environment-based Configuration
- Structured Logging
- Custom Exception Handling
- REST API Design

---

## 📁 Project Structure

```text
agri-rag/
│
├── app/
│   │
│   ├── api/
│   │   ├── chat.py
│   │   └── upload.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   ├── exception_handlers.py
│   │   ├── exceptions.py
│   │   └── logging_config.py
│   │
│   ├── rag/
│   │   ├── embedding.py
│   │   ├── loader.py
│   │   ├── models.py
│   │   ├── prompt_builder.py
│   │   ├── splitter.py
│   │   └── vector_store.py
│   │
│   ├── schemas/
│   │   ├── chat.py
│   │   └── upload.py
│   │
│   ├── services/
│   │   ├── chat_service.py
│   │   ├── indexing_service.py
│   │   └── retrieval.py
│   │
│   └── main.py
│
├── data/
│   ├── chroma/
│   └── pdfs/
│
├── tests/
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd agri-rag
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

On Linux or macOS:

```bash
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🤖 Install and Configure Ollama

AgriRAG uses Ollama to run the Large Language Model locally.

Install Ollama, then download the Llama 3.2 model:

```bash
ollama pull llama3.2
```

Verify that the model is available:

```bash
ollama list
```

You should see `llama3.2` in the installed models.

---

## 🔐 Environment Configuration

Copy:

```text
.env.example
```

to:

```text
.env
```

Example configuration:

```env
APP_NAME=AgriRAG API
APP_VERSION=1.0.0

LLM_MODEL=llama3.2

EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

CHROMA_PATH=data/chroma
CHROMA_COLLECTION=agri_documents

UPLOAD_DIR=data/pdfs

RETRIEVAL_TOP_K=5
RETRIEVAL_MAX_DISTANCE=1.3
```

---

## 🚀 Running the Application

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The application will run locally on port `8000`.

Open the interactive API documentation at:

```text
http://127.0.0.1:8000/docs
```

---

## 📡 API Endpoints

| Method   | Endpoint                | Description                             |
| -------- | ----------------------- | --------------------------------------- |
| `GET`    | `/`                     | API health/root endpoint                |
| `POST`   | `/documents/upload`     | Upload and index a PDF document         |
| `GET`    | `/documents`            | List uploaded documents                 |
| `DELETE` | `/documents/{filename}` | Delete a document and its vector data   |
| `POST`   | `/chat/ask`             | Ask a question about uploaded documents |

---

## 💬 Ask a Question

### Request

```json
{
  "question": "What causes potato late blight?"
}
```

### Response

```json
{
  "answer": "According to page 5 of the uploaded document \"plant_diseases.pdf\", Phytophthora infestans is the cause of potato late blight.",
  "sources": [
    {
      "filename": "plant_diseases.pdf",
      "page": 5
    }
  ]
}
```

The `answer` is generated by the LLM using retrieved context, while the `sources` are derived directly from the retrieval pipeline.

---

## 🔍 Retrieval Process

When a user submits a question, the system performs the following steps:

1. Converts the question into a vector embedding.
2. Searches ChromaDB for semantically similar document chunks.
3. Retrieves the top matching chunks.
4. Filters results using a configurable relevance threshold.
5. Builds a structured prompt containing the retrieved context.
6. Sends the prompt to Llama 3.2 through Ollama.
7. Generates an answer based on the provided context.
8. Returns the answer together with the original document sources.

---

## 🛡️ Hallucination Reduction

The prompt instructs the language model to answer only using the retrieved document context.

If relevant information cannot be found, the system is designed to respond with:

> I couldn't find the answer in the uploaded documents.

This approach helps reduce unsupported answers and keeps responses grounded in the uploaded knowledge base.

---

## 📚 Example Use Cases

Although this project focuses on agriculture, the architecture can be adapted to other document-based question-answering scenarios, including:

- Plant disease manuals
- Pesticide documentation
- Agricultural research papers
- Crop management guides
- Technical documentation
- Company knowledge bases
- Educational materials

---

## 🚧 Challenges and Solutions

### Processing Large PDF Documents

Large documents may contain hundreds of pages and cannot be efficiently passed directly to an LLM.

**Solution:** Documents are split into smaller chunks before generating embeddings.

### Finding Relevant Information

Traditional keyword search may fail when the wording of the question differs from the wording in the document.

**Solution:** Sentence Transformer embeddings and vector similarity search are used for semantic retrieval.

### Reducing LLM Hallucinations

LLMs may generate answers using their pretrained knowledge.

**Solution:** A structured prompt instructs the model to answer exclusively from retrieved document context.

### Source Traceability

Users need to know where an answer originated.

**Solution:** Metadata such as the document filename and page number is stored with each vector chunk and returned with the final answer.

### Duplicate Document Indexing

Uploading the same document multiple times could create duplicate vector records.

**Solution:** Stable chunk identifiers and ChromaDB upsert operations are used when indexing documents.

---

## 🔮 Future Improvements

Potential future improvements include:

- Web-based chat interface
- Multi-document filtering
- Conversation history
- Streaming LLM responses
- Hybrid keyword and vector search
- Reranking retrieved documents
- Multilingual embedding models
- Docker support
- Cloud deployment
- Authentication and user management
- Support for DOCX and other document formats

---

## 👨‍💻 Author

**Ahmed Hamad**

Backend & Full Stack Developer

This project was developed as a practical implementation of Retrieval-Augmented Generation, combining backend software engineering practices with AI-powered document retrieval and question answering.

---

## 📄 License

This project is intended for educational and portfolio purposes.
