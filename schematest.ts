const projectCollection = {
    "project_1": {
        name: "OpWeave",
        owner_id: "user_1",
        created_at: "2024-02-14T04:20:00Z",
        updated_at: "2024-02-14T04:20:00Z",
        roles: {
            "user_1": "admin",
            "user_2": "developer",
            "user_3": "designer"
        }
    }
}

const stagesCollection = {
    "stage_1": {
        "project_id": "project_1",
        "name": "Ideation",
        "created_at": "2024-02-14T04:20:00Z",
        "updated_at": "2024-02-14T04:20:00Z",
    }
}

const tasksCollection = {
    "task_1": {
        "project_id": "project_1",
        "stage_id": "stage_1",
        "text": "Task description",
        "priority": "high",
        "created_at": "2024-02-14T04:20:00Z",
        "updated_at": "2024-02-14T04:20:00Z",
    }
}

const userCollection = {
    "user_1": {
        name: "John Doe",
        email: "john.doe@example.com",
        profile_picture: "https://example.com/profile_picture.jpg",
        projects: {
            "project_1": "admin",
            "project_2": "developer",
            "project_3": "designer"
        },
        created_at: "2024-02-14T04:20:00Z",
        updated_at: "2024-02-14T04:20:00Z",
    }
}

/**
 * rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
 */

/**
 * rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Match any user document
    match /users/{userId} {
      // Allow users to read their own data
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Match any project document
    match /projects/{projectId} {
      // Allow project members to read project data
      allow read: if request.auth != null && 
                   exists(/databases/$(database)/documents/users/$(request.auth.uid)).projects[projectId] == projectId;
        // Allow only project owner to write to the project
      allow write: if request.auth != null && 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.projects[projectId] == "admin";
    }
    
    // Match any stages document
    match /stages/{stageId} {
      allow read, write: if request.auth != null && 
                          exists(/databases/$(database)/documents/projects/$(resource.data.project_id)) && 
                          get(/databases/$(database)/documents/projects/$(resource.data.project_id)).data.roles[request.auth.uid] in ["admin", "developer"];
    }
    
    // Match any tasks document
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
                          exists(/databases/$(database)/documents/projects/$(resource.data.project_id)) && 
                          get(/databases/$(database)/documents/projects/$(resource.data.project_id)).data.roles[request.auth.uid] in ["admin", "developer"];
    }
  }
}

 */