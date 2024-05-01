package com.example.vitanova.Service;

<<<<<<< HEAD
import com.example.vitanova.Entities.Exercice;
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import com.example.vitanova.Entities.WorkoutSession;

import java.util.List;
import java.util.Set;

public interface WorkoutSessionService {
    List<WorkoutSession> getAllWorkoutSessions();
    WorkoutSession getWorkoutSessionById(Long id);
    WorkoutSession addExercisesToSession(Long workoutSessionId, Set<Long> exerciseIds);
    WorkoutSession createWorkoutSession(WorkoutSession workoutSession);
    WorkoutSession updateWorkoutSession(Long id, WorkoutSession workoutSessionDetails);
    void deleteWorkoutSession(Long id);
<<<<<<< HEAD
    Set<Exercice> getExercisesByWorkoutSessionId(Long workoutSessionId);
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}
