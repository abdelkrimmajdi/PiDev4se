package com.example.vitanova.Service;

import com.example.vitanova.Entities.Exercice;
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
    Set<Exercice> getExercisesByWorkoutSessionId(Long workoutSessionId);
}
