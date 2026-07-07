# AIOC — AI Operations Center (NOTE: Working on it/not yet completed)

AI-powered operational intelligence platform for incident analysis, root-cause detection, and operational knowledge retrieval using LLMs + RAG.

## Problem
Production incidents generate large volumes of logs, alerts, and runbooks.
Manual root cause analysis is slow and expensive.

AIOC accelerates incident triage using AI.

## Features
- Incident Management Dashboard
- AI Root Cause Analysis
- Semantic Knowledge Retrieval (RAG)
- Multi-Agent Incident Pipeline
- JWT Authentication + RBAC
- Ollama-powered Local LLM Inference

## Architecture
Frontend (React + TS)
→ FastAPI Backend
→ PostgreSQL
→ AI Engine
→ RAG Layer
→ Ollama LLM

## Tech Stack
Frontend:
- React
- Vite
- TypeScript
- Tailwind CSS

Backend:
- FastAPI
- PostgreSQL
- SQLAlchemy

AI:
- Ollama
- Mistral / Llama
- Embeddings
- Vector Search
- RAG
- Multi-Agent Workflow
