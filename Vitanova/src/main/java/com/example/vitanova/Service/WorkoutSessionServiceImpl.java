package com.example.vitanova.Service;

import com.example.vitanova.Entities.Exercice;
import com.example.vitanova.Entities.WorkoutSession;
import com.example.vitanova.Repositorie.ExerciceRepositorie;
import com.example.vitanova.Repositorie.WorkoutSessionRepositorie;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WorkoutSessionServiceImpl {
    @Autowired
    private WorkoutSessionRepositorie workoutSessionRepositorie;
    @Autowired
    private ExerciceRepositorie exerciceRepositorie;

    public List<WorkoutSession> getAllWorkoutSessions() {
        return workoutSessionRepositorie.findAll().stream()
                .peek(WorkoutSession::calculateDuration)
                .collect(Collectors.toList());
    }


    public WorkoutSession getWorkoutSessionById(Long id) {
        WorkoutSession workoutSession = workoutSessionRepositorie.findById(id)
                .orElseThrow(() -> new RuntimeException("WorkoutSession not found for this id :: " + id));
        workoutSession.calculateDuration();
        return workoutSession;
    }

    public WorkoutSession addExercisesToSession(Long workoutSessionId, Set<Long> exerciseIds) {
        // Fetch the workout session by ID
        WorkoutSession workoutSession = workoutSessionRepositorie.findById(workoutSessionId)
                .orElseThrow(() -> new RuntimeException("WorkoutSession not found for this id :: " + workoutSessionId));

        // Fetch each exercise by ID and add it to the workout session
        exerciseIds.forEach(id -> {
            Exercice exercise = exerciceRepositorie.findById(id)
                    .orElseThrow(() -> new RuntimeException("Exercise not found for this id :: " + id));
            workoutSession.getExercices().add(exercise);
        });

        workoutSession.calculateDuration(); // Recalculate the duration after adding new exercises
        return workoutSessionRepositorie.save(workoutSession);// Save the updated workout session
    }

    public WorkoutSession createWorkoutSession(WorkoutSession workoutSession) {
        workoutSession.setExercices(new HashSet<>()); // Ensure the exercises list is empty
        return workoutSessionRepositorie.save(workoutSession);
    }

    public WorkoutSession updateWorkoutSession(Long id, WorkoutSession workoutSessionDetails) {
        WorkoutSession workoutSession = workoutSessionRepositorie.findById(id)
                .orElseThrow(() -> new RuntimeException("WorkoutSession not found for this id :: " + id));

        workoutSession.setDate(workoutSessionDetails.getDate());
        workoutSession.setDuration(workoutSessionDetails.getDuration());
        workoutSession.setExercices(workoutSessionDetails.getExercices());

        final WorkoutSession updatedWorkoutSession = workoutSessionRepositorie.save(workoutSession);
        return updatedWorkoutSession;
    }

    public void deleteWorkoutSession(Long id) {
        workoutSessionRepositorie.deleteById(id);
    }

}
