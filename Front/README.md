# 🌱 AgriRAG Frontend

> A modern React and TypeScript frontend for **AgriRAG**, an AI-powered agricultural knowledge assistant built around Retrieval-Augmented Generation (RAG).

The application provides a clean AI SaaS-style interface for uploading agricultural documents, managing indexed files, and asking questions based on the uploaded knowledge base.

---

## 📌 Overview

AgriRAG Frontend is the client application for the AgriRAG AI system.

It communicates with an existing FastAPI backend through REST APIs and provides a responsive interface for:

- 📄 Uploading agricultural PDF documents
- 📚 Managing uploaded documents
- 🤖 Asking questions through an AI assistant
- 🔎 Viewing retrieved document sources
- 📍 Identifying the source document and page
- ⏳ Tracking loading and upload states
- ⚠️ Handling validation and API errors
- 📱 Providing a responsive user experience

The frontend is intentionally designed to be:

- Simple
- Maintainable
- Type-safe
- Component-driven
- Easy to explain
- Interview-ready

---

# Features

## 📄 Document Upload

Users can upload agricultural PDF documents through:

- Drag & Drop
- File browser
- Upload progress
- File validation
- Success feedback
- Error feedback

Example:

```text
┌─────────────────────────────────────────────┐
│                                             │
│              ☁ Upload Document             │
│                                             │
│       Drag & Drop your PDF here             │
│              or browse                      │
│                                             │
│              [ Choose File ]                │
│                                             │
└─────────────────────────────────────────────┘
```
