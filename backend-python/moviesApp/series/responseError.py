class ResponseError:
    
    def __init__(self):
        self.__detail: str
        self.__code: int
        self.__status: str
        
    def getDetail(self) -> str:
        return self.__detail
    
    def setDetail(self, detail: str):
        self.__detail = detail
    
    def getCode(self) -> int:
        return self.__code
    
    def setCode(self, code: int):
        self.__code = code
    
    def getStatus(self) -> str:
        return self.__status
    
    def setStatus(self, status: str):
        self.__status = status
        
    def __str__(self):
        return f"code: {self.getCode}, status: {self.getStatus}, title: {self.getTitle()}"
    
    def to_dict(self):
        return {
            "detail": self.getDetail(),
            "code": self.getCode(),
            "status": self.getStatus()
        }