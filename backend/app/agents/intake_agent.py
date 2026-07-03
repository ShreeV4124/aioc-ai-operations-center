from app.agents.schemas import IntakeResult


class IntakeAgent:

    def process(self, incident):
        title = incident.title.lower()
        description = incident.description.lower()

        combined_text = f"{title} {description}"

        keywords = []

        important_terms = [
            "api",
            "gateway",
            "503",
            "database",
            "latency",
            "deployment",
            "cpu",
            "memory",
            "pod"
        ]

        for term in important_terms:
            if term in combined_text:
                keywords.append(term)

        category = "unknown"

        if "database" in combined_text:
            category = "database"

        elif "gateway" in combined_text or "503" in combined_text:
            category = "network"

        elif "deployment" in combined_text:
            category = "deployment"

        summary = (
            f"{incident.title}: "
            f"{incident.description}"
        )

        return IntakeResult(
            summary=summary,
            keywords=keywords,
            category=category
        )