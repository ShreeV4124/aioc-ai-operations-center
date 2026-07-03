from abc import ABC, abstractmethod


class BaseAIProvider(ABC):

    @abstractmethod
    def analyze_incident(self, incident):
        pass