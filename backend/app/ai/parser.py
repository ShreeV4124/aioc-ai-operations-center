import json
import logging

from pydantic import ValidationError
from app.schemas.ai import AIAnalysisResponse

logger = logging.getLogger(__name__)


def parse_ai_response(raw_response: str):
    try:
        parsed_json = json.loads(raw_response)

        validated = AIAnalysisResponse(
            **parsed_json
        )

        return validated

    except json.JSONDecodeError:
        logger.error(
            f"JSON parsing failed: {raw_response}"
        )

        return AIAnalysisResponse(
            root_cause="AI response parsing failed",
            confidence=0,
            recommendations=[
                "Retry analysis",
                "Check model output"
            ]
        )

    except ValidationError:
        logger.error(
            f"Schema validation failed: {raw_response}"
        )

        return AIAnalysisResponse(
            root_cause="AI returned invalid schema",
            confidence=0,
            recommendations=[
                "Inspect provider response",
                "Validate prompt format"
            ]
        )