from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from pymongo import MongoClient

app = FastAPI()

# Enable CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient('mongodb://mongodb:27017/')
db = client.todo
tasks_collection = db.tasks

# Routes
@app.get("/tasks")
async def get_tasks():
    tasks = []
    for task in tasks_collection.find():
        task["_id"] = str(task["_id"])
        tasks.append(task)
    return tasks

@app.post("/tasks")
async def create_task(task: dict):
    print(task)
    result = tasks_collection.insert_one(task)
    task['_id'] = str(result.inserted_id)
    return {'_id': str(result.inserted_id), 'title': task['title'], }

@app.put("/tasks")
async def check_task(id: str, task: dict):
    result = tasks_collection.update_one({'_id': ObjectId(id)}, {'$set': task})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {'message': 'Task updated'}

@app.delete("/tasks")
async def delete_task(id: str):
    result = tasks_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {'message': 'Task deleted'}
