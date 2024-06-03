class RequestDtoSeries:
    def __init__(self, category: list, seasons: list):
        self.category = category
        self.seasons = seasons

    @classmethod
    def from_request(cls, request_data):
        category = request_data.get('category', [])
        seasons = request_data.get('seasons', [])
        return cls(category=category, seasons=seasons)
