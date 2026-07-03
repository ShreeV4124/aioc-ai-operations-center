from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.rag.vector_store import build_vector_store
from app.rag.retriever import retrieve_context
from app.ai.prompt_builder import build_incident_prompt
from app.ai.parser import parse_ai_response
from app.ai.provider_factory import get_provider
from app.agents.intake_agent import IntakeAgent



def analyze_incident(
    incident_id,
    db: Session
):
    provider = get_provider()
    intake_agent = IntakeAgent()

    incident = db.query(Incident).filter(
        Incident.id == incident_id
    ).first()

    if incident is None:
        return None
    
    intake_result = intake_agent.process(incident)

    search_query = f"""
    Category: {intake_result.category}
    Summary: {intake_result.summary}
    Keywords: {' '.join(intake_result.keywords)}
    """

    print("INTAKE RESULT")
    print(intake_result)

    retrieved_docs = retrieve_context(search_query)

    evidence_titles = [
        doc.title for doc in retrieved_docs
    ]

    prompt = build_incident_prompt(
        incident,
        retrieved_docs
    )

    raw_response = provider.analyze_incident(prompt)

    analysis = parse_ai_response(raw_response)

    analysis.evidence = evidence_titles

    return analysis