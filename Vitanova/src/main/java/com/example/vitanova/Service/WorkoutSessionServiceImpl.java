package com.example.vitanova.Service;

import com.example.vitanova.Entities.Exercice;
import com.example.vitanova.Entities.WorkoutSession;
import com.example.vitanova.Repositorie.ExerciceRepositorie;
import com.example.vitanova.Repositorie.WorkoutSessionRepositorie;
<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
=======
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
public class WorkoutSessionServiceImpl {
    @Autowired
    private WorkoutSessionRepositorie workoutSessionRepositorie;
    @Autowired
    private ExerciceRepositorie exerciceRepositorie;

    public List<WorkoutSession> getAllWorkoutSessions() {
<<<<<<< HEAD
        List<WorkoutSession> sessions = workoutSessionRepositorie.findAll();
        // Loop through all sessions and calculate duration for each
        for (WorkoutSession session : sessions) {
            session.calculateDuration();
        }
        return sessions;
    }

=======
        return workoutSessionRepositorie.findAll().stream()
                .peek(WorkoutSession::calculateDuration)
                .collect(Collectors.toList());
    }


>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
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
<<<<<<< HEAD
        return workoutSessionRepositorie.save(workoutSession);
    }


=======
        workoutSession.setExercices(new HashSet<>()); // Ensure the exercises list is empty
        return workoutSessionRepositorie.save(workoutSession);
    }

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
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
<<<<<<< HEAD
        Optional<WorkoutSession> optionalWorkoutSession = workoutSessionRepositorie.findById(id);
        if (optionalWorkoutSession.isPresent()) {
            WorkoutSession workoutSession = optionalWorkoutSession.get();
            workoutSession.getExercices().clear(); // Clear exercises list
            workoutSessionRepositorie.save(workoutSession); // Save the updated workout session
            workoutSessionRepositorie.deleteById(id); // Delete the workout session
        } else {
            throw new RuntimeException("Workout session not found with id: " + id);
            // You can handle this exception based on your application's requirements
        }
    }

    public Set<Exercice> getExercisesByWorkoutSessionId(Long workoutSessionId) {
        WorkoutSession workoutSession = workoutSessionRepositorie.findById(workoutSessionId)
                .orElseThrow(() -> new RuntimeException("WorkoutSession not found for this id :: " + workoutSessionId));
        return workoutSession.getExercices();
    }
=======
        workoutSessionRepositorie.deleteById(id);
    }

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}
