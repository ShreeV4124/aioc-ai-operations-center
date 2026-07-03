from app.rag.schemas import KnowledgeDocument


SAMPLE_DOCUMENTS = [
    KnowledgeDocument(
        id="doc_1",
        title="API Gateway 503 Troubleshooting",
        content="""
HTTP 503 errors from API Gateway often indicate upstream service failure.
Check backend pod health, ingress routing, and load balancer status.
Recent deployments may introduce configuration issues.
"""
    ),

    KnowledgeDocument(
        id="doc_2",
        title="Database Connection Pool Exhaustion",
        content="""
Database latency spikes can occur when connection pools are exhausted.
Check active database sessions, connection leaks, and ORM pooling settings.
Restart overloaded services if necessary.
"""
    ),

    KnowledgeDocument(
        id="doc_3",
        title="Kubernetes CrashLoopBackOff",
        content="""
CrashLoopBackOff usually indicates container startup failure.
Check application logs, environment variables, and recent image changes.
Investigate failed health checks.
"""
    ),
]