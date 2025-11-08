from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# React build 폴더를 정적 파일로 서빙
#app.mount("/static", StaticFiles(directory="../frontend/build/static"), name="static")
#app.mount("/images", StaticFiles(directory="../frontend/build/images"), name="images")
app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="frontend")
# index.html을 루트 경로로 서빙
@app.get("/")
def read_index():
    return FileResponse("../frontend/build/index.html")

@app.get("/manifest.json")
def read_manifest():
    return FileResponse("../frontend/build/manifest.json")
