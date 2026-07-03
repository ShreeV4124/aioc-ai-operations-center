def build_incident_prompt(incident, retrieved_docs):
    context_text = ""

    for doc in retrieved_docs:
        context_text += f"""
Title: {doc.title}
Content: {doc.content}
Similarity Score: {doc.score}

"""

    return f"""
SYSTEM ROLE:
You are a senior Site Reliability Engineer for AIOC.

Use both:
1. Incident details
2. Retrieved historical knowledge

to analyze the incident.

INCIDENT:
Title: {incident.title}
Description: {incident.description}
Severity: {incident.severity}
Status: {incident.status}

RETRIEVED KNOWLEDGE:
{context_text}

OUTPUT RULES:
1. Return ONLY valid JSON
2. No markdown
3. No explanation outside JSON
4. confidence must be integer between 0 and 100
5. recommendations must contain exactly 3 items

OUTPUT FORMAT:
{{
  "root_cause": "string",
  "confidence": 85,
  "recommendations": [
    "string",
    "string",
    "string"
  ]
}}
"""